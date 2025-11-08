# Supabase Setup and Integration Guide

## 🎯 Overview

This guide walks you through setting up Supabase as the backend database for CityPulse. The application automatically switches between in-memory storage (for development) and Supabase (for production) based on environment variables.

---

## 📋 Prerequisites

- A Supabase account (free tier works great!)
- Node.js 18+ installed
- Basic understanding of SQL

---

## 🚀 Quick Start

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project Name**: `citypulse` (or your choice)
   - **Database Password**: Save this securely!
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait 2-3 minutes

### Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

### Step 3: Set Up the Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `/supabase/schema.sql`
4. Click "Run" or press Ctrl+Enter
5. Wait for success message: "Success. No rows returned"

### Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   JWT_SECRET=generate_a_secure_random_string
   ```

3. Generate a secure JWT secret:
   ```bash
   # On macOS/Linux:
   openssl rand -base64 32
   
   # Or use Node.js:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

### Step 5: Install Dependencies and Run

```bash
# Install packages
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` - your app should now be using Supabase! 🎉

---

## 🔍 Verification

### Check Database Connection

When you start the dev server, look for this in the console:

✅ **Using Supabase**: `✅ Using Supabase database`
❌ **Using In-Memory**: `⚠️ Using in-memory database (data will be lost on restart)`

### Test the Integration

1. **Sign Up**: Create a new account at `/signup`
2. **Check Supabase**: Go to your Supabase dashboard → Table Editor → `users` table
3. You should see your new user in the database!

4. **Report an Issue**: Submit a test issue
5. **Check Supabase**: Go to Table Editor → `issues` table
6. Your issue should be there!

---

## 📊 Database Schema

The schema includes 4 main tables:

### 1. `users`
- Stores user accounts (citizen, admin, authority roles)
- Hashed passwords with bcrypt
- Avatar support

### 2. `issues`
- Reported civic issues
- Geographic coordinates (lat/lng)
- Status tracking (open → in-progress → resolved)
- Priority levels (low, medium, high, critical)
- 10 predefined categories

### 3. `comments`
- User comments on issues
- Linked to issues and users
- Cascading deletes

### 4. `votes`
- User upvotes on issues
- Prevents duplicate votes (unique constraint)
- Auto-updates issue vote counts

### Built-in Features:
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamps (`created_at`, `updated_at`)
- ✅ Triggers for vote counting
- ✅ Indexes for performance
- ✅ Foreign key constraints

---

## 🔐 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

- **Read**: Anyone can read (public data)
- **Create**: Authenticated users only
- **Update**: Own records only (or admin)
- **Delete**: Own records only (or admin)

### Password Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens for authentication
- Server-side token verification
- Tokens store: `userId`, `email`, `role`

### API Security

- Protected routes check JWT tokens
- Admin routes verify admin role
- Authority routes verify authority/admin roles

---

## 🎨 Seed Data

The schema includes sample data:

### Demo Accounts:
```
Admin:
- Email: admin@citypulse.com
- Password: Admin1234

Citizens:
- Email: john@example.com
- Password: Demo1234

- Email: jane@example.com
- Password: Demo1234
```

### Sample Issues:
- 5 demo issues in Panjim, Goa
- Different statuses and priorities
- Sample comments and votes

---

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key (safe for browser) |
| `JWT_SECRET` | Yes | Secret for signing JWT tokens |
| `NODE_ENV` | No | `development` or `production` |

### Switching Between Databases

The app automatically detects Supabase configuration:

