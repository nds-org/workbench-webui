#!/bin/sh
envsubst < /usr/share/nginx/html/env.template.json > /usr/share/nginx/html/env.json && env && cat /usr/share/nginx/html/env.template.json && exec nginx -g 'daemon off;'
