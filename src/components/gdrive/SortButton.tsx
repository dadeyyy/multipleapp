'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SortButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedSort, setSelectedSort] = useState<'name' | 'upload'>('name');

  const handleSetSort = (state: 'name' | 'upload') => {
    const params = new URLSearchParams(searchParams);
    setSelectedSort(state);
    params.set('sort', state);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-5">
      <p className='font-bold'>Sort by:</p>
      <button
        className={`px-3 py-1 cursor-pointer rounded ${
          selectedSort === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => handleSetSort('name')}
      >
        Name
      </button>
      <button
        className={`px-3 py-1 rounded cursor-pointer ${
          selectedSort === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => handleSetSort('upload')}
      >
        Upload
      </button>
    </div>
  );
}
