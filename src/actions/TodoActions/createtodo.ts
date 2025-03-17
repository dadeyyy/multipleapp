'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type newTypeTask = {
  task_name: string;
  task_priority: string;
  task_status: string;
};

export async function createTodo(user_id: string, newTask: newTypeTask) {
  const supabase = await createClient();
  const insertData = {
    ...newTask,
    user_id,
  };

  const { error, data } = await supabase.from('todos').insert(insertData).select();
  if (error) {
    redirect('/error');
  }
  revalidatePath('/features/todo');
  return data[0].id;
}
