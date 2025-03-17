'use client';

import toast from 'react-hot-toast';
import { useRef } from 'react';
import { addPokemonComment } from '@/actions/Pokemon/actions';

export default function AddReview({ name, user_id }: { name: string; user_id: string }) {
  const commentRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = formData.get('comment') as string;
    const data = await addPokemonComment(name, comment, user_id);
    data.success ? toast.success(data.message) : toast.error(data.message);
    if (commentRef.current) {
      commentRef.current.value = '';
    }
  };
  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="flex gap-5">
      <input
        ref={commentRef}
        required
        name="comment"
        placeholder="Add review"
        type="text"
        className=" rounded-lg shadow-sm border border-gray-300 px-2 py-1 w-full"
      />
      <button className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white px-3 py-2 cursor-pointer">Submit</button>
    </form>
  );
}
