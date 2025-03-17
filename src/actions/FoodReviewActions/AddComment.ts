'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addComment(comment: string, post_id: string, user_id: string, image_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('comments').insert({ post_id, user_id, comment, image_id });
  if (error) {
    console.log(error);
    return { message: 'Failed to add comment!', success: false };
  }

  revalidatePath(`features/foodreview/${image_id}`);
  return { message: 'Comment added!', success: true };
}
