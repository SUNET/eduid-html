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
apt-get install -y apt-transport-https gnupg2

mv /root/nodesource.list /etc/apt/sources.list.d/
apt-key add /root/nodesource.pub
rm /root/nodesource.pub
apt-get update
apt-get install -y nodejs bzip2 libfontconfig
# For headless chromium
apt-get install -y libpangocairo-1.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2 libgconf2-4 libasound2 libatk1.0-0 libgtk-3-0

apt-get clean
rm -rf /var/lib/apt/lists/*
