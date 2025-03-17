'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteFood(food_id: string, food_name: string) {
  const supabase = await createClient();

  const [deleteImageBucket, deleteImageTable] = await Promise.all([
    supabase.storage.from('photos').remove([food_name]),
    supabase.from('foods').delete().eq('food_id', food_id).select(),
  ]);

  if (deleteImageBucket.error || deleteImageTable.error) {
    console.log(deleteImageBucket.error || deleteImageTable.error);
    return { message: 'Failed to delete!', success: false };
  }

  revalidatePath('/features/foodreview');
  return { message: 'Successfully deleted!', success: true };
}
