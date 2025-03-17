'use client';
import { TypeMarkdowns } from '@/app/features/markdown/page';
import { useModal } from '@/context/ModalContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ViewMarkdownModal from './ViewMarkdownModal';

export default function Markdown({ markdown, user_id }: { markdown: TypeMarkdowns; user_id: string }) {
  const { closeModal, modal, openModal, selectedMarkdown } = useModal();
  const markdownOwner = selectedMarkdown?.user_id === user_id;

  const handleOpenViewModal = () => {
    openModal('view', markdown);
  };

  return (
    <div>
      <div
        key={markdown.id}
        className="border-2 max-w-sm overflow-hidden break-words p-5 rounded-lg cursor-pointer"
        onClick={handleOpenViewModal}
      >
        <div className="overflow-x-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown.markdown}</ReactMarkdown>
        </div>
      </div>

      {modal === 'view' && <ViewMarkdownModal owner={markdownOwner} onClose={closeModal} />}
    </div>
  );
}
