'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function editTodoAction(id: string, formData: FormData) {
  const supabase = await createClient();
  const editedTask = {
    task: formData.get('task') as string,
    priority: formData.get('priority') as string,
  };
  console.log(editedTask);

  const { error, data } = await supabase
    .from('todos')
    .update({ task_name: editedTask.task, task_priority: editedTask.priority })
    .eq('id', id);

  if (error) {
    console.log(error);
    redirect('/error');
  }

  revalidatePath('/features/todo');
  return { message: 'Task updated!' };
}
