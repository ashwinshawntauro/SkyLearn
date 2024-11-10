/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ui-avatars.com',
            pathname: '/api/**', // matches the path pattern for avatars
          },
        ],
      },
};

export default nextConfig;
