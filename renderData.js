import * as fs from 'fs';
import { fetchDatabase, fetchAllData, fetchImage } from './firebase.js';

export default async function renderData() {
    fs.mkdirSync('./temp/', { recursive: true });

    // 通用設定
    const settings = await fetchDatabase('settings/');
    fs.writeFileSync('./temp/settings.json', JSON.stringify(settings));

    // blog
    var blogs = await fetchAllData("blog");
    var blogKeys = Object.keys(blogs);
    for (let i = 0; i < blogKeys.length; i++) {
        blogs[blogKeys[i]].date = blogs[blogKeys[i]].date.toDate();
        try {
            blogs[blogKeys[i]].image = await fetchImage(blogs[blogKeys[i]].image);
        } catch { }
    }
    fs.writeFileSync('./temp/blogs.json', JSON.stringify(blogs));

    // 活動行程
    var events = await fetchAllData("event");
    var eventKeys = Object.keys(events);
    for(let i = 0; i < eventKeys.length; i++) {
        events[eventKeys[i]].date = events[eventKeys[i]].date.toDate();
        try {
            events[eventKeys[i]].image = await fetchImage(events[eventKeys[i]].image);
        } catch { }
    }
    fs.writeFileSync('./temp/events.json', JSON.stringify(events));
}