import FoodPhoto from './FoodPhoto';

export type FoodGalleryTypes = {
  id: string;
  name: string;
  url: string;
  created_at: string;
};

export default function FoodGallery({ photos }: { photos: FoodGalleryTypes[] }) {
  return (
    <div className="">
      <div className="flex flex-wrap gap-4">
        {photos.map((photo) => {
          return <FoodPhoto key={photo.url} photo={photo} />;
        })}
      </div>
    </div>
  );
}
