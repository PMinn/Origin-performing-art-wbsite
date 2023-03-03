const { ref, get, getDatabase } = require('firebase/database');
const { initializeApp } = require('firebase/app');
const fs = require('fs');

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCQ-5t6Uzc9SvuvamD3wiEoHhiY_zMMxrM",
    authDomain: "origin-performing-art.firebaseapp.com",
    databaseURL: "https://origin-performing-art-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "origin-performing-art",
    storageBucket: "origin-performing-art.appspot.com",
    messagingSenderId: "32164182626",
    appId: "1:32164182626:web:f98d68695e8b02c0542f3b",
    measurementId: "G-5BMJEJHT05"
})
const database = getDatabase(firebaseApp);

function fetchData(kind) {
    return get(ref(database, kind + 's'))
        .then(snapshot => {
            var data = snapshot.val();
            return Object.keys(data).map(key => {
                var d = data[key];
                return `/${kind}/${d.id}/${d.title}`;
            })
        })
}

function mergeData(dataArray) {
    return Promise.all(dataArray)
        .then(data => {
            var newData = [];
            data.forEach(kind => {
                kind.forEach(item => {
                    newData.push(item);
                })
            })
            return newData;
        });
}

function toXML(paths) {
    var now = new Date();
    return '<?xml version="1.0" encoding="UTF-8"?>' + paths.map(path => {
        return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://origin-performing-art.web.app${encodeURI(path)}</loc><lastmod>${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}</lastmod></url></urlset>`;
    }).join('');
}

mergeData([fetchData('blog'), fetchData('event')])
    .then(paths => {
        fs.writeFile('./public/sitemap.xml', toXML(paths), (err) => {
            if (err) {
                throw err;
            } else {
                process.exit(0);
            }
        });
    })