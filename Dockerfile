# ---- build the React SPA ----
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY pine-coast-bbq-app/package.json pine-coast-bbq-app/package-lock.json ./
RUN npm ci
COPY pine-coast-bbq-app/ ./
RUN npm run build

# ---- serve it ----
# nginx-unprivileged: listens on 8080, runs as non-root, tolerates OpenShift's
# arbitrary UID under the restricted-v2 SCC.
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
