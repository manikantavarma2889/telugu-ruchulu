import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing in .env.local or Vercel Environment Variables. The app may not function correctly.');
}

// Fallback to dummy URLs so the app doesn't fatally crash on boot and show a white screen
export const supabase = createClient(
    supabaseUrl || 'https://placeholder-project.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            storageKey: 'telugu-ruchulu-auth-token', // Custom key to bypass stuck LockManager locks
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    }
);
