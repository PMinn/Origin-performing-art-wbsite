/** @type {import('next').NextConfig} */

import * as fs from 'fs';
import { fetchDatabase, fetchBlogs } from './firebase.js';

const nextConfig = {
    async redirects() {
        // NOTE: This can go in any async config func.
        // You really just need it to await before Next starts the dev server.
        fs.mkdirSync('./temp/', { recursive: true });
        const settings = await fetchDatabase('settings/');
        fs.writeFileSync('./temp/settings.json', JSON.stringify(settings));

        var blogs = await fetchBlogs();
        // blogs = Object.keys(blogs).map(key => ({ ...blogs[key], id: key }));
        fs.writeFileSync('./temp/blogs.json', JSON.stringify(blogs));
        return [];
    },
}

export default nextConfig;