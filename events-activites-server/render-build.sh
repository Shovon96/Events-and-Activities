#!/usr/bin/env bash
set -o errexit

npm install @types/express @types/cors @types/cookie-parser @types/multer @types/jsonwebtoken @types/bcrypt
npm install
npx prisma generate
npm run build
npx prisma migrate deploy
