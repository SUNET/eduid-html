FROM debian:latest

MAINTAINER eduid-dev <eduid-dev@SEGATE.SUNET.SE>

# To fix JS tests trying to run with LANG=C
ENV LANG en_US.UTF-8

# Add Dockerfile to the container as documentation
COPY Dockerfile /Dockerfile

COPY setup.sh /opt/eduid/setup.sh
COPY setup_node.sh /opt/eduid/setup_node.sh
RUN /opt/eduid/setup.sh
RUN /opt/eduid/setup_node.sh

WORKDIR /src/eduid-html
