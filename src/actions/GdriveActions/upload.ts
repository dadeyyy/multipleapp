'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function uploadPhoto(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get('file') as File;
  if (!file) return { error: 'No file selected' };

  const { error } = await supabase.storage.from('photos').upload(`gdrive/${file.name}`, file, {
    upsert: false,
  });
  const err = error as { statusCode: string; error: string; message: string } | null;
  if (error) {
    if (err?.statusCode === '409') {
      return { message: 'File already exist!', success: false };
    }
    return { message: error.message, success: false };
  }

  revalidatePath('/features/gdrive');
  return { success: true, message: 'Image uploaded!' };
}
