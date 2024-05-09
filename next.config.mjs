import _jiti from 'jiti';
import { fileURLToPath } from 'url';

const jiti = _jiti(fileURLToPath(import.meta.url));

jiti('./env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.coinstats.app',
      },
    ],
  },
};

export default nextConfig;
