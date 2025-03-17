import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from './server';
import { redirect } from 'next/navigation';

export async function getUser(supabase: SupabaseClient<any, 'public', any>) {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    redirect('/login');
  }
  return data;
}
