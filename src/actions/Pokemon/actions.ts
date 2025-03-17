'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPokemonComment(pokemon: string, comment: string, user_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('pokemon').insert({ pokemon, comment, user_id });
  if (error) {
    return { message: 'Failed to add comment!', success: false };
  }

  revalidatePath(`/features/pokemon/${pokemon}`);
  return { message: 'Comment added!', success: true };
}

export async function editPokemonComment(id: string, comment: string, pokemon: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('pokemon').update({ comment }).eq('id', id);
  if (error) {
    return { message: 'Failed to update comment!', success: false };
  }

  revalidatePath(`features/pokemon/${pokemon}`);
  return { message: 'Comment updated!', success: true };
}

export async function deletePokemonComment(id: string, pokemon: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('pokemon').delete().eq('id', id);
  if (error) {
    return { message: 'Failed to delete comment!', success: false };
  }

  revalidatePath(`features/pokemon/${pokemon}`);
  return { message: 'Comment deleted!', success: true };
}
