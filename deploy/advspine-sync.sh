#!/bin/bash
# COPY of the script on the live server (Lightsail "advspine-web-01", /usr/local/bin/advspine-sync).
# Editing this file does not change the server. Kept here for reference.
#
# Publishes the latest website build from S3 (uploaded by GitHub Actions) to nginx.
# Runs every 5 minutes from /etc/cron.d/advspine-sync:
#   */5 * * * * ubuntu /usr/local/bin/advspine-sync >> /var/log/advspine-sync.log 2>&1
# The bucket policy lets only the server's IP read the bucket (no keys on the server).
# Only makes a new release when files changed. Run with --force to publish anyway.
# --exact-timestamps: also pick up files whose size did not change (e.g. a page where only a CSS hash changed).
# Old /_astro files are kept in each new release, so pages cached in browsers still find their CSS/JS.
set -euo pipefail
BUCKET=s3://advance-spine-and-pain-website
SITE=/var/www/advspine
STAGE=$SITE/staging
exec 9>/tmp/advspine-sync.lock
flock -n 9 || exit 0
mkdir -p "$STAGE"
OUT=$(/snap/bin/aws s3 sync "$BUCKET" "$STAGE" --delete --exact-timestamps --no-sign-request --no-progress --region us-east-1)
[ -z "$OUT" ] && [ "${1:-}" != "--force" ] && exit 0
[ -f "$STAGE/index.html" ] || { echo "$(date -u) ERROR: no index.html in S3 build, not publishing"; exit 1; }
REL=$SITE/releases/$(date -u +%Y%m%d%H%M%S)
cp -a "$STAGE" "$REL"
if [ -d "$SITE/current/_astro" ]; then mkdir -p "$REL/_astro"; cp -a --update=none "$SITE/current/_astro/." "$REL/_astro/"; fi
ln -sfn "$REL" "$SITE/current.new"
mv -T "$SITE/current.new" "$SITE/current"
ls -1d "$SITE"/releases/*/ | sort | head -n -5 | xargs -r rm -rf
echo "$(date -u) published $REL ($(echo "$OUT" | grep -c . || true) file changes)"
