'use client';
import { useModal } from '@/context/ModalContext';
import Modal from './Modal';
import { deleteMarkdown } from '@/actions/MarkdownActions/actions';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { editMarkdown } from '@/actions/MarkdownActions/actions';

export default function ViewMarkdownModal({ onClose, owner }: { onClose: () => void; owner: boolean }) {
  const { selectedMarkdown, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMarkdown, setEditedMarkdown] = useState(selectedMarkdown?.markdown || '');

  const handleDeleteMarkdown = async (id: string) => {
    const { message, success } = await deleteMarkdown(id);
    success ? toast.success(message) : toast.error(message);
    closeModal();
  };

  const handleEditMarkdown = () => {
    setIsEditing(true);
  };

  const handleSaveEditMarkdown = async (id: string) => {
    if (editedMarkdown === selectedMarkdown?.markdown) {
      toast.error('Change the markdown!');
      return;
    }
    const { success, message } = await editMarkdown(id, editedMarkdown);
    setIsEditing(false);
    closeModal();
    success ? toast.success(message) : toast.error(message);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-semibold">View Markdown</h2>
        {isEditing ? (
          <textarea
            className="border rounded-lg p-3 w-full h-80 text-sm resize-none bg-gray-100 focus:ring-2 focus:ring-blue-500"
            name="markdown"
            id="markdown"
            defaultValue={selectedMarkdown?.markdown}
            onChange={(e) => setEditedMarkdown(e.target.value)}
          />
        ) : (
          <div className="border rounded-lg p-3 w-full h-80 text-sm resize-none bg-gray-100 focus:ring-2 focus:ring-blue-500">
            <p>{selectedMarkdown?.markdown}</p>
          </div>
        )}

        {owner && (
          <div className="flex justify-end gap-3">
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
                  onClick={() => handleSaveEditMarkdown(selectedMarkdown?.id || '')}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
                  onClick={handleEditMarkdown}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMarkdown(selectedMarkdown!.id)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
