import { Dispatch, SetStateAction } from 'react';
import { editImage } from '@/actions/GdriveActions/edit';
import toast from 'react-hot-toast';
import { EditModalType } from './Photo';

type EditModalTypes = {
  editModal: EditModalType;
  setEditModal: Dispatch<SetStateAction<EditModalType>>;
};

export default function EditPhotoModal({ editModal, setEditModal }: EditModalTypes) {
  const handleEditFalse = () => {
    setEditModal({ show: false, photoUrl: null, photoName: null });
  };

  const handleEditAction = async (formData: FormData) => {
    const res = await editImage(formData, editModal.photoName!);
    res.success ? toast.success(res.message) : toast.error(res.message);
    setEditModal({ show: false, photoUrl: null, photoName: null });
  };

  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full flex gap-6">
        <div className="flex flex-col items-center w-1/2">
          <h1 className="text-lg font-semibold mb-4">Edit {editModal.photoName}</h1>
          {editModal.photoUrl && (
            <img src={editModal.photoUrl} alt="Preview" className="rounded-lg shadow-md max-h-60 object-cover" />
          )}
        </div>

        <div className="w-1/2 relative">
          <form className="flex flex-col gap-4 mt-15" action={handleEditAction}>
            <input
              type="file"
              name="file"
              required
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleEditFalse}
              className="absolute top-2 right-5 text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
              type="button"
            >
              ×
            </button>
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
