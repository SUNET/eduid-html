#!/bin/sh

set -e

ENTRY_POINT_URL=${ENTRY_POINT_URL-'https://www.eduid.se/static/build/index.js'}

cat>/opt/eduid/eduid-html/wwwroot/profile/index.html<<EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eduID</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root" class="wrap container"></div>
    <script type="text/javascript" src="${ENTRY_POINT_URL}"></script>
  </body>
</html>
EOF

echo "Created /opt/eduid/eduid-html/wwwroot/profile/index.html with ENTRY_POINT_URL=${ENTRY_POINT_URL}."

chgrp www-data /var/log/nginx

exec start-stop-daemon --start --exec \
     /usr/sbin/nginx \
     --pidfile "/var/run/nginx.pid" \
     --user=www-data --group=www-data
