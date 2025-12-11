#!/usr/bin/env bash
set -o errexit

npm install
npx prisma generate
npm run build
npx prisma migrate deploy
