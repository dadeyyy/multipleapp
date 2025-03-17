'use client';
import { redirect } from 'next/navigation';
import { FoodGalleryTypes } from './FoodGallery';

export default function FoodPhoto({ photo }: { photo: FoodGalleryTypes }) {
  async function handleEdit(url: string, photoName: string) {}

  async function handleDelete(photoName: string) {}
  //Redirect to the review/comment page
  async function handlePhotoClick(id: string) {
    redirect(`/features/foodreview/${id}`);
  }
  return (
    <>
      <div>
        <img
          src={photo.url}
          alt={photo.name}
          className="rounded-lg shadow-md max-w-40 cursor-pointer"
          onClick={() => handlePhotoClick(photo.id)}
        />

        <p className="mt-2 text-sm text-gray-600 text-center">{photo.name}</p>
      </div>
    </>
  );
}
