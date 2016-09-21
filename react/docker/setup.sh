#!/bin/bash
#
# Install all requirements
#

set -e
set -x

# We need to install support for https repositories before
# we can add https://deb.nodesource.com/node_4.x as a repo.
apt-get update
apt-get -y dist-upgrade
apt-get install -y apt-transport-https

mv /root/nodesource.list /etc/apt/sources.list.d/
apt-key add /root/nodesource.pub
rm /root/nodesource.pub
apt-get update
apt-get install -y nodejs

apt-get clean
rm -rf /var/lib/apt/lists/*
