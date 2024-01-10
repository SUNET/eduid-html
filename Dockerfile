#
# This image includes the static content that is served by eduID

FROM docker.sunet.se/sunet/docker-jenkins-node-job AS build

# Fetch JS applications to build
RUN git clone https://github.com/SUNET/eduid-front.git
RUN git clone https://github.com/SUNET/eduid-managed-accounts.git

# Build eduid-front
WORKDIR /eduid-front
RUN make build
# Build eduid-managed-accounts
WORKDIR /eduid-managed-accounts
RUN make build

FROM debian:stable

MAINTAINER eduid-dev <feedback@eduid.se>

VOLUME ["/var/log/nginx"]

COPY Dockerfile /Dockerfile

COPY docker/setup.sh /opt/eduid/setup.sh
RUN /opt/eduid/setup.sh

COPY docker/start.sh /start.sh
COPY docker/html.conf /etc/nginx/sites-enabled/html.conf

# Copy www.eduid.se content to /opt/eduid/www/
COPY assets /opt/eduid/www/assets/
COPY en /opt/eduid/www/en/
COPY index.html /opt/eduid/www/index.html

# Copy react apps and other webapp dependencies to /opt/eduid/static/
COPY static /opt/eduid/static/
COPY --from=build /eduid-front/build /opt/eduid/eduid-front/
COPY --from=build /eduid-managed-accounts/dist /opt/eduid/eduid-managed-accounts/

CMD ["/start.sh"]
