#
# This image includes the static content that is served by eduID

FROM debian:stable

MAINTAINER eduid-dev <eduid-dev@SEGATE.SUNET.SE>

VOLUME ["/var/log/nginx"]

COPY docker/setup.sh /opt/eduid/setup.sh
RUN /opt/eduid/setup.sh

COPY docker/start.sh /start.sh
COPY docker/html.conf /etc/nginx/sites-enabled/html.conf
COPY . /opt/eduid/eduid-html/wwwroot/

WORKDIR /

CMD ["/start.sh"]
