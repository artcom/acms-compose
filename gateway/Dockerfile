FROM nginx:1.19.4
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/certs
ARG TEMPLATES=templates
COPY ${TEMPLATES} /etc/nginx/templates
COPY locations /etc/nginx/conf.d/locations
COPY nginx.conf /etc/nginx/nginx.conf
