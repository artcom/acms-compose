FROM nginx:latest

RUN apt-get update && apt-get install -y git && apt-get install -y fcgiwrap

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

ADD nginx.conf /etc/nginx/nginx.conf
ADD conf.d/git-http-backend.conf /etc/nginx/conf.d/git-http-backend.conf

CMD /etc/init.d/fcgiwrap start && nginx -g daemon\ off\;
