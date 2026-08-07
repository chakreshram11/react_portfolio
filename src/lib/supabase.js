import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uyemhrhwuyrqwvppluge.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZW1ocmh3dXlycXd2cHBsdWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzA0MzEsImV4cCI6MjEwMTY0NjQzMX0.dWrPKRcJY84AUqKlfi8CjSrrNmZg99ePO-tWWxI0GxE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
