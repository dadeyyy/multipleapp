'use client';

import { Dispatch, FormEvent, SetStateAction } from 'react';
import { todoDataTypes } from '../page';
import { editTodoAction } from '@/actions/TodoActions/edittodo';
import toast from 'react-hot-toast';

type EditModalType = {
  show: boolean;
  data: todoDataTypes | null;
};

type ModalTypes = {
  todo: todoDataTypes;
  editModal: EditModalType;
  setEditModal: Dispatch<
    SetStateAction<{
      show: boolean;
      data: todoDataTypes | null;
    }>
  >;
};

export default function Modal({ todo, editModal, setEditModal }: ModalTypes) {
  const handleEditFalse = () => {
    setEditModal({ show: false, data: null });
  };

  const handleEditAction = async (formData: FormData) => {
    await editTodoAction(editModal.data!.id, formData);
    setEditModal({ show: false, data: null });
    toast.success('Task edited!');
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex justify-end">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full ">
        <form
          action={handleEditAction}
          className="flex flex-col gap-4 p-10 max-w-2xl mx-auto rounded-xl relative h-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="task" className="text-lg font-medium text-gray-700">
              Task:
            </label>
            <input
              id="task"
              className="border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
              type="text"
              name="task"
              placeholder="Enter your task"
              defaultValue={todo.task_name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-lg font-medium text-gray-700">
              Priority:
            </label>
            <select
              id="priority"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none appearance-none bg-white"
              name="priority"
              defaultValue={todo.task_priority}
            >
              <option value="low">LOW</option>
              <option value="medium">MEDIUM</option>
              <option value="high">HIGH</option>
            </select>
          </div>
          <button
            onClick={handleEditFalse}
            className="absolute top-2 right-5 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
            type="button"
          >
            x
          </button>

          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-700 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
