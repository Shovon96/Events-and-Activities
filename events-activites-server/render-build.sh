#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Starting build process..."

# Navigate to the server directory
cd events-activites-server

echo "Installing dependencies..."
npm ci

echo "Generating Prisma client..."
npx prisma generate --schema=./prisma/schema

echo "Building TypeScript..."
npm run build

echo "Running database migrations..."
npx prisma migrate deploy --schema=./prisma/schema

echo "Build completed successfully!"
