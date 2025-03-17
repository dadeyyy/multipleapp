'use client';

import { useState } from 'react';
import AddPokemonReview from './AddPokemonReview';
import toast from 'react-hot-toast';
import { editPokemonComment, deletePokemonComment } from '@/actions/Pokemon/actions';

type PokemonCommentType = {
  id: string;
  pokemon: string;
  comment: string;
  created_at: string;
  user_id: string;
  users: { email: string }[];
};

export default function PokemonReview({
  comments,
  user_id,
  pokemon_name,
}: {
  comments: any;
  user_id: string;
  pokemon_name: string;
}) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState('');

  const handleEdit = (comment: PokemonCommentType) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.comment);
  };

  const handleSaveEdit = async (commentId: string, pokemon: string) => {
    const { message, success } = await editPokemonComment(commentId, editedComment, pokemon);
    success ? toast.success(message) : toast.error(message);
    setEditingCommentId(null);
  };

  const handleDelete = async (commentId: string, pokemon: string) => {
    const { message, success } = await deletePokemonComment(commentId, pokemon);
    success ? toast.success(message) : toast.error(message);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="uppercase font-bold text-2xl">Reviews</h1>
      <AddPokemonReview name={pokemon_name} user_id={user_id} />

      <ul className="flex flex-col gap-5">
        {comments?.map((c:any) => (
          <li key={c.id} className="border flex items-center justify-between px-3 py-2 rounded-lg">
            {editingCommentId === c.id ? (
              <input
                required
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="border px-2 py-1"
              />
            ) : (
              <p className="flex flex-col">
                <span>{c.comment}</span>
                <span className="opacity-40 text-sm">{c.users?.email}</span>
              </p>
            )}

            {user_id === c.user_id && (
              <div className="flex gap-2 mt-2">
                {editingCommentId === c.id ? (
                  <button onClick={() => handleSaveEdit(c.id, c.pokemon)} className="text-blue-600 cursor-pointer">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(c)} className="text-blue-600 cursor-pointer">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(c.id, c.pokemon)} className="text-red-600 cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
