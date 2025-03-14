#!/bin/bash

# deploy.sh - Script to trigger GitHub Pages deployment workflow
# Usage: ./deploy.sh "Optional deployment message"

# Set default deployment message
DEPLOY_MESSAGE="Manual deployment"

# If a message is provided as an argument, use it
if [ $# -gt 0 ]; then
  DEPLOY_MESSAGE="$1"
fi

echo "🚀 Triggering deployment with message: \"$DEPLOY_MESSAGE\""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI (gh) is not installed."
  echo "Please install it from https://cli.github.com/ and authenticate."
  exit 1
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status &> /dev/null; then
  echo "❌ You are not authenticated with GitHub CLI."
  echo "Please run 'gh auth login' to authenticate."
  exit 1
fi

# Trigger the workflow
echo "📦 Running deployment workflow..."
gh workflow run manual-deploy.yml -f deploy_message="$DEPLOY_MESSAGE"

if [ $? -eq 0 ]; then
  echo "✅ Deployment workflow triggered successfully!"
  echo "🔍 You can check the status at: https://github.com/nathanleiby/nathanleiby.me/actions"
else
  echo "❌ Failed to trigger deployment workflow."
  exit 1
fi
