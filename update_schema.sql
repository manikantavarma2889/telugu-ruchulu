-- 1. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Add user_id to Orders Table
ALTER TABLE orders 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Update RLS (Row Level Security) - Optional but good practice
-- For now, we will just ensure the columns exist so the frontend can start saving data.

-- Note: Ensure Supabase Auth is enabled for your project (Email/Password or Phone).
