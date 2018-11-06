#!/bin/sh

set -e

# Try to mitigate "Hans folly"
if [ "$ENVIRONMENT" = "staging" ]; then
  find /opt/eduid/www/ -name "*.html" -writable -exec sed -i 's/href="https:\/\/dashboard.eduid.se\/"/href="https:\/\/dashboard.dev.eduid.se\/"/g' {} +
  find /opt/eduid/www/ -name "*.html" -writable -exec sed -i 's/href="https:\/\/signup.eduid.se\/"/href="https:\/\/signup.dev.eduid.se\/"/g' {} +
fi

ENTRY_POINT_URL=${ENTRY_POINT_URL-'https://www.eduid.se/static/build/index.js'}

/bin/sed -i -e "s#ENTRY_POINT_URL#${ENTRY_POINT_URL}#g" /opt/eduid/profile/index.html

echo "Updated /opt/eduid/profile/index.html with ENTRY_POINT_URL=${ENTRY_POINT_URL}."

SIGNUP_ENTRY_POINT_URL=${SIGNUP_ENTRY_POINT_URL-'https://www.eduid.se/static/front-build/signup.js'}

/bin/sed -i -e "s#SIGNUP_ENTRY_POINT_URL#${SIGNUP_ENTRY_POINT_URL}#g" /opt/eduid/signup/index.html

echo "Updated /opt/eduid/signup/index.html with SIGNUP_ENTRY_POINT_URL=${SIGNUP_ENTRY_POINT_URL}."

chgrp www-data /var/log/nginx

exec start-stop-daemon --start --exec \
     /usr/sbin/nginx \
     --pidfile "/var/run/nginx.pid" \
     --user=www-data --group=www-data
