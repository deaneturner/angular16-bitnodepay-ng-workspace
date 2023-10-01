FROM node:16.20.2-alpine3.18
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build bitnodepay-ui
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/bitnode-pay-ui/ /usr/share/nginx/html
EXPOSE 80
