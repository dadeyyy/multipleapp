import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { ModalProvider } from '@/context/ModalContext';
import AddMarkdownBtn from '@/components/markdowns/AddMarkdownBtn';
import Markdown from '@/components/markdowns/Markdown';
import { SupabaseClient } from '@supabase/supabase-js';

export type TypeMarkdowns = {
  id: string;
  markdown: string;
  user_id: string;
  created_at: string;
};

async function getMarkdowns(supabase: SupabaseClient<any, 'public', any>) {
  const { data, error } = await supabase.from('markdown').select();

  if (error) {
    console.log(error);
    redirect('/error');
  }
  return data ?? [];
}

export default async function MarkDownNotesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect('/login');
  }
  const user_id = data.user.id;
  const markdowns: TypeMarkdowns[] = await getMarkdowns(supabase);

  return (
    <ModalProvider>
      <div className="p-4 flex flex-col gap-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Markdown Notes App</h1>
          <AddMarkdownBtn />
        </div>
        <div className="flex gap-5 flex-wrap">
          {markdowns.map((md: TypeMarkdowns) => {
            return <Markdown markdown={md} key={md.id} user_id={user_id} />;
          })}
        </div>
      </div>
    </ModalProvider>
  );
}
