# CityPulse Troubleshooting Guide

## Common Issues and Solutions

### Issue: Not seeing "✅ Using Supabase database" message

**Symptoms:**
- Console shows "⚠️ Using in-memory database" instead
- Data doesn't persist after server restart

**Root Cause:**
The environment variables for Supabase are not properly configured.

**Solution:**

1. **Check if `.env.local` file exists:**
   ```bash
   ls -la | grep env
   ```

2. **Verify environment variables are set:**
   - Open `.env.local` in your project root
   - Ensure these variables are present and have valid values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   JWT_SECRET=your_secure_jwt_secret_here
   ```

3. **Get your Supabase keys:**
   - Go to: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
   - Click "Settings" → "API"
   - Copy the "Project URL" and "anon public" key
   - Update `.env.local` with these values

4. **Restart the development server:**
   ```bash
   npm run dev
   ```
   You should now see: `✅ Using Supabase database`

---

### Issue: Login fails with "Invalid email or password" for demo accounts

**Symptoms:**
- Trying to login with `john@example.com` / `Demo1234` fails
- Error message: "Invalid email or password"

**Root Cause:**
The seed data in your Supabase database has incorrect password hashes. The original schema contained placeholder bcrypt hashes that don't match the actual passwords.

**Solution:**

#### Option 1: Run the Password Fix Script (Recommended)

1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp/sql/new
   
2. **Run the fix script:**
   - Open the file `supabase/fix-passwords.sql` in your project
   - Copy the entire content
   - Paste it into the Supabase SQL Editor
   - Click "Run" or press Ctrl+Enter

3. **Verify the fix:**
   - The script will show you the updated users
   - Try logging in again with:
     - Email: `john@example.com`
     - Password: `Demo1234`

#### Option 2: Delete and Re-run Schema

1. **Delete existing seed users:**
   ```sql
   DELETE FROM users WHERE email IN ('john@example.com', 'jane@example.com', 'admin@citypulse.com');
   ```

2. **Re-run the updated schema:**
   - Open `supabase/schema.sql` (now has correct hashes)
   - Find the seed data section (around line 200)
   - Copy only the INSERT statements for users
   - Run them in Supabase SQL Editor

#### Option 3: Create New Test Account

Instead of using seed accounts, create a fresh account:

1. **Use the signup endpoint:**
   - Go to your app: http://localhost:3000
   - Click "Sign Up"
   - Create a new account with your own credentials

2. **Or use the API directly:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "Test1234",
       "role": "citizen"
     }'
   ```

---

### Issue: "Cannot connect to Supabase" errors

**Symptoms:**
- API endpoints return 500 errors
- Console shows Supabase connection errors

**Solutions:**

1. **Check your internet connection**

2. **Verify Supabase project is active:**
   - Go to: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
   - Check project status (green = active)
   - If paused, click "Resume project"

3. **Verify API keys are correct:**
   - Settings → API in Supabase dashboard
   - Copy fresh keys and update `.env.local`

4. **Check if schema is properly set up:**
   - Go to Table Editor in Supabase
   - Verify these tables exist:
     - `users`
     - `issues`
     - `comments`
     - `votes`
   - If missing, run `supabase/schema.sql`

---

### Issue: RLS (Row Level Security) Errors

**Symptoms:**
- "new row violates row-level security policy" errors
- Can't insert/update data even when logged in

**Solution:**

1. **Verify RLS policies are set up:**
   ```sql
   -- Check existing policies
   SELECT schemaname, tablename, policyname 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

2. **If policies are missing, re-run the RLS section:**
   - Open `supabase/schema.sql`
   - Find the RLS section (around line 130)
   - Copy and run those statements

3. **For development, you can temporarily disable RLS:**
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ALTER TABLE issues DISABLE ROW LEVEL SECURITY;
   ALTER TABLE comments DISABLE ROW LEVEL SECURITY;
   ALTER TABLE votes DISABLE ROW LEVEL SECURITY;
   ```
   ⚠️ **Warning:** Only do this in development! Re-enable for production.

---

## Demo Account Credentials

After running the password fix script, these accounts will work:

| Email | Password | Role |
|-------|----------|------|
| john@example.com | Demo1234 | citizen |
| jane@example.com | Demo1234 | citizen |
| admin@citypulse.com | Admin1234 | admin |

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

---

## Verification Checklist

Use this checklist to verify your setup:

- [ ] `.env.local` file exists with valid Supabase credentials
- [ ] Running `npm run dev` shows "✅ Using Supabase database"
- [ ] Supabase Table Editor shows all 4 tables (users, issues, comments, votes)
- [ ] Can create a new account via signup
- [ ] Can login with newly created account
- [ ] Can login with demo account (after running fix script)
- [ ] Can create a new issue when logged in
- [ ] Can view issues on the map/list
- [ ] Can vote on issues
- [ ] Can add comments to issues

---

## Debug Mode

To enable detailed logging:

1. **Add debug logs to `lib/db-supabase.ts`:**
   ```typescript
   // In userDb.findByEmail function
   console.log('Looking for user:', email);
   console.log('Query result:', { data, error });
   ```

2. **Check browser console and terminal:**
   - Browser console (F12) shows client-side errors
   - Terminal shows server-side API logs

3. **Test Supabase connection directly:**
   ```typescript
   // In any API route, add:
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log('Has Anon Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
   ```

---

## Getting Help

If issues persist:

1. **Check Supabase logs:**
   - Dashboard → Logs → API
   - Look for error messages

2. **Check browser network tab:**
   - F12 → Network
   - Look for failed API requests
   - Check request/response details

3. **Verify bcrypt version:**
   ```bash
   npm list bcryptjs
   ```
   Should show `bcryptjs@^2.4.3` or higher

4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## Quick Fix Commands

```bash
# Restart dev server
npm run dev

# Rebuild and check for errors
npm run build

# Check environment variables (should show Supabase URL)
node -e "console.log(require('dotenv').config({path:'.env.local'}).parsed)"

# Generate new bcrypt hash for testing
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword123', 10).then(console.log)"

# Test Supabase connection
curl https://bceawmcnwvxvffhmwibp.supabase.co/rest/v1/ \
  -H "apikey: YOUR_ANON_KEY_HERE"
```

---

## Need More Help?

- Check `SUPABASE_SETUP.md` for detailed setup instructions
- Review `START_HERE.md` for getting started guide
- Check Next.js logs in terminal for detailed error messages