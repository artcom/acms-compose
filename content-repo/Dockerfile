FROM ubuntu:xenial

RUN apt-get update && apt-get install -y git

RUN mkdir /srv/content

RUN git init --bare /srv/content

RUN chown -R www-data:www-data /srv/content
