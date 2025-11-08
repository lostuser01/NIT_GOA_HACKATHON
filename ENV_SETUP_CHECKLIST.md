# Environment Configuration Checklist

**Last Updated:** January 2025

---

## 🔴 CRITICAL: Fix These Issues First

### 1. ❌ Gemini API Key Typo (MUST FIX!)

**Current (WRONG):**
```
GEMINI_API_KEY=AlzaSyBV2iaeloHoa1HaWEpAyf7AwnERCrj_onw
                ↑ Wrong! Should be "AIza"
```

**Correct:**
```
GEMINI_API_KEY=AIzaSyBV2iaeloHoa1HaWEpAyf7AwnERCrj_onw
                ↑ Correct! Must be "AIza"
```

**How to Fix:**
1. Open `.env.local` in your project root
2. Find the line with `GEMINI_API_KEY`
3. Change `Alza` to `AIza`
4. Save the file
5. Restart your dev server

---

### 2. ⚠️ Cloudinary Cloud Name Issue

**Current Issue:**
You have the API Key where the Cloud Name should be:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=355968566138313
```

This `355968566138313` is your **API Key**, NOT your **Cloud Name**!

**How to Find Your Cloud Name:**
1. Go to https://cloudinary.com/console
2. Login to your account
3. Look at the dashboard - you'll see something like `Cloud name: dqiwqfgel`
4. Copy that cloud name

**Correct Format:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name_here
CLOUDINARY_API_KEY=355968566138313
```

---

## ✅ Complete `.env.local` Configuration

Here's what your `.env.local` file should contain:

```bash
# ============================================
# REQUIRED VARIABLES (App won't work without these)
# ============================================

# JWT Secret (for authentication)
JWT_SECRET=U1Ln2oQDQ9JxVpKbcvxoMnHEBfWywr/jXt7GCSEO6aEcpmIGcaPncehHRNSbuWRDEOgjBsC/9L/5l2i0WaOtfg==

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================
# DATABASE (Supabase - RECOMMENDED for production)
# ============================================

# Your Supabase Configuration (Already correct!)
NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZWF3bWNud3Z4dmZmaG13aWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1ODc4OTUsImV4cCI6MjA3ODE2Mzg5NX0.HxvFAD7LiRIXQBBdXQQHbXDAmfb4VBueFFI8Iu16Wko

# ============================================
# CLOUDINARY (For photo uploads - NEEDS FIXING!)
# ============================================

# ❌ NEED TO ADD YOUR ACTUAL CLOUD NAME!
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME_HERE
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=OurStreets
CLOUDINARY_API_KEY=355968566138313

# ============================================
# AI FEATURES (Optional but recommended)
# ============================================

# ❌ FIX THE TYPO: Change "Alza" to "AIza"
GEMINI_API_KEY=AIzaSyBV2iaeloHoa1HaWEpAyf7AwnERCrj_onw

# ============================================
# OPTIONAL FEATURES
# ============================================

# Email notifications (optional)
RESEND_API_KEY=re_iU3L7akX_BjjMAzp8mNT9eSP3cuPU1u6n

# Interactive maps (optional - app has fallback)
# NEXT_PUBLIC_MAPTILER_API_KEY=your_key_here
```

---

## 📋 Step-by-Step Setup Checklist

### Step 1: Open Your `.env.local` File
```bash
# In your project root
cd NIT_GOA_HACKATHON
notepad .env.local
# or use VS Code: code .env.local
```

### Step 2: Fix the Gemini API Key
- [ ] Find: `GEMINI_API_KEY=AlzaSy...`
- [ ] Change to: `GEMINI_API_KEY=AIzaSy...`
- [ ] Save the file

### Step 3: Fix Cloudinary Cloud Name
- [ ] Go to https://cloudinary.com/console
- [ ] Find your cloud name (looks like: `dqiwqfgel`)
- [ ] Update: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name`
- [ ] Save the file

### Step 4: Verify All Required Variables
- [ ] `JWT_SECRET` - ✅ Already set
- [ ] `NEXT_PUBLIC_APP_URL` - ✅ Should be `http://localhost:3000`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - ✅ Already set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - ✅ Already set

