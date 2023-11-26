/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/1', // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};
