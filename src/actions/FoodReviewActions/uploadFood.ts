'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function uploadFood(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();
  const file = formData.get('file') as File;

  //upload the file
  const { data, error } = await supabase.storage.from('photos').upload(`foods/${file.name}`, file, { upsert: false });

  if (error) {
    return { message: 'Failed to upload', success: false };
  }
  const { data: foodsTableData, error: foodsTableError } = await supabase
    .from('foods')
    .insert({
      food_id: data.id,
      user_id: auth.data.user?.id,
      user_email: auth.data.user?.email,
      full_path: data.path,
    })
    .select();

  if (foodsTableError) {
    return { message: 'Failed to upload', success: false };
  }

  revalidatePath('/features/foodreview');
  return { message: 'File uploaded', success: true };
}
