'use client';
import { FoodReviewType } from './Review';
import { addComment } from '@/actions/FoodReviewActions/AddComment';
import toast from 'react-hot-toast';
import { useRef } from 'react';

export default function AddReview({ post_id, user_id, image_id }: FoodReviewType) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const review = formData.get('review') as string;
    const data = await addComment(review, post_id, user_id, image_id);
    data.success ? toast.success(data.message) : toast.error(data.message);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="flex gap-5">
      <input
        ref={inputRef}
        required
        name="review"
        placeholder="Add review"
        type="text"
        className=" rounded-lg shadow-sm border border-gray-300 px-2 py-1 w-full"
      />
      <button className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white px-3 py-2 cursor-pointer">Submit</button>
    </form>
  );
}
