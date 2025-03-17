//fetch food reviews photos
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SortButton from '@/components/gdrive/SortButton';
import FoodUploadForm from '@/components/foodreview/FoodUploadForm';
import FoodGallery from '@/components/foodreview/FoodGallery';

async function fetchFoodPhotos(sort: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from('photos').list('foods', {
    sortBy: { column: sort === 'upload' ? 'created_at' : 'name', order: 'asc' },
  });

  if (error) {
    redirect('/error');
  }

  const foodPhotos = data.map((photo) => ({
    id: photo.id,
    name: photo.name,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/foods/${photo.name}`,
    created_at: photo.created_at,
  }));

  return foodPhotos;
}

export default async function FoodReviewPage(props: {
  searchParams?: Promise<{
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const sort = searchParams?.sort || '';
  const foodPhotos = await fetchFoodPhotos(sort);

  return (
    <div className="flex flex-col gap-10">
      <FoodUploadForm />
      <SortButton />
      <FoodGallery photos={foodPhotos} />
    </div>
  );
}
