FROM nginx:stable-alpine

WORKDIR /app
COPY . /app

EXPOSE 3000

COPY /dist /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
