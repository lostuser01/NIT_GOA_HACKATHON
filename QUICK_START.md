# 🚀 Quick Start Guide - OurStreet Platform

Get up and running in 5 minutes!

---

## ⚡ Fastest Setup (No Database Required)

```bash
# 1. Clone and install
git clone <repository-url>
cd NIT_GOA_HACKATHON
npm install

# 2. Create environment file
cp .env.example .env.local

# 3. Add minimum required variables
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local

# 4. Start the app
npm run dev
```

**That's it!** Open http://localhost:3000

The app will use an in-memory database automatically. Perfect for testing!

---

## 🎯 What You Can Do Immediately

### As a Guest (No Login Required)
1. **Browse the Landing Page** - See all features
2. **View the Map** - See reported issues on an interactive map
3. **Explore Dashboard** - View analytics and statistics
4. **Check Issues** - Browse all reported civic issues

### After Creating an Account
1. **Report Issues** - Click "Report Issue" in navigation
2. **Add Photos** - Upload up to 5 images per issue
3. **Vote & Comment** - Engage with community issues
4. **Track Your Reports** - See status updates on your submissions

---

## 🔑 Demo Accounts (After First Issue)

The app creates demo accounts automatically:

```
Regular User:
Email: demo@example.com
Password: Demo1234

Admin User:
Email: admin@ourstreet.com
Password: Admin1234
```

---

## 📍 Testing the App

### Test 1: Browse as Guest (No Login)
1. Go to http://localhost:3000
2. Click "View Map" button
3. See the interactive map (no authentication required!)
4. Try clicking "Report Issue" → redirects to login ✅

### Test 2: Create an Account
1. Click "Sign Up" in navigation
2. Fill in your details
3. Create account → auto-login ✅

### Test 3: Report an Issue
1. Click "Report Issue" (must be logged in)
2. Fill in title and description
3. Click "Capture Current Location" (or click on map)
4. (Optional) Upload photos
5. Submit → Redirects to map with your issue ✅

### Test 4: View on Map
1. Go to /map
2. See your reported issue as a marker
3. Click marker → See issue details ✅

---

## 🔧 Optional Enhancements

### Add AI Categorization
```bash
# Get free API key from https://makersuite.google.com/app/apikey
echo "GEMINI_API_KEY=your_key_here" >> .env.local
```
Now when reporting issues, toggle "AI-Powered Categorization" for automatic category suggestions!

### Add Production Database (Supabase)
```bash
# Sign up at supabase.com (free tier)
# Create a project and get your credentials
echo "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key" >> .env.local

# Run the schema
# In Supabase dashboard → SQL Editor → Paste supabase/schema.sql → Run
```

### Add Interactive Maps
```bash
# Get free API key from https://maptiler.com
echo "NEXT_PUBLIC_MAPTILER_API_KEY=your_key_here" >> .env.local
```

---

## 🎨 Features Overview

### For Everyone (No Login)
- ✅ View landing page
- ✅ Browse interactive map
- ✅ See all reported issues
- ✅ View dashboard analytics
- ✅ Check team information

### For Registered Users
- ✅ Report new issues with photos & GPS
- ✅ Vote on existing issues
- ✅ Comment on issues
- ✅ Track your submissions
- ✅ Update profile settings

### For Administrators
- ✅ Manage all issues (update status, priority)
- ✅ User management
- ✅ Advanced analytics
- ✅ System audit logs
- ✅ Ward-wise statistics

---

## 🗂️ Project Structure (Key Files)

```
NIT_GOA_HACKATHON/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── map/page.tsx          ← Interactive map
│   ├── report/page.tsx       ← Issue reporting form
│   ├── dashboard/page.tsx    ← Analytics dashboard
│   └── api/                  ← All API endpoints
│       ├── auth/             ← Authentication
│       ├── issues/           ← Issue CRUD
│       └── analytics/        ← Dashboard data
├── components/
│   ├── navigation.tsx        ← Main nav bar
│   └── interactive-map.tsx   ← Map component
├── contexts/
│   ├── auth-context.tsx      ← Auth state
│   └── dashboard-context.tsx ← Dashboard data
└── .env.local                ← Your config (create this!)
```

---

## 🐛 Troubleshooting

### "Cannot GET /" Error
**Solution:** Make sure you're running `npm run dev` and visiting http://localhost:3000

### "JWT_SECRET not set" Warning
**Solution:** Add `JWT_SECRET` to `.env.local`:
```bash
JWT_SECRET=$(openssl rand -base64 32)
```

### No Issues Showing on Map
**Solution:** Report your first issue! The map shows real data from the database.

### Login Not Working
**Solution:** 
1. Make sure you've signed up first
2. Use the correct email/password
3. Check browser console for errors

### Photos Not Uploading
**Solution:** Photos are stored in-memory by default. For persistent storage, add Cloudinary or Supabase configuration.

---

## 🎯 Common Tasks

### Change Port (Default: 3000)
```bash
npm run dev -- -p 3001
```

### Build for Production
```bash
npm run build
npm start
```

### Clear Cache
```bash
rm -rf .next
npm run dev
```

### Check TypeScript Errors
```bash
npm run type-check
```

---

## 📱 Mobile Testing

The app is fully responsive! Test on mobile:

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `.env.local`: `NEXT_PUBLIC_APP_URL=http://YOUR_IP:3000`
3. Restart dev server
4. Open `http://YOUR_IP:3000` on your phone

---

## 🚀 Deploy to Production (Vercel)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy**
- Go to https://vercel.com
- Import your GitHub repo
- Add environment variables (JWT_SECRET, etc.)
- Deploy!

3. **Done!** Your app is live in 2-3 minutes.

---

## 🎓 Learn More

- **Full Documentation:** See `README.md`
- **API Reference:** Check `/api/*` routes
- **Deployment Guide:** See Deployment section in README
- **Troubleshooting:** See Troubleshooting section in README

---

## 💡 Pro Tips

1. **Guest Browsing:** Let users explore before signup → better conversions!
2. **AI Categorization:** Enable GEMINI_API_KEY for smart categorization
3. **Real-time Updates:** Dashboard auto-refreshes every 5 minutes
4. **Mobile First:** Test on mobile - that's where most users are
5. **Dark Mode:** Toggle in navigation - works everywhere automatically

---

## ✅ Checklist

Before calling it done:

- [ ] App starts without errors
- [ ] Can browse as guest (no login required)
- [ ] Can sign up / log in
- [ ] Can report an issue
- [ ] Issue appears on map
- [ ] Dashboard shows data
- [ ] Mobile responsive works
- [ ] Dark mode works

---

## 🆘 Need Help?

1. Check the console for errors (F12 in browser)
2. Read `README.md` for detailed info
3. Check `docs_archive/` for specific topics
4. Open an issue on GitHub
5. Contact the team

---

## 🎉 You're Ready!

The platform is fully functional. Start reporting issues, track them on the map, and make your community better!

**Happy coding! 🚀**

---

*Last updated: January 2025*