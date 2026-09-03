# Deploying pinecoastbbq.com to OpenShift

Static React SPA served by nginx. The contact form posts directly to Web3Forms,
so there is no backend and no secrets to manage.

```
GitHub push ──▶ BuildConfig (Dockerfile, node build → nginx) ──▶ ImageStream pcbbq-web:latest
                                                                      │ image trigger
Argo CD ──reconciles deploy/overlays/prod──▶ Deployment / Service / Route ◀┘
```

## One-time bootstrap

1. **Fill in the TODOs** in:
   - `deploy/overlays/prod/kustomization.yaml` — namespace
   - `deploy/base/route.yaml` — `spec.host` (+ cert-manager issuer annotations if used)
   - `deploy/argocd/application.yaml` — Argo namespace, project, destination namespace

2. **Register the Argo app** (from a cluster admin context):
   ```
   oc apply -f deploy/argocd/application.yaml
   ```
   Argo creates the namespace, ImageStream, BuildConfig, Deployment, Service, Route.

3. **First image build** (the GitHub webhook is not wired yet):
   ```
   oc -n <namespace> start-build pcbbq-web --follow
   ```
   The image trigger rolls the Deployment automatically when the build lands.

4. **(Optional) wire the GitHub push webhook** so pushes rebuild automatically:
   ```
   oc -n <namespace> create secret generic pcbbq-web-webhook \
     --from-literal=WebHookSecretKey=$(openssl rand -hex 20)
   oc -n <namespace> describe bc pcbbq-web | grep -A2 'Webhook GitHub'
   ```
   Add that payload URL (secret substituted in) to the repo's
   Settings → Webhooks, content type `application/json`, event: push.

## Serving a second, unrelated domain

The cluster's ingress wildcard (e.g. `*.apps.klownpoundproductions.com`) is only
the default suffix for Routes that omit `spec.host`. It does **not** restrict
what hostnames a Route may serve. `spec.host: pinecoastbbq.com` works as-is; the
HAProxy router dispatches by SNI + Host header, one router across many domains.

Cluster-level requirements:
- No other Route already claims `pinecoastbbq.com` (else `HostAlreadyClaimed`).
- `pinecoastbbq.com` DNS points at the **same** router LB IP that the
  klownpoundproductions.com apps resolve to.
- No change to the IngressController `defaultCertificate` — this domain carries
  its own cert on its own Route (below).

## TLS — using the Porkbun certificate

Per-Route cert, served via SNI. The existing default cert is untouched.

The Porkbun bundle (`pinecoastbbq.com-ssl-bundle.zip`) contains:
- `domain.cert.pem` — **already a fullchain** (leaf → Let's Encrypt intermediate
  → ISRG root), leaf-first. Use it directly as `--cert`.
- `private.key.pem` — the key. (`public.key.pem` is unused.)

This cert's SANs are `pinecoastbbq.com` and `*.pinecoastbbq.com`, so `www` is
covered. It is a 90-day Let's Encrypt cert; the current one expires
**2026-10-03**. Re-download from Porkbun and re-apply the Secret (command below)
each cycle, or automate later with cert-manager + a Porkbun DNS-01 solver.

### Attach it — patch the Route (this cluster)

`RouteExternalCertificate` is **not enabled** on nelly, so a TLS Secret
reference (`spec.tls.externalCertificate`) is silently stripped. Instead the
cert/key are patched straight into the Route; Argo ignores those fields
(`deploy/argocd/application.yaml` -> `ignoreDifferences`) so the key stays out
of git.

```
cd ~/Downloads/pinecoastbbq.com-ssl-bundle
oc -n pcbbq patch route pcbbq-web --type=merge -p "$(python3 - <<'PY'
import json
cert=open('domain.cert.pem').read(); key=open('private.key.pem').read()
print(json.dumps({"spec":{"tls":{"certificate":cert,"key":key}}}))
PY
)"
```
Same command on renewal (re-download the bundle from Porkbun first).

`domain.cert.pem` is already a leaf-first fullchain, so `caCertificate` is not
needed separately.

## Pre-cutover test URL

`deploy/test-route.yaml` is a standalone Route (not in the Argo app) on the
cluster apps-wildcard: `pcbbq-web-pcbbq.apps.nelly.klownpoundproductions.com`.
```
oc apply -f deploy/test-route.yaml
```
It uses the router's default `*.apps` cert. If the browser shows a cert warning
there, the router default isn't a matching wildcard — fall back to testing the
real Route with a hosts-file entry or `curl --resolve` (see gates below).
Delete it after cutover: `oc -n pcbbq delete route pcbbq-web-test`

### Fallback (any version) — patch the Route, ignore in Argo

Remove the `externalCertificate` block from `route.yaml`, then at bootstrap:
```
oc -n pcbbq patch route pcbbq-web --type=merge -p "$(cat <<EOF
{"spec":{"tls":{"certificate":$(jq -Rs . < fullchain.pem),
"key":$(jq -Rs . < private.key.pem)}}}
EOF
)"
```
and add to `deploy/argocd/application.yaml` `ignoreDifferences` so selfHeal
does not strip it:
```
    - group: route.openshift.io
      kind: Route
      jsonPointers:
        - /spec/tls/certificate
        - /spec/tls/key
```

## DNS cutover — do this only when all gates pass

**Gates:**
1. Argo shows `pcbbq-web` **Synced / Healthy**; pods `Running`.
2. `pinecoastbbq-tls` Secret is in place and the Route shows it applied
   (`oc -n pcbbq get route pcbbq-web -o jsonpath='{.spec.tls.externalCertificate.name}'`).
3. Fetch through the cluster router works with SNI + Host set (resolve to the
   IP `kpp.asuscomm.com` currently points at):
   ```
   IP=$(dig +short kpp.asuscomm.com | tail -1)
   curl -sI  --resolve pinecoastbbq.com:443:$IP https://pinecoastbbq.com | head -1
   curl -s   --resolve pinecoastbbq.com:443:$IP https://pinecoastbbq.com/our-story | grep -o '<title>.*</title>'
   ```
   `-s` without `-k` also confirms the Porkbun chain validates. Or browse the
   apps-wildcard test host.
4. ASUS router forwards TCP 80 and 443 from the WAN to the OpenShift ingress
   (router LB IP / node). `kpp.asuscomm.com` DDNS is updating.
5. Netlify DNS record TTL lowered (e.g. 300s) at least one old-TTL period
   beforehand, so rollback is fast.

**Cutover (Porkbun DNS):**
1. Point the names at the router (apex cannot be a CNAME):
   - `pinecoastbbq.com` → **ALIAS** record → `kpp.asuscomm.com`
   - `www.pinecoastbbq.com` → **CNAME** → `pinecoastbbq.com` (wildcard SAN covers it)
2. Verify `https://pinecoastbbq.com` and `https://www.pinecoastbbq.com` load with
   the valid Porkbun cert and client-side routing works (deep-link a route, hard
   refresh).
3. Submit the contact form once — confirm the Web3Forms email arrives.
4. Leave Netlify up ~24–48h as rollback, then delete the Netlify site and
   restore the TTL.
