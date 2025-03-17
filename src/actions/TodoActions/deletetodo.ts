'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteTodo(id: string) {
  const intId = parseInt(id);
  const supabase = await createClient();

  const { data, error } = await supabase.from('todos').delete().eq('id', intId).select();
  if (error) {
    console.log(error);
    redirect('/error');
  }

  revalidatePath('/features/todo');
}
