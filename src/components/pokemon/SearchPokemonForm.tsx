'use client';
import { ChangeEvent } from 'react';

type SearchPokemonFormProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function SearchPokemonForm({ searchTerm, onSearchChange }: SearchPokemonFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <form className="flex gap-3 justify-center items-center">
      <input
        className="border border-black-500 max-w-7xl px-2 py-1 shadow-lg rounded-sm"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter pokemon name"
      />
    </form>
  );
}
