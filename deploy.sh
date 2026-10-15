#!/bin/bash
cd /home/u885162927/domains/aividdya.com/public_html
{
  echo "=== deploy started $(date) ==="
  wget -O prod.tar.gz "https://raw.githubusercontent.com/kundanparthrnc-a11y/aividdya-preview/main/aividdya-prod-20261015a.tar.gz" && tar -xzf prod.tar.gz && rm -f prod.tar.gz && echo DEPLOY_OK
  echo "=== deploy ended $(date) ==="
} > deploy.log 2>&1
