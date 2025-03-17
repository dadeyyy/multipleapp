'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function EditComment(comment: string, commentId: string, image_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('comments').update({ comment: comment }).eq('id', commentId).select();

  if (error) {
    return { message: 'Failed to update comment!', success: false };
  }

  console.log(data);
  revalidatePath(`/features/foodreview/${image_id}`);
  return { message: 'Comment updated!', success: true };
}
