# 🔧 Vercel Deployment - Repository Mismatch Fix

## Problem Identified

Vercel is cloning from: `github.com/rahmadikaaa/ojolboost-prototype`  
But we're pushing to: `github.com/rahmadikaaa/ojolboost`

**This is why the new `vercel.json` config is not being picked up!**

---

## Solution: Reconnect Vercel to Correct Repository

### Option 1: Update Existing Vercel Project (Recommended)

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Find the OjolBoost project**
   - Click on it

3. **Go to Settings**
   - Click "Settings" tab

4. **Update Git Integration**
   - Section: "Git Scope"
   - Find: "Connected Repository"
   - Current: `rahmadikaaa/ojolboost-prototype`
   - Change to: `rahmadikaaa/ojolboost`
   - Click "Update"

5. **Trigger new deploy**
   - Go to "Deployments" tab
   - Click "Redeploy" on latest commit
   - Wait for build to complete

### Option 2: Delete & Create New Project

If Option 1 doesn't work:

1. **Delete current project from Vercel**
   - Settings → Danger Zone → Delete Project

2. **Create new Vercel project**
   - Dashboard → "New Project"
   - Import: `rahmadikaaa/ojolboost`
   - Click "Import"
   - Wait for auto-detection

3. **Add Environment Variables**
   - Settings → Environment Variables
   - Add: `GEMINI_API_KEY`

4. **Deploy**
   - Should auto-deploy on push to main

---

## Verify Configuration Files Exist

Sebelum re-deploy, pastikan files sudah ada di repo:

```bash
# Check local files
ls -la vercel.json .vercelignore

# Check tracked by git
git ls-files | grep vercel

# Push to GitHub if needed
git add vercel.json .vercelignore
git commit -m "Vercel configuration"
git push origin main
```

---

## Expected Files in Repository

```
ojolboost/
├── vercel.json              ✅ Build config
├── .vercelignore            ✅ Exclude files
├── package.json             ✅ Npm scripts
├── vite.config.ts           ✅ Vite config
└── ...
```

---

## After Fix: Build Process

Vercel akan menjalankan:

```bash
# Install dependencies
npm install

# Build project
npm run build    # = tsc && vite build

# Deploy dist/ folder
Deploy /dist → https://ojolboost.vercel.app
```

---

## Test Locally First

Before deploying, test that build works:

```bash
npm install
npm run build

# Check output
ls -lah dist/
```

**Expected output:**
```
✓ 835 modules transformed
dist/index.html                   0.98 kB
dist/assets/vendor-xxxxx.js     361.18 kB
dist/assets/index-xxxxx.js      388.72 kB
```

---

## Troubleshooting

### Still getting old error?

1. **Hard refresh Vercel cache**
   ```
   Settings → Git Integration → Disconnect & Reconnect
   ```

2. **Clear browser cache**
   - Cmd+Shift+R (or Ctrl+Shift+R)

3. **Check GitHub webhook**
   - Settings → Code Integrations → Check Vercel app is installed

### Build fails with "Cannot find module"?

Make sure `package.json` is committed:
```bash
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

---

## Quick Checklist

- [ ] `vercel.json` exists in repo root
- [ ] `vercel.json` has no `builds` field (removed if it existed)
- [ ] `package.json` has `"build": "tsc && vite build"` script
- [ ] Files are committed to `main` branch
- [ ] Vercel project connected to correct repo (`ojolboost`)
- [ ] Environment variables added (GEMINI_API_KEY)
- [ ] Test build works locally: `npm run build`

---

## Summary

| Issue | Fix |
|-------|-----|
| Vercel cloning wrong repo | Update Git Integration in Vercel Settings |
| Old `builds` config warning | Our new `vercel.json` doesn't have it |
| Build fails | Vercel will use new config after reconnect |

**Status:** ✅ Configuration is correct, just need to reconnect Vercel

---

**Next Step:** Update Vercel project settings to point to correct GitHub repository!
