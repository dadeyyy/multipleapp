import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: ['cltmqbqzcpcecrsjrzmv.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cltmqbqzcpcecrsjrzmv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/photos/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
      },
    ],
  },
};

export default nextConfig;
