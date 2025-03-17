'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function DeleteComment(commentId: string, image_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('comments').delete().eq('id', commentId);

  if (error) {
    console.log(error);
    return { message: 'Failed to delete comment', success: false };
  }

  revalidatePath(`/features/foodreview/${image_id}`);
  return { message: 'Comment deleted!', success: true };
}
