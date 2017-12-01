#!/bin/sh

set -e

ENTRY_POINT_URL=${ENTRY_POINT_URL-'https://www.eduid.se/static/build/index.js'}

/bin/sed -i -e "s#ENTRY_POINT_URL#${ENTRY_POINT_URL}#g" /opt/eduid/profile/index.html

echo "Updated /opt/eduid/profile/index.html with ENTRY_POINT_URL=${ENTRY_POINT_URL}."

chgrp www-data /var/log/nginx

exec start-stop-daemon --start --exec \
     /usr/sbin/nginx \
     --pidfile "/var/run/nginx.pid" \
     --user=www-data --group=www-data
