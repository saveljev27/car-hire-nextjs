/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.rcstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.discovercars.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fuchsia-persistent-termite-693.mypinata.cloud',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
