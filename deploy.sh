#!/bin/bash

# WA-Brains Deploy Script for Google Cloud
# This script builds and deploys the application to Google Cloud App Engine

set -e  # Exit on any error

echo "🚀 Starting WA-Brains deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "Google Cloud CLI is not installed. Please install it first:"
    echo "https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
print_status "Checking Google Cloud authentication..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    print_warning "You are not authenticated with Google Cloud."
    print_status "Running authentication..."
    gcloud auth login
fi

# Set project if provided as argument
if [ "$1" != "" ]; then
    print_status "Setting project to: $1"
    gcloud config set project $1
fi

# Get current project
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    print_error "No project set. Please run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

print_status "Using project: $PROJECT_ID"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.vite/

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Build the application
print_status "Building WA-Brains for production..."
npm run build

# Verify build output
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

print_success "Build completed successfully!"

# Check if App Engine app exists
print_status "Checking App Engine app..."
if ! gcloud app describe --project=$PROJECT_ID &> /dev/null; then
    print_warning "App Engine app not found. Creating..."
    echo "Available regions:"
    echo "  us-central1 (Iowa)"
    echo "  us-east1 (South Carolina)"
    echo "  europe-west1 (Belgium)"
    echo "  asia-northeast1 (Tokyo)"
    read -p "Enter region [us-central1]: " REGION
    REGION=${REGION:-us-central1}
    gcloud app create --region=$REGION --project=$PROJECT_ID
fi

# Deploy to App Engine
print_status "Deploying to App Engine..."
gcloud app deploy app.yaml --quiet --project=$PROJECT_ID

# Get the deployed URL
APP_URL=$(gcloud app describe --project=$PROJECT_ID --format="value(defaultHostname)")

print_success "🎉 Deployment completed successfully!"
print_success "🌐 Your WA-Brains app is live at: https://$APP_URL"

# Optional: Open in browser
read -p "Open app in browser? [y/N]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    gcloud app browse --project=$PROJECT_ID
fi

print_status "Deployment logs available at:"
echo "https://console.cloud.google.com/logs/query;query=resource.type%3D%22gae_app%22?project=$PROJECT_ID"

print_success "✅ WA-Brains deployment complete!"