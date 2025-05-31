FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm run build

FROM nginx:stable-alpine AS production

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
