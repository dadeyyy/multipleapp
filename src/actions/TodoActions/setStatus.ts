'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function editStatus(id: string, status: boolean) {
  const supabase = await createClient();
  const updatedStatus = status ? 'done' : 'todo';
  const { error } = await supabase.from('todos').update({ task_status: updatedStatus }).eq('id', id);
  if (error) {
    console.log(error);
    redirect('/error');
  }
}
