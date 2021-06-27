FROM nginx:stable-alpine

COPY dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

VOLUME /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
