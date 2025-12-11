# 🚀 Quick Start: Deploy to Render in 5 Minutes

Follow these steps to deploy your backend to Render quickly.

## Step 1: Push to GitHub (1 minute)

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Create Database (2 minutes)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - Name: `events-activities-db`
   - Database: `events_activities`
   - Region: **Oregon** (or closest to you)
   - Plan: **Free**
4. Click **"Create Database"**
5. **COPY** the **Internal Database URL** (looks like: `postgresql://user:pass@host/db`)

## Step 3: Deploy Backend (2 minutes)

### Using Blueprint (Easiest):

1. Click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render detects `render.yaml` automatically
4. Click **"Apply"**
5. Add environment variables:
   - `DATABASE_URL`: *Paste the Internal Database URL from Step 2*
   - `JWT_SECRET`: `your-secret-key-change-this-in-production`
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
6. Click **"Apply"** again

### OR Manual Setup:

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `events-activites-server`
   - **Build Command**:
     ```
     npm ci && npx prisma generate --schema=./prisma/schema && npm run build && npx prisma migrate deploy --schema=./prisma/schema
     ```
   - **Start Command**: `npm start`
4. Add the same environment variables as above
5. Click **"Create Web Service"**

## Step 4: Wait & Verify (5-10 minutes)

1. Watch the build logs
2. Wait for "Build completed" message
3. Check runtime logs for "Server is running"
4. Test your API:
   ```bash
   curl https://your-service-url.onrender.com/health
   ```

## ✅ Done!

Your backend is now live at: `https://your-service-name.onrender.com`

## 🔑 Important URLs

- **API Base**: `https://your-service-name.onrender.com/v1/api`
- **Health Check**: `https://your-service-name.onrender.com/health`
- **Root**: `https://your-service-name.onrender.com/`

## ⚠️ Common Mistakes to Avoid

1. ❌ Using External Database URL → ✅ Use **Internal** Database URL
2. ❌ Forgetting Root Directory → ✅ Set to `events-activites-server`
3. ❌ Missing environment variables → ✅ Add all required env vars
4. ❌ Not committing package-lock.json → ✅ Commit it!

## 🆘 If Something Goes Wrong

1. Check **Logs** in Render dashboard
2. Verify **Root Directory** is `events-activites-server`
3. Confirm **DATABASE_URL** is the Internal URL
4. Make sure all **environment variables** are set

## 📚 Need More Help?

- Detailed Guide: See `RENDER_DEPLOYMENT_GUIDE.md`
- Checklist: See `DEPLOYMENT_CHECKLIST.md`
- Render Docs: https://render.com/docs

---

**That's it! Your backend should be live in about 10 minutes total.** 🎉
