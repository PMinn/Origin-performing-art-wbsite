import * as fs from 'fs';
import { fetchDatabase, fetchAllData, fetchStorageMutipleByPaths } from './firebase.js';

export default async function renderData() {
    fs.mkdirSync('./temp/', { recursive: true });

    // 通用設定
    const settings = await fetchDatabase('settings/');
    fs.writeFileSync('./temp/settings.json', JSON.stringify(settings));

    // blog
    var blogs = await fetchAllData("blog");
    Object.keys(blogs).forEach(key => {
        blogs[key].date = blogs[key].date.toDate();
    })
    fs.writeFileSync('./temp/blogs.json', JSON.stringify(blogs));

    // 活動行程
    var events = await fetchAllData("event");
    Object.keys(events).forEach(key => {
        events[key].date = events[key].date.toDate();
    })
    fs.writeFileSync('./temp/events.json', JSON.stringify(events));
}