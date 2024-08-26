#!/bin/bash

# Source the set-env.sh script to load environment variables
source ./set-env.sh

# Build the Astro site
npm run build

# Deploy to Cloudflare Workers
wrangler deploy --env production
