'use client';

import { useModal } from '@/context/ModalContext';
import AddMarkdownModal from './AddMarkdownModal';

export default function AddMarkdownBtn() {
  const { modal, closeModal, openModal } = useModal();

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 rounded-lg px-2 py-3 text-white cursor-pointer"
        onClick={() => openModal('add')}
      >
        Add markdown
      </button>
      {modal === 'add' && <AddMarkdownModal onClose={closeModal} />}
    </>
  );
}
