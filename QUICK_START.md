# CityPulse - Quick Start Guide 🚀

## ✨ New Features Added

1. **Multi-File Photo Upload** (up to 5 photos per report)
2. **Ward/District Selector** (10 Goa wards)
3. **Before/After Photo Gallery** (with lightbox viewer)
4. **Issue Detail Page** (with voting, comments, and full gallery)

---

## 🏃 Quick Test (No Setup Required)

The app works out-of-the-box with an in-memory database for testing!

### 1. Start Development Server

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

### 2. Test Multi-File Upload

1. Click **"Report Issue"** or go to `/report`
2. Fill in the form:
   - Title: "Pothole on Main Street"
   - Category: Select "Pothole"
   - Ward: Select "Panjim - Fontainhas"
   - Description: "Large pothole causing traffic issues..."
3. **Upload Photos:**
   - Click the upload area
   - Select 1-5 images from your computer
   - See thumbnails appear
   - Remove any photo by clicking the X button
4. Click **"Capture Current Location"** (allow GPS permission)
5. Click **"Submit Report"**

**What happens:** Photos upload to Cloudinary (if configured), issue is created, and you're redirected to the issue detail page.

### 3. Test Issue Detail Page with Gallery

After submitting a report:

1. You'll be redirected to `/issues/[id]`
2. See your uploaded photos in the **Before** section
3. Click any photo to open the lightbox
4. Navigate between photos using arrow buttons
5. Try the **Vote** button (must be logged in)
6. Post a comment in the comments section

### 4. Test with Existing Issues

```bash
# The app seeds sample data automatically
# Visit any issue to see the gallery
```

Go to `/map` and click on any marker to view issue details.

---

## 🔑 Environment Setup (Optional)

For full functionality, create `.env.local`:

```env
# Cloudinary (for photo uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

# Supabase (for persistent database - optional)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# JWT Secret (for authentication)
JWT_SECRET=your_random_secret_123
```

### Get Cloudinary Credentials:
1. Sign up at https://cloudinary.com (free)
2. Dashboard → Copy "Cloud Name"
3. Settings → Upload → Add Upload Preset
4. Set "Signing Mode" to **Unsigned**
5. Copy preset name

### Get Supabase Credentials (Optional):
1. Sign up at https://supabase.com (free)
2. Create new project
3. Settings → API → Copy URL and anon key
4. Run SQL schema from `supabase/schema.sql`

---

## 📸 Testing Scenarios

### Scenario 1: Report with Multiple Photos
```
1. Go to /report
2. Upload 5 different photos
3. Select ward "Margao - Market Area"
4. Submit
5. Verify all 5 photos appear in gallery
```

### Scenario 2: View Before/After Gallery
```
1. Create an issue with before photos
2. Admin marks as resolved (add after photos)
3. View issue detail page
4. See both Before and After sections
5. Click photos to compare in lightbox
```

### Scenario 3: Ward-Based Filtering
```
1. Create issues in different wards
2. Filter by ward on admin dashboard
3. See issues grouped by ward
```

---

## 🎯 Key Pages

| Page | URL | What to Test |
|------|-----|-------------|
| **Report Form** | `/report` | Multi-file upload, ward selector |
| **Issue Detail** | `/issues/[id]` | Photo gallery, voting, comments |
| **Map View** | `/map` | Click markers to open issues |
| **Dashboard** | `/dashboard` | View all your reported issues |
| **Admin** | `/admin/issues` | Manage issues, add after photos |

---

## 🧪 Manual Test Checklist

### Photo Upload:
- [ ] Upload 1 photo ✓
- [ ] Upload 5 photos (max) ✓
- [ ] Try 6 photos (should show error) ✓
- [ ] Upload 6MB file (should show error) ✓
- [ ] Upload .txt file (should reject) ✓
- [ ] Remove photo from preview ✓
- [ ] Submit with photos ✓

### Ward Selector:
- [ ] Open ward dropdown ✓
- [ ] See all 10 wards listed ✓
- [ ] Select a ward ✓
- [ ] Submit without ward (optional) ✓

### Photo Gallery:
- [ ] See before photos in grid ✓
- [ ] Click photo to open lightbox ✓
- [ ] Navigate with arrow keys ✓
- [ ] Close lightbox with X ✓
- [ ] See photo counter (e.g., 3/5) ✓

### Issue Detail:
- [ ] Issue loads correctly ✓
- [ ] Status/priority badges show ✓
- [ ] Vote button works ✓
- [ ] Comment posts successfully ✓
- [ ] Location shows on map ✓
- [ ] Google Maps link opens ✓

---

## 🐛 Common Issues

### "Photos not uploading"
- **Solution:** Add Cloudinary credentials to `.env.local`
- **Workaround:** Test without upload (comment out upload call)

### "Issue detail page 404"
- **Cause:** Issue ID doesn't exist
- **Solution:** Create an issue first via `/report`

### "Vote/Comment not working"
- **Cause:** Not logged in
- **Solution:** Sign up at `/signup`, then login at `/login`

### "Gallery not showing"
- **Cause:** No photos in `beforePhotoUrls` array
- **Solution:** Upload photos when creating issue

---

## 🚀 Production Deployment

### Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables
```

### Required Environment Variables in Vercel:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- `JWT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL` (recommended)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (recommended)

---

## 📱 Mobile Testing

The app is fully responsive. Test on:

1. **Desktop** (1920x1080)
   - Gallery: 4 columns
   - Full sidebar layout

2. **Tablet** (768x1024)
   - Gallery: 3 columns
   - Responsive sidebar

3. **Mobile** (375x667)
   - Gallery: 2 columns
   - Stacked layout

---

## 🎨 Features Overview

### Multi-File Upload
- Drag & drop or click to upload
- Real-time preview with thumbnails
- Individual photo removal
- File validation (size, type)
- Progress indicators

### Ward System
- 10 predefined Goa wards
- Dropdown selector in report form
- Stored in issue metadata
- Can filter/sort by ward

### Photo Gallery
- Grid layout (responsive)
- Lightbox with navigation
- Before/After comparison
- Photo counter
- Zoom and pan support

### Issue Detail Page
- Complete issue information
- Interactive photo gallery
- Voting system
- Comments section
- Location preview
- Status tracking

---

## 📚 Documentation

- **Full Integration Guide:** `INTEGRATION_COMPLETE.md`
- **Supabase Setup:** `SUPABASE_SETUP_GUIDE.md`
- **Project Status:** `PROJECT_STATUS.md`
- **API Documentation:** Check `/api` routes

---

## ✅ Success Criteria

Your integration is working if you can:

1. ✅ Upload 5 photos in a single report
2. ✅ Select a ward from the dropdown
3. ✅ Submit the report successfully
4. ✅ View the issue detail page
5. ✅ See all photos in the before gallery
6. ✅ Click photos to open lightbox
7. ✅ Navigate between photos
8. ✅ Vote and comment on the issue

---

## 🎉 You're Ready!

All features are implemented and tested. Start by:

1. Running `npm run dev`
2. Creating a new report at `/report`
3. Uploading multiple photos
4. Viewing the gallery at `/issues/[id]`

Happy testing! 🚀