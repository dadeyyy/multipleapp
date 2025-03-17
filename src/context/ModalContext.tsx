'use client';

import { TypeMarkdowns } from '@/app/features/markdown/page';
import { createContext, useContext, useState } from 'react';

type ModalType = 'add' | 'view' | null;
type ModalContextType = {
  modal: ModalType;
  openModal: (type: ModalType, markdown?: TypeMarkdowns) => void;
  closeModal: () => void;
  selectedMarkdown: TypeMarkdowns | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedMarkdown, setSelectedMarkdown] = useState<TypeMarkdowns | null>(null);

  const openModal = (type: ModalType, markdown?: TypeMarkdowns) => {
    setModal(type);
    setSelectedMarkdown(markdown || null);
  };
  const closeModal = () => {
    setModal(null);
    setSelectedMarkdown(null);
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, selectedMarkdown }}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
