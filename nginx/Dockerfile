FROM nginx:latest

RUN apt-get update && apt-get install -y git && apt-get install -y fcgiwrap

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/git-http-backend.conf /etc/nginx/conf.d/git-http-backend.conf
COPY conf.d/reverse-proxy.conf /etc/nginx/conf.d/reverse-proxy.conf

WORKDIR /etc/nginx
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.crt -batch

CMD /etc/init.d/fcgiwrap start && nginx -g daemon\ off\;
