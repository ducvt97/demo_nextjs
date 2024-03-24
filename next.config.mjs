/** @type {import('next').NextConfig} */
import path from "path";

const __dirname = path.resolve();

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
