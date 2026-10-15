#!/bin/bash
cd /home/u885162927/domains/aividdya.com/public_html
{
  echo "=== deploy started $(date) ==="
  wget -O prod.tar.gz "https://raw.githubusercontent.com/kundanparthrnc-a11y/aividdya-preview/main/aividdya-prod-20261015a.tar.gz" && tar -xzf prod.tar.gz --no-same-permissions && rm -f prod.tar.gz
  find . -type f -name "*.html" -exec chmod 644 {} \;
  find . -type f -name "*.css" -exec chmod 644 {} \;
  find . -type f -name "*.js" -exec chmod 644 {} \;
  find . -type f -name "*.pdf" -exec chmod 644 {} \;
  find . -type f -name "*.png" -exec chmod 644 {} \;
  find . -type f -name "*.jpg" -exec chmod 644 {} \;
  find . -type f -name "*.webp" -exec chmod 644 {} \;
  find . -type f -name "*.svg" -exec chmod 644 {} \;
  chmod 644 .htaccess 2>/dev/null
  echo DEPLOY_OK
  echo "=== deploy ended $(date) ==="
} > deploy.log 2>&1
