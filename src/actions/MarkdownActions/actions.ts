'use server';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/getUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addMarkdown(markdown: string) {
  const supabase = await createClient();
  const user = await getUser(supabase);
  const user_id = user.user.id;
  const { data, error } = await supabase.from('markdown').insert({ markdown, user_id });
  if (error) {
    return { message: 'Failed to add markdown!', success: false };
  }

  revalidatePath('/features/markdown');
  return { message: 'Markdown added!', success: true };
}

export async function deleteMarkdown(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('markdown').delete().eq('id', id);
  if (error) {
    return { message: 'Failed to delete markdown!', success: false };
  }

  revalidatePath('/features/markdown');
  return { message: 'Markdown deleted!', success: true };
}

export async function editMarkdown(id: string, editedMarkdown: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('markdown').update({ markdown: editedMarkdown }).eq('id', id);
  if (error) {
    return { message: 'Failed to update markdown!', success: false };
  }

  revalidatePath('/features/markdown');
  return { message: 'Markdown updated!', success: true };
}