### Step 5: Test Your Configuration
```bash
# Kill any running dev servers
taskkill //F //IM node.exe

# Start fresh
npm run dev
```

### Step 6: Verify Everything Works
- [ ] Open http://localhost:3000
- [ ] Try reporting an issue
- [ ] Upload a photo (tests Cloudinary)
- [ ] Toggle "AI Categorization" (tests Gemini)
- [ ] Check if data persists (tests Supabase)

---

## 🧪 Testing Individual Features

### Test 1: Database (Supabase)
```bash
# Start the dev server
npm run dev

# Check the terminal output
# You should see: "✅ Using Supabase database"
# NOT: "⚠️ Using in-memory database"
```

### Test 2: Photo Upload (Cloudinary)
1. Go to http://localhost:3000/report
2. Fill in the form
3. Upload a photo
4. Submit
5. Check if photo appears on the map

**If it fails:** Your cloud name is wrong!

### Test 3: AI Categorization (Gemini)
1. Go to http://localhost:3000/report
2. Toggle "AI-Powered Categorization"
3. Enter: Title: "Big hole on main road", Description: "Dangerous pothole"
4. Click "Get AI Suggestion"
5. Should suggest category and priority

**If it fails:** Your API key has the typo!

---

## 🔍 Common Issues & Solutions

### Issue 1: "GEMINI_API_KEY is invalid"
**Solution:** Change `Alza` to `AIza` in your API key

### Issue 2: "Failed to upload image"
**Solutions:**
- Check your cloud name (not your API key!)
- Verify upload preset is set to "Unsigned" in Cloudinary dashboard

### Issue 3: "Using in-memory database"
**This is OK for development!** Your data will be cleared on restart.
**For production:** Supabase is already configured correctly.

### Issue 4: "Port 3000 is in use"
**Solutions:**
```bash
# Option 1: Kill existing process
taskkill //F //IM node.exe

# Option 2: Use different port
npm run dev -- -p 3001
```

---

## 📱 For Production Deployment

When deploying to Vercel/production:

### Required Environment Variables
```
JWT_SECRET=U1Ln2oQDQ9JxVpKbcvxoMnHEBfWywr/jXt7GCSEO6aEcpmIGcaPncehHRNSbuWRDEOgjBsC/9L/5l2i0WaOtfg==
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Recommended
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=OurStreets
GEMINI_API_KEY=AIzaSyBV2iaeloHoa1HaWEpAyf7AwnERCrj_onw
```

---

## 🎯 Quick Verification Script

Run this to check your configuration:

```bash
# Option 1: Use the built-in script
npm run prebuild

# Option 2: Manual check
node scripts/verify-env.js
```

---

## ✅ Final Checklist

Before you start development:

- [ ] Fixed Gemini API key typo (`Alza` → `AIza`)
- [ ] Updated Cloudinary cloud name (not the API key!)
- [ ] Added `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- [ ] Killed all existing Node processes
- [ ] Restarted dev server with `npm run dev`
- [ ] Tested issue reporting
- [ ] Tested photo upload
- [ ] Tested AI categorization
- [ ] Verified data persists in Supabase

---

## 🆘 Still Having Issues?

1. **Delete `.next` folder:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Check browser console (F12)** for specific errors

3. **Check terminal output** for error messages

4. **Verify you saved `.env.local`** after making changes

5. **Make sure `.env.local` is in the project root**, not in a subfolder

---

## 📞 Need Help?

- Check `README.md` for full documentation
- Check `QUICK_START.md` for setup guide
- Check browser console (F12) for errors
- Check terminal output for warnings

---

**Remember:** After ANY change to `.env.local`, you MUST restart your dev server!

```bash
# Stop server: Ctrl + C
# Start again: npm run dev
```

---

**Status:** Once you fix the Gemini API key typo and add the correct Cloudinary cloud name, everything should work perfectly! ✅