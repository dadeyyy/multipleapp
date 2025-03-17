'use client';

import { useState } from 'react';
import { uploadFood } from '@/actions/FoodReviewActions/uploadFood';
import toast from 'react-hot-toast';

export default function FoodUploadForm() {
  const [isFormUploading, setIsFormUplaoding] = useState(false);

  async function handleUpload(formData: FormData) {
    const data = await uploadFood(formData);
    data.success ? toast.success(data.message) : toast.error(data.message);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Upload Food</h1>
      <form action={handleUpload} className="space-y-4">
        <input
          type="file"
          name="file"
          required
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {isFormUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
