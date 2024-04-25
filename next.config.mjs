import _jiti from 'jiti';
import { fileURLToPath } from 'url';

const jiti = _jiti(fileURLToPath(import.meta.url));

jiti('./env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
