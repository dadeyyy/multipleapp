import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Food from '@/components/foodreview/Food';
import FoodReview from '@/components/foodreview/Review';
import { SupabaseClient } from '@supabase/supabase-js';
import { CommentType } from '@/components/foodreview/Review';

async function fetchSelectedFood(id: string, supabase: SupabaseClient<any, 'public', any>) {
  const { data: food, error: foodError } = await supabase.from('foods').select('*').eq('food_id', id).single();
  if (foodError || !food) {
    redirect('/features/foodreview');
  }
  return food;
}

async function fetchComments(id: string, supabase: SupabaseClient<any, 'public', any>) {
  const { data, error } = await supabase
    .from('comments')
    .select(`id, post_id, comment, created_at, user_id, users(email)`)
    .eq('image_id', id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    redirect('/error');
  }
  if (!data) return [];

  return data;
}

export default async function FoodCommentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    redirect('/login');
  }
  const food = await fetchSelectedFood(id, supabase);
  const comments = await fetchComments(id, supabase);
  // Determine ownership
  const owner = authData.user.id === food.user_id;

  return (
    <div className="flex flex-col gap-20 justify-center items-center">
      <Food name={food.name} id={id} data={food} owner={owner} />
      <FoodReview comments={comments} post_id={food.id} user_id={authData.user.id} image_id={id} />
    </div>
  );
}
