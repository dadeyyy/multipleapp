'use client'
import { CommentType } from "./Review"

type UserCommentType = { 
  c: CommentType
}

export default function Comment({c}: ) {
  return (
    <li key={c.id} className="border-b pb-2">
            {editingCommentId === c.id ? (
              <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="border p-1"
              />
            ) : (
              <span>{c.comment}</span>
            )}

            {user_id === c.user_id && (
              <div className="flex gap-2 mt-2">
                {editingCommentId === c.id ? (
                  <button onClick={() => handleSaveEdit(c.id)} className="text-blue-600">Save</button>
                ) : (
                  <button onClick={() => handleEdit(c)} className="text-blue-600">Edit</button>
                )}
                <button onClick={() => handleDelete(c.id)} className="text-red-600">Delete</button>
              </div>
            )}
          </li>
  )
}