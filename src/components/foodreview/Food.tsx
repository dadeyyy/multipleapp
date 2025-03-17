'use client';
import Image from 'next/image';
import EditDelete from './EditDelete';
import { useState } from 'react';
import FoodPhotoModal from './FoodPhotoModal';

type FoodDataTypes = {
  id: string;
  food_id: string;
  user_id: string;
  user_email: string;
  full_path: string;
};

type FoodType = {
  name: string;
  id: string;
  data: FoodDataTypes;
  owner: boolean;
};

export type EditFoodModalType = {
  show: boolean;
  fileName: string | null;
  url: string | null;
};

export default function Food({ name, id, data, owner }: FoodType) {
  const [editFoodModal, setFoodEditModal] = useState<EditFoodModalType>({
    show: false,
    fileName: null,
    url: null,
  });

  return (
    <div className="flex flex-col gap-3">
      {editFoodModal.show && <FoodPhotoModal editFoodModal={editFoodModal} setEditFoodModal={setFoodEditModal} />}
      <div className="flex flex-col gap-3">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${data.full_path}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          alt={''}
          priority
        />
        <p className="text-center">
          Made by: <span className="font-bold">{data.user_email}</span>{' '}
        </p>
      </div>

      {owner && (
        <EditDelete
          name={name}
          full_path={data.full_path}
          editFoodModal={editFoodModal}
          setEditFoodModal={setFoodEditModal}
          food_id={id}
          food_name={data.full_path}
        />
      )}
    </div>
  );
}
