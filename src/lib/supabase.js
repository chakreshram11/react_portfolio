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
 * Helper to fetch profile row from Supabase + User metadata fallback
 */
export async function fetchProfileData() {
  try {
    const { data: profileData } = await supabase.from('profile').select('*').limit(1).single();
    let metaData = {};
    try {
      const { data: userData } = await supabase.auth.getUser();
      metaData = userData?.user?.user_metadata || {};
    } catch (e) {
      console.warn('Metadata fetch notice:', e);
    }

    let parsedAbout = {};
    if (metaData.about_json) {
      try {
        parsedAbout = typeof metaData.about_json === 'string' ? JSON.parse(metaData.about_json) : metaData.about_json;
      } catch (e) {}
    } else if (profileData?.about_json) {
      try {
        parsedAbout = typeof profileData.about_json === 'string' ? JSON.parse(profileData.about_json) : profileData.about_json;
      } catch (e) {}
    }

    return {
      ...(profileData || {}),
      ...(metaData || {}),
      ...parsedAbout,
      github_url: metaData.github_url || profileData?.github_url || profileData?.github || '',
    };
  } catch (err) {
    console.error('Supabase profile fetch error:', err);
    return null;
  }
}
