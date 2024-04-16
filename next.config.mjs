import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['*'], // Chấp nhận hình ảnh từ tất cả các đường dẫn
    },
};
 
export default withNextIntl(nextConfig);