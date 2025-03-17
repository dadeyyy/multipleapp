'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function editFood(fileName: string, formData: FormData) {
  const supabase = await createClient();
  const file = formData.get('file') as File;

  if (!file) {
    return { message: 'File not found!', success: false };
  }
  await supabase.storage.from('photos').remove([`foods/${fileName}`]);

  const { data, error } = await supabase.storage.from('photos').upload(`foods/${file.name}`, file, {
    upsert: true,
  });

  if (error) {
    console.log('Error uploading file:', error);
    return { message: 'Failed to upload file', success: false };
  }

  // Update image name in the database
  const updateImageName = await supabase
    .from('foods')
    .update({ full_path: `foods/${file.name}` })
    .eq('food_id', fileName);

  if (updateImageName.error) {
    console.log('Error updating database record:', updateImageName.error);
    return { message: 'Failed to update database record', success: false };
  }

  revalidatePath('/features/foodreview');
  return { message: 'Updated successfully', success: true };
}
