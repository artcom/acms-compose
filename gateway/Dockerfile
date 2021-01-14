FROM nginx:1.19.4
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/certs
ARG LOCATIONS=locations
COPY templates /etc/nginx/templates
COPY ${LOCATIONS} /etc/nginx/conf.d/locations
COPY nginx.conf /etc/nginx/nginx.conf
