// Error: Invalid src prop (https://res.cloudinary.com/dekrwkiyp/image/upload/v1724871481/testimonials/companyLogo/qcomgq0luxg9fdkup2xs.jpg) on `next/image`, hostname "res.cloudinary.com" is not configured under images in your `next.config.js`



/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