**With Supabase** (both env vars set):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```
→ Uses Supabase (persistent data)

**Without Supabase** (either missing):
```env
# NEXT_PUBLIC_SUPABASE_URL not set
# NEXT_PUBLIC_SUPABASE_ANON_KEY not set
```
→ Uses in-memory database (resets on restart)

---

## 🚨 Troubleshooting

### "Using in-memory database" warning

**Problem**: App not connecting to Supabase

**Solutions**:
1. Check `.env.local` exists (not `.env.example`)
2. Verify both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Restart the dev server: `npm run dev`
4. Check for typos in environment variables

### "Supabase credentials not found" error

**Problem**: Missing or invalid API keys

**Solutions**:
1. Go to Supabase Dashboard → Settings → API
2. Copy the **Project URL** and **anon public** key (NOT the service_role key)
3. Paste into `.env.local`
4. Restart server

### Schema errors

**Problem**: Tables don't exist or query fails

**Solutions**:
1. Re-run the schema: Copy `/supabase/schema.sql` to SQL Editor
2. Check for error messages in Supabase console
3. Make sure you're using the correct project
4. Try dropping tables and re-creating:
   ```sql
   DROP TABLE IF EXISTS votes, comments, issues, users CASCADE;
   -- Then re-run schema.sql
   ```

### Password reset needed

If you forgot the demo password or need to reset:

**Option 1**: Use SQL Editor
```sql
-- Reset admin password to "NewPassword123"
UPDATE users 
SET password = '$2b$10$P0XqvSRbQhS6Xy5hnp3g/OH5Qce90q1aq810DJJYOW5rRk7evX4Hy'
WHERE email = 'admin@citypulse.com';
```

**Option 2**: Run password fix script
```bash
# In Supabase SQL Editor, run:
/supabase/fix-passwords.sql
```

### Cannot authenticate

**Problem**: Login fails even with correct credentials

**Solutions**:
1. Check JWT_SECRET is set in `.env.local`
2. Clear browser cookies/localStorage
3. Check browser console for errors
4. Verify user exists in Supabase: Table Editor → `users`

---

## 📱 Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in **Project Settings** → **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   JWT_SECRET
   ```
4. Deploy!

### Environment Best Practices

- ✅ Use different Supabase projects for dev/staging/prod
- ✅ Rotate JWT_SECRET regularly
- ✅ Never commit `.env.local` to git
- ✅ Use strong database passwords
- ✅ Enable 2FA on Supabase account

---

## 🔄 Database Maintenance

### Backup Your Data

```bash
# In Supabase Dashboard:
# Settings → Database → Backup & Restore → Create backup
```

### Reset Database (Development Only!)

```sql
-- WARNING: This deletes ALL data!
TRUNCATE users, issues, comments, votes RESTART IDENTITY CASCADE;

-- Then re-run seed data from schema.sql
```

### Check Database Size

```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 📈 Performance Tips

### Query Optimization

The schema includes indexes on:
- `issues(user_id, status, category, created_at, votes)`
- `comments(issue_id, user_id, created_at)`
- `votes(issue_id, user_id)`
- `users(email)`
- Geographic index on `issues` coordinates

### Caching Strategies

```typescript
// Example: Cache frequently accessed data
const CACHE_TTL = 60 * 1000; // 1 minute
let cachedStats = null;
let lastFetch = 0;

export async function getStats() {
  const now = Date.now();
  if (cachedStats && now - lastFetch < CACHE_TTL) {
    return cachedStats;
  }
  
  cachedStats = await fetchStatsFromDB();
  lastFetch = now;
  return cachedStats;
}
```

---

## 🆘 Support

### Resources

- 📖 [Supabase Documentation](https://supabase.com/docs)
- 💬 [Supabase Discord](https://discord.supabase.com)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

### Common Questions

**Q: Is Supabase free?**  
A: Yes! Free tier includes 500MB database, 1GB file storage, and 2GB bandwidth.

**Q: Can I switch from in-memory to Supabase later?**  
A: Yes! Just add the environment variables and restart. Data is separate.

**Q: Do I need to modify code to use Supabase?**  
A: No! The app automatically detects and uses Supabase when configured.

**Q: What happens to in-memory data when I switch?**  
A: In-memory data is lost. Export/import manually if needed.

---

## ✅ Checklist

Before going live, ensure:

- [ ] Supabase project created
- [ ] Schema deployed successfully
- [ ] Environment variables set (`.env.local` for dev, Vercel for prod)
- [ ] Test authentication working
- [ ] Test creating/reading/updating issues
- [ ] Demo accounts removed or passwords changed
- [ ] RLS policies tested
- [ ] Backups enabled in Supabase
- [ ] Error tracking set up (Sentry, LogRocket, etc.)
- [ ] SSL/HTTPS enabled (automatic on Vercel)

---

## 🎉 You're All Set!

Your CityPulse app is now powered by Supabase with:
- ✅ Persistent data storage
- ✅ Real-time capabilities (ready for future features)
- ✅ Scalable infrastructure
- ✅ Built-in authentication
- ✅ Automatic backups
- ✅ Row-level security

Happy coding! 🚀