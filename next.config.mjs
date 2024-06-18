/** @type {import('next').NextConfig} */

import renderData from './renderData.cjs';

const nextConfig = {
    async redirects() {
        // NOTE: This can go in any async config func.
        // You really just need it to await before Next starts the dev server.
        await renderData();
        return [];
    },
}

export default nextConfig;