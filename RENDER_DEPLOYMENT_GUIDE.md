# Render Deployment Guide for Events Activities Server

This guide will help you deploy your backend server to Render from a monorepo.

## Prerequisites

1. GitHub repository with your code pushed
2. Render account (https://render.com)
3. PostgreSQL database (can be created on Render)

## Option 1: Using render.yaml (Recommended)

### Step 1: Prepare Your Repository

The `render.yaml` file is already created at the root of your repository. Make sure to commit and push it:

```bash
git add render.yaml
git commit -m "Add Render configuration"
git push origin main
```

### Step 2: Create PostgreSQL Database on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "PostgreSQL"
3. Fill in the details:
   - Name: `events-activities-db`
   - Database: `events_activities`
   - User: `events_user` (or any name)
   - Region: Oregon (or closest to you)
   - Plan: Free
4. Click "Create Database"
5. **Copy the Internal Database URL** (it will look like: `postgresql://user:password@host/database`)

### Step 3: Deploy Using Blueprint

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file
5. Click "Apply"
6. Add your environment variables:
   - `DATABASE_URL`: Paste the Internal Database URL from Step 2
   - `JWT_SECRET`: Your JWT secret (e.g., `your-super-secret-jwt-key-change-this`)
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
7. Click "Apply" to start deployment

## Option 2: Manual Setup (Alternative)

If you prefer manual setup or the blueprint doesn't work:

### Step 1: Create PostgreSQL Database

Same as Option 1, Step 2 above.

### Step 2: Create Web Service

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

   **Basic Settings:**
   - Name: `events-activities-api`
   - Region: Oregon (or closest to you)
   - Branch: `main` (or your default branch)
   - Root Directory: `events-activites-server`
   - Runtime: Node
   - Build Command:
     ```bash
     npm ci && npx prisma generate --schema=./prisma/schema && npm run build && npx prisma migrate deploy --schema=./prisma/schema
     ```
   - Start Command:
     ```bash
     npm start
     ```
   - Plan: Free

   **Environment Variables:**
   Add the following environment variables:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (Your PostgreSQL Internal Database URL)
   - `JWT_SECRET` = (Your JWT secret)
   - `CLOUDINARY_CLOUD_NAME` = (Your Cloudinary cloud name)
   - `CLOUDINARY_API_KEY` = (Your Cloudinary API key)
   - `CLOUDINARY_API_SECRET` = (Your Cloudinary API secret)
   - `STRIPE_SECRET_KEY` = (Your Stripe secret key)
   - `STRIPE_WEBHOOK_SECRET` = (Your Stripe webhook secret)

5. Click "Create Web Service"

## Important Notes

### 1. Root Directory
Since you're in a monorepo, you MUST set the **Root Directory** to `events-activites-server`. This tells Render where your backend code is located.

### 2. Build Command
The build command does the following:
- `npm ci`: Clean install of dependencies (faster and more reliable than `npm install`)
- `npx prisma generate --schema=./prisma/schema`: Generates Prisma client
- `npm run build`: Compiles TypeScript to JavaScript
- `npx prisma migrate deploy --schema=./prisma/schema`: Runs database migrations

### 3. Database URL Format
Make sure your `DATABASE_URL` follows this format:
```
postgresql://username:password@host:port/database?sslmode=require
```

For Render PostgreSQL, use the **Internal Database URL** (not External).

### 4. Prisma Schema Location
Your Prisma schema is in `./prisma/schema` directory, so all Prisma commands include `--schema=./prisma/schema`.

### 5. Port Configuration
Render automatically provides a `PORT` environment variable. Make sure your server listens on `process.env.PORT`:

```typescript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Troubleshooting

### Issue: "Cannot find module '@prisma/client'"
**Solution:** Make sure `postinstall` script in package.json runs Prisma generate:
```json
"postinstall": "prisma generate --schema=./prisma/schema"
```

### Issue: "Dependencies not installing"
**Solution:** 
- Use `npm ci` instead of `npm install` in build command
- Make sure `package-lock.json` is committed to your repository
- Check that Root Directory is set to `events-activites-server`

### Issue: "Prisma migrations failing"
**Solution:**
- Verify `DATABASE_URL` is correct
- Make sure you're using the Internal Database URL from Render
- Check that `--schema=./prisma/schema` is included in all Prisma commands

### Issue: "Build succeeds but app crashes"
**Solution:**
- Check the logs in Render dashboard
- Verify all environment variables are set correctly
- Make sure your start command is `npm start` which runs `node ./dist/server.js`

### Issue: "Module not found errors"
**Solution:**
- Make sure all dependencies are in `dependencies` (not `devDependencies`)
- TypeScript types can stay in `devDependencies`
- Run `npm ci` locally to test

## Verifying Deployment

Once deployed, you should see:
1. Build logs showing successful installation, Prisma generation, TypeScript compilation, and migrations
2. Your service URL (e.g., `https://events-activities-api.onrender.com`)
3. Logs showing "Server running on port XXXX"

Test your API:
```bash
curl https://your-service-url.onrender.com/v1/api/health
```

## Updating Your Deployment

Render automatically redeploys when you push to your connected branch:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

## Free Tier Limitations

- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month of runtime
- PostgreSQL database: 90 days of data retention

## Need Help?

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Verify environment variables are set
3. Ensure Root Directory is `events-activites-server`
4. Check that all Prisma commands include `--schema=./prisma/schema`

## Additional Resources

- Render Documentation: https://render.com/docs
- Prisma Deployment: https://www.prisma.io/docs/guides/deployment
- Node.js on Render: https://render.com/docs/deploy-node-express-app
