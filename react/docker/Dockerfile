FROM debian:latest

MAINTAINER eduid-dev <eduid-dev@SEGATE.SUNET.SE>

# Add Dockerfile to the container as documentation
COPY Dockerfile /Dockerfile

COPY nodesource.list /root/nodesource.list
COPY nodesource.pub /root/nodesource.pub
COPY setup.sh /opt/eduid/setup.sh
RUN /opt/eduid/setup.sh

WORKDIR /root/react
