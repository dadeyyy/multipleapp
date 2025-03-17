'use client';
import Image from 'next/image';
import Link from 'next/link';

type PokemonType = {
  name: string;
  url: string;
  image: string;
};

export default function Pokemons({ pokemons }: { pokemons: PokemonType[] }) {
  return (
    <ul className="flex flex-wrap gap-10">
      {pokemons.map((pok) => (
        <Link href={`/features/pokemon/${pok.name}`} key={pok.name}>
          <li className="flex flex-col justify-center items-center cursor-pointer hover:scale-110 transition-transform">
            <span className="uppercase font-semibold">{pok.name}</span>
            <Image src={pok.image} height={100} width={100} alt={pok.name} />
          </li>
        </Link>
      ))}
    </ul>
  );
}
