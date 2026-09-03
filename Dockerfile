# ---- build the React SPA ----
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY pine-coast-bbq-app/package.json pine-coast-bbq-app/package-lock.json ./
# `npm install` rather than `npm ci`: the lockfile is maintained with a newer npm
# than this image ships, and `npm ci`'s strict cross-version sync check trips on
# harmless tree differences. `npm install` reconciles them; the lockfile still
# pins versions. --legacy-peer-deps keeps CRA 5 / React 19 peer ranges happy.
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY pine-coast-bbq-app/ ./
RUN npm run build

# ---- serve it ----
# nginx-unprivileged: listens on 8080, runs as non-root, tolerates OpenShift's
# arbitrary UID under the restricted-v2 SCC.
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
