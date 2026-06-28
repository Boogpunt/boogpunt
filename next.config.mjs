/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  generateBuildId: () => Date.now().toString(),
};

export default nextConfig;
