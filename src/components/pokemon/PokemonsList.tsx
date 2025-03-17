'use client';
import Pokemons from './Pokemons';
import SearchPokemonForm from './SearchPokemonForm';
import usePokemonSearch from '@/hooks/usePokemonSearch';
import SortPokemon from './SortPokemon';

export type PokemonType = {
  name: string;
  url: string;
  image: string;
};

export default function PokemonList({ initialPokemons }: { initialPokemons: PokemonType[] }) {
  const { filteredPokemons, searchTerm, setSearchTerm, sortPokemon, sortUpload } = usePokemonSearch(initialPokemons);

  return (
    <>
      <SearchPokemonForm searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div>
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-3xl text-red-400">
            {searchTerm ? `Pokemons matching "${searchTerm}":` : 'Pokemons:'}
          </h1>
          <div className='flex gap-3 text-black'>
            <button
              className="bg-blue-300 hover:bg-blue-500  px-2 py-1 rounded-xl cursor-pointer font-bold"
              onClick={() => sortPokemon()}
            >
              Sort Pokemon
            </button>
            <button
              className="bg-red-300 hover:bg-red-500  px-2 py-1 rounded-xl cursor-pointer font-bold"
              onClick={() => sortUpload()}
            >
              Sort Upload
            </button>
          </div>
        </div>

        {filteredPokemons.length > 0 ? (
          <Pokemons pokemons={filteredPokemons} />
        ) : (
          <p className="text-center">No Pokemons found matching "{searchTerm}"</p>
        )}
      </div>
    </>
  );
}
