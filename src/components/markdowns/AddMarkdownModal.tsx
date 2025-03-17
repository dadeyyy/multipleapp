'use client';

import { useState } from 'react';
import Modal from './Modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { addMarkdown } from '@/actions/MarkdownActions/actions';
import toast from 'react-hot-toast';

export default function AddMarkdownModal({ onClose }: { onClose: () => void }) {
  const [markdown, setMarkdown] = useState('');

  async function saveToDatabase(markdown: string) {
    const { message, success } = await addMarkdown(markdown);
    success ? toast.success(message) : toast.error(message);
    setMarkdown('');
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center items-start gap-6 w-full">
        <div className="flex flex-col gap-3 flex-1 min-w-[300px] border p-4 rounded-lg shadow">
          <h1 className="text-xl font-bold">Add a Markdown</h1>
          <textarea
            className="w-full h-40 p-3 border rounded-md resize-none"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            onClick={() => saveToDatabase(markdown)}
          >
            Save
          </button>
        </div>

        {markdown !== '' && (
          <div className="flex-1 min-w-[300px] border p-4 rounded-lg shadow">
            <h1 className="text-xl font-bold">Visualizer</h1>
            <hr />
            <div className="prose max-w-none p-3">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
