#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Check for required environment variables
required_vars=("CLOUDFLARE_ACCOUNT_ID" "CLOUDFLARE_ZONE_ID")

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set. Please set it in your .env file or environment."
    exit 1
  fi
done

# Check if CF_API_TOKEN is set, if not, prompt for login
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "CLOUDFLARE_API_TOKEN is not set. Please run 'wrangler login' to authenticate."
  wrangler login
else
  echo "Using existing CLOUDFLARE_API_TOKEN for authentication."
fi
