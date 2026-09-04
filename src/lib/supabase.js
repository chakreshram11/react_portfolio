import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Returns public URL for a file in Supabase storage bucket dynamically
 */
export function getStorageUrl(path, bucket = 'portfolio-assets') {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    // If it's an existing absolute Supabase URL with project ref, dynamically format with current Supabase URL if needed
    if (path.includes('/storage/v1/object/public/')) {
      const parts = path.split('/storage/v1/object/public/');
      if (parts[1]) {
        const [bucketName, ...filePath] = parts[1].split('/');
        const relativePath = filePath.join('/');
        const { data } = supabase.storage.from(bucketName || bucket).getPublicUrl(relativePath);
        return data?.publicUrl || path;
      }
    }
    return path;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
}

/**
 * Helper to fetch profile row from Supabase
 */
export async function fetchProfileData() {
  try {
    const { data, error } = await supabase.from('profile').select('*').limit(1).single();
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Supabase profile fetch error:', err);
    return null;
  }
}

