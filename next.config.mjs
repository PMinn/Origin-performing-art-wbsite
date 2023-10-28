/** @type {import('next').NextConfig} */

import * as fs from 'fs';
import { fetchDatabase, fetchAllData } from './firebase.js';

const nextConfig = {
    async redirects() {
        // NOTE: This can go in any async config func.
        // You really just need it to await before Next starts the dev server.
        fs.mkdirSync('./temp/', { recursive: true });
        const settings = await fetchDatabase('settings/');
        fs.writeFileSync('./temp/settings.json', JSON.stringify(settings));

        var blogs = await fetchAllData("blog");
        Object.keys(blogs).forEach(key => {
            blogs[key].date = blogs[key].date.toDate();
        })
        fs.writeFileSync('./temp/blogs.json', JSON.stringify(blogs));

        var events = await fetchAllData("event");
        fs.writeFileSync('./temp/events.json', JSON.stringify(events));
        return [];
    },
}

export default nextConfig;