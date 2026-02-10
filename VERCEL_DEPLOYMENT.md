# 🚀 Vercel Deployment Guide - OjolBoost

## What Was Fixed

Error Vercel: `Build "src" is "vite.config.ts" but expected "package.json" or "build.sh"`

**Solution:** Ditambahkan `vercel.json` untuk konfigurasi build yang eksplisit.

---

## Files Created

### 1. `vercel.json` - Vercel Build Configuration

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist",
  "env": {
    "GEMINI_API_KEY": "@gemini_api_key"
  },
  "public": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Penjelasan:**
- `buildCommand`: Perintah build yang jelas (`npm run build`)
- `framework`: Tahu ini Vite project
- `outputDirectory`: Output folder adalah `dist/`
- `rewrites`: SPA routing untuk React (all routes → index.html)
- `env`: Setup environment variables (GEMINI_API_KEY)

### 2. `.vercelignore` - Files to Exclude

Mencegah Vercel mengupload file yang tidak perlu:
- `node_modules/`
- `.git/`
- `.env` (secrets tidak boleh di git)
- `dist/` (akan di-generate)
- Temp files & configs

---

## ✅ Deployment Steps

### 1. Push ke GitHub

```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Connect ke Vercel

**Option A - Via Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import repository `rahmadikaaa/ojolboost`
4. Vercel akan auto-detect konfigurasi

**Option B - Via CLI:**
```bash
npm i -g vercel
vercel
# Follow prompts, akan auto-detect vite project
```

### 3. Setup Environment Variable

Di Vercel Dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add: `GEMINI_API_KEY` = your-key-here

### 4. Deploy

```bash
# Automatic (recommended)
# Setiap push ke main branch → auto deploy

# Manual via CLI
vercel --prod
```

---

## 🔍 Build Process pada Vercel

Vercel akan menjalankan:

```bash
1. npm install              # Install dependencies
2. npm run build            # Build: tsc && vite build
3. Deploy dist/ folder      # Upload hasil build
```

---

## 📊 Expected Build Output

```
✓ 835 modules transformed
dist/index.html                   0.98 kB
dist/assets/vendor-CoWcky_G.js  361.18 kB
dist/assets/index-BFp6-Hge.js   388.72 kB
✓ built in 25.37s
```

---

## ✨ Vercel Features

✅ Automatic deploys on git push  
✅ Preview deployments for PRs  
✅ Custom domains support  
✅ SSL certificates (free)  
✅ Analytics dashboard  
✅ Serverless functions (optional)  
✅ Edge middleware (optional)  

---

## 🌐 URLs setelah Deploy

- **Production:** `https://ojolboost.vercel.app` (atau custom domain)
- **Preview:** `https://ojolboost-git-[branch].vercel.app`
- **Dashboard:** `https://vercel.com/dashboard`

---

## 🆘 Troubleshooting

### Error: "Build failed"

Cek Vercel build logs:
1. Dashboard → Project → Deployments
2. Klik deployment yang failed
3. Lihat "Build" tab untuk error details

### Error: "GEMINI_API_KEY is undefined"

Add environment variable di Vercel:
1. Settings → Environment Variables
2. Add `GEMINI_API_KEY` dengan value

### Error: "Cannot find module"

Pastikan `package.json` sudah commit:
```bash
git add package.json package-lock.json
git commit -m "Add dependencies"
git push
```

---

## 📝 Package.json Scripts

Vercel menggunakan scripts ini:

```json
{
  "scripts": {
    "dev": "vite",              // Development
    "build": "tsc && vite build",  // Production build
    "preview": "vite preview"    // Local preview
  }
}
```

Pastikan `build` script ada dan work locally (`npm run build`).

---

## 🎯 Next Steps

1. ✅ Files dibuat (`vercel.json`, `.vercelignore`)
2. ✅ Build tested locally (npm run build)
3. ⏭️ Push ke GitHub
4. ⏭️ Connect ke Vercel
5. ⏭️ Add environment variables
6. ⏭️ Deploy!

---

## 📚 Resources

- [Vercel Docs - Vite](https://vercel.com/docs/frameworks/vite)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**Status:** ✅ Ready for Vercel Deployment
