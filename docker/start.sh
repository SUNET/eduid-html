#!/bin/sh

set -e

# Try to mitigate "Hans folly"
if [ "$ENVIRONMENT" = "staging" ]; then
  find /opt/eduid/www/ -name "*.html" -writable -exec sed -i 's/href="https:\/\/dashboard.eduid.se\/"/href="https:\/\/dashboard.dev.eduid.se\/"/g' {} +
  find /opt/eduid/www/ -name "*.html" -writable -exec sed -i 's/href="https:\/\/signup.eduid.se\/"/href="https:\/\/signup.dev.eduid.se\/"/g' {} +
fi

chgrp www-data /var/log/nginx

exec start-stop-daemon --start --exec \
     /usr/sbin/nginx \
     --pidfile "/var/run/nginx.pid" \
     --user=www-data --group=www-data
