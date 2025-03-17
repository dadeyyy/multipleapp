'use client';

import { deleteFood } from '@/actions/FoodReviewActions/deleteFood';
import { redirect } from 'next/navigation';
import { EditFoodModalType } from './Food';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction } from 'react';

type EditDeleteType = {
  name: string;
  full_path: string;
  editFoodModal: EditFoodModalType;
  setEditFoodModal: Dispatch<SetStateAction<EditFoodModalType>>;
  food_id: string;
  food_name: string;
};

export default function EditDelete({
  name,
  full_path,
  editFoodModal,
  setEditFoodModal,
  food_id,
  food_name,
}: EditDeleteType) {
  const handleEditFoodReview = () => {
    setEditFoodModal({
      show: true,
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${full_path}`,
      fileName: name,
    });
  };

  const handleDeleteFoodReview = async (food_id: string, food_name: string) => {
    const data = await deleteFood(food_id, food_name);
    !data.success ? toast.error(data.message) : toast.success('Image deleted!');
    redirect('/features/foodreview');
  };

  return (
    <div className="flex text-white">
      <button onClick={handleEditFoodReview} className="w-1/2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-xl">
        Edit
      </button>
      <button
        onClick={() => handleDeleteFoodReview(food_id, food_name)}
        className="w-1/2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-xl"
      >
        Delete
      </button>
    </div>
  );
}
