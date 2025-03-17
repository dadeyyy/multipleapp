'use client';

import { useState } from 'react';
import AddReview from './AddReview';
import { DeleteComment } from '@/actions/FoodReviewActions/deleteComment';
import toast from 'react-hot-toast';
import { EditComment } from '@/actions/FoodReviewActions/EditComment';

export type CommentType = {
  id: string;
  user_id: string;
  created_at: string;
  comment: string;
  users: { email: string }[];
};

export type FoodReviewType = {
  comments?: CommentType[];
  post_id: string;
  user_id: string;
  image_id: string;
};

export default function FoodReview({ comments, post_id, user_id, image_id }: FoodReviewType) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');

  const handleEdit = (comment: CommentType) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.comment);
  };

  const handleSaveEdit = async (commentId: string) => {
    const { message, success } = await EditComment(editedComment, commentId, image_id);
    success ? toast.success(message) : toast.error(message);
    setEditingCommentId(null);
  };

  const handleDelete = async (commentId: string) => {
    const { message, success } = await DeleteComment(commentId, image_id);
    success ? toast.success(message) : toast.error(message);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <h1 className="uppercase font-bold text-2xl">Reviews</h1>
      <AddReview post_id={post_id} user_id={user_id} image_id={image_id} />

      <ul className="flex flex-col gap-5">
        {comments?.map((c) => (
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
                  <button onClick={() => handleSaveEdit(c.id)} className="text-blue-600 cursor-pointer">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(c)} className="text-blue-600 cursor-pointer">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(c.id)} className="text-red-600 cursor-pointer">
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
