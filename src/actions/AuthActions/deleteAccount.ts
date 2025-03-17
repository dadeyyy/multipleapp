'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { supabase as supabaseAdmin } from '@/utils/supabase/auth_admin';
import { revalidatePath } from 'next/cache';

export async function deleteAccount() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    redirect('/error');
  }
  const deleteUser = await supabaseAdmin.auth.admin.deleteUser(data.user.id);
  if (deleteUser.error) {
    console.log(deleteUser.error);
  } else {
    revalidatePath('/', 'layout');
    redirect('/login');
  }
}
