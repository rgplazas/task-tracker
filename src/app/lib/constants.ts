import { SupabaseClientOptions } from '@supabase/supabase-js';

export const SUPABASE_CONFIG = {
  url: 'https://lhnyokboslhggukoxnwn.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobnlva2Jvc2xoZ2d1a294bnduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTAzOTcsImV4cCI6MjA2MTQyNjM5N30.0f7Y7deYoRvICJQc8O3mVALnknseb1V3Yi-g-btlczo',
  options: {
    db: {
      schema: 'public'
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } as SupabaseClientOptions<'public'>
};
