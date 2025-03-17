'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteImage(photoName: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage.from('photos').remove([`gdrive/${photoName}`]);
  if (error) {
    return { message: 'Failed to delete photo', success: false };
  }

  revalidatePath('/features/gdrive');
  return { message: `Photo ${photoName} deleted!`, success: true };
}
