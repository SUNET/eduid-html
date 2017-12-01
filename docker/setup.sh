#!/bin/bash

set -e

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get -y dist-upgrade
apt-get -y install \
    nginx \
    iputils-ping \
    procps \
    netcat-openbsd \
&& apt-get clean


# make sure we get rid of all default sites
rm -f /etc/nginx/sites-enabled/*

# save space
rm -rf /var/lib/apt/lists/*

echo -e "\ndaemon off;" >> /etc/nginx/nginx.conf
