import { createClient } from '@/utils/supabase/server';
import UploadForm from '@/components/gdrive/UploadForm';
import { redirect } from 'next/navigation';
import Gallery from '@/components/gdrive/Gallery';
import Search from '@/components/gdrive/Search';

async function getPhotos(sort: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from('photos').list('gdrive', {
    sortBy: { column: sort === 'upload' ? 'created_at' : 'name', order: 'asc' },
  });

  if (error) {
    console.log(error);
    redirect('/error');
  }

  if (error) return [];
  const files = data.map((file) => ({
    name: file.name,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/gdrive/${file.name}`,
    created_at: file.created_at,
  }));

  return files;
}

export default async function GDrivePage(props: {
  searchParams?: Promise<{
    query?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const sort = searchParams?.sort || '';
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const files = await getPhotos(sort);

  return (
    <div className="flex flex-col gap-10">
      <UploadForm />
      <Search placeholder="" />
      <Gallery query={query} currentPage={currentPage} files={files} />
    </div>
  );
}
