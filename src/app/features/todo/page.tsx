import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import TaskForm from './component/TaskForm';

export type todoDataTypes = {
  id: string;
  task_name: string;
  task_priority: string;
  task_status: string;
  created_at: string;
};

async function getUserTodos(supabase: SupabaseClient<any, 'public', any>, id: string): Promise<todoDataTypes[]> {
  const { data: todoData, error: todoError } = await supabase
    .from('todos')
    .select(`id, task_name, task_priority, task_status, created_at`)
    .eq('user_id', id)
    .order('created_at', { ascending: false });

  if (todoError) {
    redirect('/error');
  }
  return todoData;
}

export default async function TodoPage() {
  const supabase = await createClient();
  //Get currentUser
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  const todoData = await getUserTodos(supabase, data.user.id);

  return (
    <div className="flex  gap-8 p-6">
      <TaskForm user_id={data.user.id} todos={todoData} />
    </div>
  );
}
