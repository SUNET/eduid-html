#
# This image includes the static content that is served by eduID

FROM debian:stable

MAINTAINER eduid-dev <eduid-dev@SEGATE.SUNET.SE>

VOLUME ["/var/log/nginx"]

COPY Dockerfile /Dockerfile

COPY docker/setup.sh /opt/eduid/setup.sh
RUN /opt/eduid/setup.sh

COPY docker/start.sh /start.sh
COPY docker/html.conf /etc/nginx/sites-enabled/html.conf

# Copy www.eduid.se content to /opt/eduid/www/
COPY assets /opt/eduid/www/assets/
COPY en /opt/eduid/www/en/
COPY faq.html /opt/eduid/www/faq.html
COPY index.html /opt/eduid/www/index.html
COPY personal.html /opt/eduid/www/personal.html
COPY scripts /opt/eduid/www/scripts/
COPY tekniker.html /opt/eduid/www/tekniker.html

# Copy react app and other webapp dependencies to /opt/eduid/static/
COPY static /opt/eduid/static/
COPY react/build /opt/eduid/build/

CMD ["/start.sh"]
