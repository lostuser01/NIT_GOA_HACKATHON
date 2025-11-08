# Quick Fix for Login Issue

## Problem
You're experiencing two issues:
1. Not seeing "✅ Using Supabase database" message
2. Login fails with `john@example.com` / `Demo1234` showing "Invalid email or password"

## Root Cause
The seed data in your Supabase database has **incorrect password hashes**. The original schema contained placeholder bcrypt hashes that don't match the actual passwords.

## ✅ Solution (5 minutes)

### Step 1: Fix the Passwords in Supabase

1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp/sql/new

2. **Run this SQL script:**
   ```sql
   -- Fix existing user passwords in Supabase
   
   -- Update john@example.com password to Demo1234
   UPDATE users
   SET password = '$2b$10$P0XqvSRbQhS6Xy5hnp3g/OH5Qce90q1aq810DJJYOW5rRk7evX4Hy'
   WHERE email = 'john@example.com';
   
   -- Update jane@example.com password to Demo1234
   UPDATE users
   SET password = '$2b$10$P0XqvSRbQhS6Xy5hnp3g/OH5Qce90q1aq810DJJYOW5rRk7evX4Hy'
   WHERE email = 'jane@example.com';
   
   -- Update admin@citypulse.com password to Admin1234
   UPDATE users
   SET password = '$2b$10$gX5tT7ZQKmYvN8.WqJQFxO5J/HQNzY9K2RlVFqEL3TzjJ0cYqNP3u'
   WHERE email = 'admin@citypulse.com';
   
   -- Verify the update
   SELECT email, name, role, created_at
   FROM users
   WHERE email IN ('john@example.com', 'jane@example.com', 'admin@citypulse.com');
   ```

3. **Click "Run" (or press Ctrl+Enter)**

4. **Verify the output:**
   - You should see 3 rows returned with the user details
   - This confirms the passwords were updated successfully

### Step 2: Test the Login

Now try logging in again:
- **Email:** `john@example.com`
- **Password:** `Demo1234`

It should work! ✅

---

## About the "✅ Using Supabase database" Message

### Why You See It During Build
When you run `npm run build`, you see the message multiple times:
```
✅ Using Supabase database
✅ Using Supabase database
...
```

This is **NORMAL** and **GOOD**! It means Supabase is properly configured.

### Why You Might Not See It in Dev Mode
In `npm run dev`, the message appears when the server first starts:
1. Start dev server: `npm run dev`
2. Look for this in the terminal output:
   ```
   ✅ Using Supabase database
   ```

If you see this message, your Supabase connection is working correctly!

### If You DON'T See the Message
If you see this instead:
```
⚠️ Using in-memory database (data will be lost on restart)
💡 To use Supabase, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Fix:**
1. Check your `.env.local` file exists in the project root
2. Verify it contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   JWT_SECRET=your_jwt_secret_here
   ```
3. Get your keys from: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp/settings/api
4. Restart the dev server

---

## Demo Account Credentials

After running the fix script, these accounts work:

| Email | Password | Role |
|-------|----------|------|
| `john@example.com` | `Demo1234` | citizen |
| `jane@example.com` | `Demo1234` | citizen |
| `admin@citypulse.com` | `Admin1234` | admin |

---

## Verification Checklist

Run this command to verify your setup:
```bash
node scripts/verify-setup.js
```

All checks should pass ✅

---

## Alternative: Create a Fresh Account

Don't want to use demo accounts? Create your own:

1. Go to your app: http://localhost:3000
2. Click "Sign Up"
3. Create account with:
   - Name: Your Name
   - Email: your@email.com
   - Password: Must have 8+ chars, 1 uppercase, 1 lowercase, 1 number
   - Role: citizen

This will work immediately without needing the password fix!

---

## What Was Wrong?

The original `schema.sql` had this:
```sql
-- WRONG - Placeholder hash
'$2a$10$rOzJb9h7YQYQYDZvXQYQYeDhvJQa7v5YqZYQYQYQYQYQYQYQYQYQYu'
```

This is not a valid bcrypt hash for "Demo1234". It's just a fake placeholder.

The fix script updates it to the **correct** bcrypt hash:
```sql
-- CORRECT - Real hash for "Demo1234"
'$2b$10$P0XqvSRbQhS6Xy5hnp3g/OH5Qce90q1aq810DJJYOW5rRk7evX4Hy'
```

Now bcrypt can verify the password correctly!

---

## Need More Help?

- **Detailed troubleshooting:** See `TROUBLESHOOTING.md`
- **Setup guide:** See `SUPABASE_SETUP.md`
- **Quick start:** See `SUPABASE_QUICKSTART.md`

---

## Summary

✅ **What to do:**
1. Run the SQL fix script in Supabase (Step 1 above)
2. Try logging in with `john@example.com` / `Demo1234`
3. Should work now!

✅ **The "Using Supabase database" message appears during build/startup - this is correct!**

✅ **Your schema.sql has been updated with correct hashes for future deployments**