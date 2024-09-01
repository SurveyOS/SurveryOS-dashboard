/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  redirects: async () => {
    return [
      {
        source: '/c/:companyId/settings',
        destination: '/c/:companyId/settings/general',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
