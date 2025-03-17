'use client';
import { deleteImage } from '@/actions/GdriveActions/delete';
import { useState } from 'react';
import toast from 'react-hot-toast';
import EditPhotoModal from './EditPhotoModal';
import Image from 'next/image';

type PhotoProps = {
  url: string;
  name: string;
};

export type EditModalType = {
  show: boolean;
  photoName: string | null;
  photoUrl: string | null;
};

export default function Photo({ photo }: { photo: PhotoProps }) {
  const [showEditModal, setShowEditModal] = useState<EditModalType>({
    photoName: null,
    photoUrl: null,
    show: false,
  });

  const photoNameNoExt = photo.name.split('.')[0];

  const handleDelete = async (photoName: string) => {
    const res = await deleteImage(photoName);
    res.success ? toast.success(res.message) : toast.error(res.message);
  };

  const handleEdit = (url: string, photoName: string) => {
    setShowEditModal({
      photoName: photoName,
      photoUrl: url,
      show: true,
    });
  };

  return (
    <>
      {showEditModal.show && <EditPhotoModal editModal={showEditModal} setEditModal={setShowEditModal} />}
      <div key={photo.name} className="relative group">
        <img src={photo.url} alt={photo.name} className="rounded-lg shadow-md max-w-40" />

        <button className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
          •••
        </button>

        <div className="absolute top-10 right-2 bg-white shadow-md p-2 rounded-md opacity-0 group-hover:opacity-100 transition flex flex-col">
          <button
            className="text-blue-500 text-sm hover:underline mb-1 cursor-pointer"
            onClick={() => handleEdit(photo.url, photo.name)}
          >
            Edit
          </button>
          <button
            className="text-red-500 text-sm hover:underline cursor-pointer"
            onClick={() => handleDelete(photo.name)}
          >
            Delete
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-600 text-center">{photoNameNoExt}</p>
      </div>
    </>
  );
}
