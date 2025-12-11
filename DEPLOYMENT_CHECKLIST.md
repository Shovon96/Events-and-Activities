# Render Deployment Checklist

Use this checklist to ensure your deployment succeeds.

## ✅ Pre-Deployment Checklist

### 1. Repository Setup
- [ ] All code is committed to GitHub
- [ ] `package-lock.json` is committed (important for `npm ci`)
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] `render.yaml` is at the root of your repository
- [ ] `render-build.sh` is in `events-activites-server/` directory

### 2. Code Configuration
- [ ] Server listens on `process.env.PORT` (already configured ✓)
- [ ] All Prisma commands include `--schema=./prisma/schema` (already configured ✓)
- [ ] `postinstall` script in package.json runs Prisma generate (already configured ✓)

### 3. Environment Variables Ready
Prepare these values before deployment:

- [ ] `DATABASE_URL` - PostgreSQL connection string from Render
- [ ] `JWT_SECRET` - Your JWT secret key
- [ ] `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_KEY` - From Cloudinary dashboard
- [ ] `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
- [ ] `STRIPE_SECRET_KEY` - From Stripe dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` - From Stripe webhook settings

## 🚀 Deployment Steps

### Option A: Using Blueprint (Recommended)

1. [ ] Create PostgreSQL database on Render
2. [ ] Copy Internal Database URL
3. [ ] Go to Render Dashboard → New + → Blueprint
4. [ ] Connect your GitHub repository
5. [ ] Render detects `render.yaml`
6. [ ] Add all environment variables
7. [ ] Click "Apply"
8. [ ] Wait for deployment (5-10 minutes)

### Option B: Manual Setup

1. [ ] Create PostgreSQL database on Render
2. [ ] Copy Internal Database URL
3. [ ] Go to Render Dashboard → New + → Web Service
4. [ ] Connect your GitHub repository
5. [ ] Set Root Directory: `events-activites-server`
6. [ ] Set Build Command:
   ```
   npm ci && npx prisma generate --schema=./prisma/schema && npm run build && npx prisma migrate deploy --schema=./prisma/schema
   ```
7. [ ] Set Start Command: `npm start`
8. [ ] Add all environment variables
9. [ ] Click "Create Web Service"
10. [ ] Wait for deployment (5-10 minutes)

## 🔍 Post-Deployment Verification

### 1. Check Build Logs
- [ ] Dependencies installed successfully
- [ ] Prisma client generated
- [ ] TypeScript compiled without errors
- [ ] Database migrations ran successfully
- [ ] Build completed

### 2. Check Runtime Logs
- [ ] Server started successfully
- [ ] No error messages
- [ ] "Server is running on port XXXX" message appears

### 3. Test API
- [ ] Service URL is accessible
- [ ] Test a simple endpoint (e.g., health check)
- [ ] Database connection works

Test command:
```bash
curl https://your-service-url.onrender.com/v1/api/users
```

## 🐛 Common Issues & Solutions

### Issue: Build fails with "Cannot find module"
**Solution:**
- [ ] Check that Root Directory is set to `events-activites-server`
- [ ] Verify `package-lock.json` is committed
- [ ] Use `npm ci` instead of `npm install` in build command

### Issue: Prisma errors
**Solution:**
- [ ] Verify `DATABASE_URL` is set correctly
- [ ] Use Internal Database URL (not External)
- [ ] Check all Prisma commands have `--schema=./prisma/schema`

### Issue: App crashes after successful build
**Solution:**
- [ ] Check runtime logs for errors
- [ ] Verify all environment variables are set
- [ ] Ensure `npm start` command is correct

### Issue: "Port already in use"
**Solution:**
- [ ] Make sure server uses `process.env.PORT` (already configured ✓)
- [ ] Don't hardcode port numbers

## 📝 Important Notes

1. **Root Directory**: Must be `events-activites-server` for monorepo
2. **Database URL**: Use Internal URL from Render PostgreSQL
3. **Build Command**: Must include Prisma generate and migrate
4. **Cold Starts**: Free tier spins down after 15 min inactivity
5. **First Request**: May take 30-60 seconds after spin-down

## 🎉 Success Indicators

You'll know deployment succeeded when:
- ✅ Build logs show "Build completed successfully"
- ✅ Runtime logs show "Server is running on port XXXX"
- ✅ Service URL returns valid responses
- ✅ No error messages in logs
- ✅ Database queries work correctly

## 📞 Need Help?

If stuck:
1. Check Render logs (Dashboard → Service → Logs)
2. Review `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions
3. Verify all checklist items above
4. Check Render status page: https://status.render.com

## 🔄 Redeployment

To redeploy after changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Render will automatically detect the push and redeploy.

---

**Last Updated:** December 2024
**Deployment Target:** Render.com
**Project:** Events Activities Server
