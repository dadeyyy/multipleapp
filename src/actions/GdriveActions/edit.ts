'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function editImage(formData: FormData, photoName: string) {
  const supabase = await createClient();
  const file = formData.get('file') as File;

  if (!file) {
    return { message: 'File not found!' };
  }
  //Update the name of the file:

  const { data, error } = await supabase.storage.from('photos').update(`gdrive/${photoName}`, file, {
    upsert: false,
  });

  if (error) {
    console.log('error', error);
    return { message: `Failed to update ${photoName}`, success: false };
  }

  const { data: moveData, error: moveError } = await supabase.storage
    .from('photos')
    .move(`gdrive/${photoName}`, `gdrive/${file.name}`);

  if (moveError) {
    return { message: `${file.name} already exist!`, success: false };
  }

  revalidatePath('/features/gdrive');
  return { message: `Successfully updated!`, success: true };
}
