import { createClient, SupabaseClient } from '@supabase/supabase-js';


const supabaseUrl: string = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL || '';
const supabaseKey: string = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is missing. Please set NEXT_PUBLIC_MSB_SUPABASE_URL and NEXT_PUBLIC_MSB_SUPABASE_KEY.');
}

// Create a Supabase client with the specified URL and key
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
