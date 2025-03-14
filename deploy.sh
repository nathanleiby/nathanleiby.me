#!/bin/bash

# deploy.sh - Script to trigger GitHub Pages deployment workflow
# Usage: ./deploy.sh "Optional deployment message"

# Set default deployment message
DEPLOY_MESSAGE="Manual deployment"

# If a message is provided as an argument, use it
if [ $# -gt 0 ]; then
  DEPLOY_MESSAGE="$1"
fi

echo "🚀 Preparing deployment with message: \"$DEPLOY_MESSAGE\""

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

# Get repository name
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

# Check and configure environment protection rules
echo "🔒 Checking GitHub Pages environment protection rules..."
ENV_CONFIG=$(gh api -X GET /repos/$REPO/environments/github-pages 2>/dev/null || echo '{"deployment_branch_policy":{"custom_branch_policies":false}}')

# Check if custom branch policies are enabled
if ! echo "$ENV_CONFIG" | grep -q '"custom_branch_policies":true'; then
  echo "⚙️ Configuring GitHub Pages environment to use custom branch policies..."
  echo '{"deployment_branch_policy":{"protected_branches":false,"custom_branch_policies":true}}' | gh api -X PUT /repos/$REPO/environments/github-pages --input - > /dev/null

  # Add master branch to allowed deployment branches
  echo "⚙️ Adding master branch to allowed deployment branches..."
  echo '{"name":"master"}' | gh api -X POST /repos/$REPO/environments/github-pages/deployment-branch-policies --input - > /dev/null

  echo "✅ Environment protection rules configured successfully!"
else
  # Check if master branch is in the allowed branches
  BRANCH_POLICIES=$(gh api -X GET /repos/$REPO/environments/github-pages/deployment-branch-policies 2>/dev/null)
  if ! echo "$BRANCH_POLICIES" | grep -q '"name":"master"'; then
    echo "⚙️ Adding master branch to allowed deployment branches..."
    echo '{"name":"master"}' | gh api -X POST /repos/$REPO/environments/github-pages/deployment-branch-policies --input - > /dev/null
    echo "✅ Master branch added to allowed deployment branches!"
  else
    echo "✅ Environment protection rules already configured correctly!"
  fi
fi

# Trigger the workflow
echo "📦 Running deployment workflow..."
gh workflow run manual-deploy.yml -f deploy_message="$DEPLOY_MESSAGE"

if [ $? -eq 0 ]; then
  echo "✅ Deployment workflow triggered successfully!"
  echo "🔍 You can check the status at: https://github.com/$REPO/actions"
  echo "🌐 Once complete, your site will be available at: http://www.nathanleiby.me/"
else
  echo "❌ Failed to trigger deployment workflow."
  exit 1
fi
