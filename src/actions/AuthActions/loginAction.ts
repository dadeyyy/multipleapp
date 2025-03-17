'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  //FormsData
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  //Sign in with supabase
  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (error && error.message) {
    return { message: error.message };
  }

  redirect('/');
}


