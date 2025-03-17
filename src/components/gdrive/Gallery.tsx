import Photo from './Photo';
import SortButton from './SortButton';
type GalleryTypes = {
  files: { name: string; url: string }[];
  query: string;
  currentPage: number;
};

export default function Gallery({ files, query, currentPage }: GalleryTypes) {
  const filterFiles = files.filter((item) => item.name.toLowerCase().includes(query));

  return (
    <div className="">
      <div className='flex gap-5 items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Gdrive Lite</h1>
        <SortButton />
      </div>

      <div className="flex flex-wrap gap-4">
        {filterFiles.map((photo) => {
          return <Photo key={photo.url} photo={photo} />;
        })}
      </div>
    </div>
  );
}
