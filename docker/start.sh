#!/bin/sh

set -e

chgrp www-data /var/log/nginx

exec start-stop-daemon --start --exec \
     /usr/sbin/nginx \
     --pidfile "/var/run/nginx.pid" \
     --user=www-data --group=www-data
