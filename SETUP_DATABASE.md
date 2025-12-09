# 🚀 Supabase Complete Setup Guide

## Quick Start (5 Minutes)

### Step 1: Run SQL Script

1. Go to your **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy ALL content from `scripts/setup-db.sql`
6. Paste into the editor
7. Click **RUN** (or press Ctrl+Enter)

✅ You should see: "Success. No rows returned"

---

### Step 2: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Fill in:
   - **Name**: `projects`
   - **Public bucket**: ✅ **YES** (check this box)
   - **File size limit**: `5242880` (5MB)
   - **Allowed MIME types**: `image/jpeg,image/png,image/webp`
4. Click **Create Bucket**

---

### Step 3: Configure Storage Policies

1. Click on the `projects` bucket you just created
2. Click the **Policies** tab
3. Click **New Policy**

**Create 4 policies:**

#### Policy 1: Public Read (SELECT)
```
Policy name: Allow public to read images
Allowed operation: SELECT
Target roles: public
USING expression: true
```

#### Policy 2: Authenticated Upload (INSERT)
```
Policy name: Allow authenticated users to upload
Allowed operation: INSERT  
Target roles: authenticated
WITH CHECK expression: true
```

#### Policy 3: Authenticated Update (UPDATE)
```
Policy name: Allow authenticated users to update
Allowed operation: UPDATE
Target roles: authenticated
USING expression: true
WITH CHECK expression: true
```

#### Policy 4: Authenticated Delete (DELETE)
```
Policy name: Allow authenticated users to delete
Allowed operation: DELETE
Target roles: authenticated
USING expression: true
```

---

### Step 4: Create Admin User

1. In Supabase Dashboard, go to **Authentication**
2. Click **Users** tab
3. Click **Add User** button
4. Fill in:
   - **Email**: `admin@gmail.com`
   - **Password**: `admin@123`
   - **Auto Confirm User**: ✅ **YES** (check this)
5. Click **Create User**

---

### Step 5: Verify Setup

Run these checks in SQL Editor:

```sql
-- Check tables exist
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers');
-- Should return: 4

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- All should show: rowsecurity = true

-- Check storage bucket exists
SELECT name FROM storage.buckets WHERE name = 'projects';
-- Should return: projects
```

---

## 🎯 What Was Created

### Database Tables

| Table | Purpose | Columns |
|-------|---------|---------|
| `projects` | Store portfolio projects | id, name, description, image_url, created_at, updated_at |
| `clients` | Store client testimonials | id, name, designation, description, image_url, created_at, updated_at |
| `contact_requests` | Store contact form submissions | id, full_name, email, mobile, city, created_at |
| `newsletter_subscribers` | Store newsletter emails | id, email, subscribed_at |

### RLS Policies

**Projects:**
- ✅ Public can read
- ✅ Authenticated can create/update/delete

**Clients:**
- ✅ Public can read
- ✅ Authenticated can create/update/delete

**Contact Requests:**
- ✅ Public can insert
- ✅ Authenticated can read

**Newsletter:**
- ✅ Public can insert
- ✅ Authenticated can read

### Indexes Created

- `idx_projects_created_at` - Fast sorting
- `idx_clients_created_at` - Fast sorting
- `idx_contact_requests_email` - Fast email lookups
- `idx_contact_requests_created_at` - Fast sorting
- `idx_newsletter_subscribers_email` - Fast email lookups
- `idx_newsletter_subscribers_subscribed_at` - Fast sorting

### Triggers

- Auto-update `updated_at` on projects when modified
- Auto-update `updated_at` on clients when modified

### Storage

- **Bucket**: `projects` (public, 5MB limit)
- **Policies**: Public read, authenticated write/update/delete

---

## 🧪 Test Your Setup

### Test 1: Database Connection
```bash
cd /home/h1/Downloads/full-stack-web-app
./dev.sh
```

Visit: http://localhost:3000

### Test 2: Admin Login
1. Go to: http://localhost:3000/auth/login
2. Login with:
   - Email: `admin@gmail.com`
   - Password: `admin@123`
3. Should redirect to: http://localhost:3000/admin

### Test 3: Add a Project
1. In admin panel, go to **Projects**
2. Click **Add Project**
3. Fill in:
   - Name: "Test Project"
   - Description: "This is a test"
   - Upload an image
4. Click **Add Project**
5. Should see success message

### Test 4: Theme Switching
1. Click sun/moon icon in navbar
2. Theme should switch smoothly
3. Refresh page - theme persists

---

## 🔧 Troubleshooting

### Error: "Bucket not found"
**Solution**: Create the `projects` bucket in Storage (Step 2)

### Error: "new row violates row-level security policy"
**Solution**: Make sure you're logged in with admin@gmail.com

### Error: "Permission denied for table"
**Solution**: Run the SQL script again (Step 1)

### Error: "Cannot read properties of null"
**Solution**: Verify environment variables in `.env` are correct

---

## 📊 Database Schema Diagram

```
┌─────────────────┐
│    projects     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ image_url       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│     clients     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ designation     │
│ description     │
│ image_url       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│ contact_requests│
├─────────────────┤
│ id (PK)         │
│ full_name       │
│ email           │
│ mobile          │
│ city            │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│newsletter_subs  │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ subscribed_at   │
└─────────────────┘
```

