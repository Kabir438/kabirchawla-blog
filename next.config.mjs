/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn.sanity.io"
            },
            {
                hostname: "api.dicebear.com"
            }
        ]
    },
    experiments: {
        asyncWebAssembly: true
    }
};

export default nextConfig;
