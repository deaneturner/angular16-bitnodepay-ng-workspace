FROM node:16.20.2-alpine3.18 AS build
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /dist/bitnodepay-ui
#COPY package*.json .
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build bitnodepay-ui --prod
# Serve Application using Nginx Server
FROM nginx AS ngi
COPY --from=build /dist/bitnodepay-ui/ /usr/share/nginx/html
#COPY --from=build /dist/bitnodepay-ui /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
# docker build -t bitnodepay:v0.1.0 -f ./Dockerfile .
# docker image ls
# docker run -p 8000:80 -d bitnodepay:v0.1.0
# docker container ls