---

## ✅ Setup Checklist

- [ ] Run SQL script in Supabase SQL Editor
- [ ] Create `projects` storage bucket
- [ ] Configure 4 storage policies
- [ ] Create admin user (admin@gmail.com)
- [ ] Verify tables exist (4 tables)
- [ ] Verify RLS is enabled
- [ ] Test login
- [ ] Test adding a project
- [ ] Test theme switching

Once all checked, you're ready to go! 🎉

---

## 🚀 Next Steps

1. ✅ **Setup Complete** - All database and storage ready
2. 🎨 **Customize** - Add your real projects and clients
3. 📧 **Email** - Configure email templates in Supabase
4. 🚢 **Deploy** - Push to Vercel with environment variables
5. 🌐 **Domain** - Connect your custom domain

**Your app is production-ready!** 🎊



**==========SQL=========**
-- ============================================
-- FIRST TIME SUPABASE SETUP SCRIPT (NO DROP STATEMENTS)
-- Safe to run on a blank database
-- ============================================

-- ============================================
-- 1. CREATE TABLES
-- ============================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  designation TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. INDEXES
-- ============================================

CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);

CREATE INDEX idx_contact_requests_email ON contact_requests(email);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- ============================================
-- 3. ENABLE RLS
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS POLICIES
-- ============================================

-- Projects
CREATE POLICY "Allow public read for projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert for projects"
  ON projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update for projects"
  ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete for projects"
  ON projects FOR DELETE TO authenticated USING (true);

-- Clients
CREATE POLICY "Allow public read for clients"
  ON clients FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert for clients"
  ON clients FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update for clients"
  ON clients FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete for clients"
  ON clients FOR DELETE TO authenticated USING (true);

-- Contact Requests
CREATE POLICY "Allow public insert for contact requests"
  ON contact_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read for contacts"
  ON contact_requests FOR SELECT TO authenticated USING (true);

-- Newsletter Subscribers
CREATE POLICY "Allow public insert for newsletter"
  ON newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read for subscribers"
  ON newsletter_subscribers FOR SELECT TO authenticated USING (true);

-- ============================================
-- 5. TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. STORAGE POLICIES (Bucket must already exist)
-- ============================================

CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'projects');

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'projects') WITH CHECK (bucket_id = 'projects');

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'projects');

-- ============================================
-- DONE
-- ============================================

-- ============================================
-- COMPLETE SUPABASE SETUP SCRIPT
-- Full-Stack Portfolio Application
-- ============================================

-- ============================================
-- 1. DROP EXISTING POLICIES (SAFE RESET)
-- ============================================

DROP POLICY IF EXISTS "Allow public read for projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated insert for projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update for projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete for projects" ON projects;

DROP POLICY IF EXISTS "Allow public read for clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated insert for clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated update for clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated delete for clients" ON clients;

DROP POLICY IF EXISTS "Allow public insert for contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Allow authenticated read for contacts" ON contact_requests;

DROP POLICY IF EXISTS "Allow public insert for newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated read for subscribers" ON newsletter_subscribers;

-- STORAGE POLICIES RESET
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;


-- ============================================
-- 2. CREATE TABLES (SAFE, ONLY IF MISSING)
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  designation TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 3. INDEXES (AUTO OPTIMIZATION)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at DESC);


-- ============================================
-- 4. ENABLE RLS
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;


-- ============================================
-- 5. RLS POLICIES
-- ============================================

-- PROJECTS
CREATE POLICY "Allow public read for projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert for projects"
  ON projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update for projects"
  ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete for projects"
  ON projects FOR DELETE TO authenticated USING (true);

-- CLIENTS
CREATE POLICY "Allow public read for clients"
  ON clients FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert for clients"
  ON clients FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update for clients"
  ON clients FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete for clients"
  ON clients FOR DELETE TO authenticated USING (true);

-- CONTACT REQUESTS
CREATE POLICY "Allow public insert for contact requests"
  ON contact_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read for contacts"
  ON contact_requests FOR SELECT TO authenticated USING (true);

-- NEWSLETTER SUBSCRIBERS
CREATE POLICY "Allow public insert for newsletter"
  ON newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read for subscribers"
 ON newsletter_subscribers FOR SELECT TO authenticated USING (true);


-- ============================================
-- 6. TIMESTAMP UPDATE TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- 7. STORAGE POLICIES FOR BUCKET "projects"
-- (Bucket must exist manually)
-- ============================================

CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'projects');

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'projects') WITH CHECK (bucket_id = 'projects');

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'projects');


-- ============================================
-- 8. VERIFICATION QUERIES
-- ============================================

-- Tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers');

-- RLS Status
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers');

-- Policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('projects','clients','contact_requests','newsletter_subscribers')
ORDER BY tablename, policyname;

-- Storage Policies
SELECT policyname, roles, cmd
FROM pg_policies
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;

-- ============================================
-- SETUP COMPLETE
-- ============================================
##done##