import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import PokemonReview from '@/components/pokemon/PokemonReview';
import { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const COLORS = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-orange-500',
];

const getPokemonDetails = cache(async (name: string) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error(`Error fetching Pokemon ${name}: ${res.status} ${res.statusText}`);
      return null;
    }

    console.log(`Fetched data for ${name}!`);
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch Pokemon ${name}:`, error);
    return null;
  }
});

const getPokemonComments = cache(async (name: string, supabase: SupabaseClient<any, 'public', any>) => {
  try {
    const { data, error } = await supabase
      .from('pokemon')
      .select(`id, pokemon, comment, created_at, user_id, users(email)`)
      .eq('pokemon', name)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching comments for ${name}:`, error);
      return [];
    }

    console.log('Fetched data comments for', name);
    return data || [];
  } catch (error) {
    console.error(`Failed to fetch comments for ${name}:`, error);
    return [];
  }
});

// Get a random color from the colors array
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export default async function PokemonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Check auth first to avoid unnecessary data fetching
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch Pokemon details and comments in parallel
  const [pokemon, pokemonComments] = await Promise.all([getPokemonDetails(id), getPokemonComments(id, supabase)]);

  // Handle case where Pokemon couldn't be fetched
  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Pokemon not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <Image
            src={pokemon.sprites.front_default}
            height={300}
            width={300}
            alt={pokemon.name}
            priority // Prioritize loading this image
          />
          <h1 className="uppercase text-2xl font-bold">{pokemon.name}</h1>
        </div>

        <ul className="uppercase flex flex-col justify-center items-center gap-3">
          <h1 className="font-semibold text-lg">Abilities: </h1>
          {pokemon.abilities.map((a: any) => (
            <li className={`${getRandomColor()} font-medium`} key={a.ability.name}>
              {a.ability.name}
            </li>
          ))}
        </ul>
      </div>

      <PokemonReview pokemon_name={id} user_id={user.id} comments={pokemonComments} />
    </div>
  );
}
