/* Firebase Cloud Messaging 背景服務工作者（Service Worker）
 * 必須放在網站根目錄：https://origin-performing-art.web.app/firebase-messaging-sw.js
 * 當網頁沒開啟時，由這個檔案負責顯示推播通知。
 */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ⚠️ 這裡的設定值要和 public/js/notifications.js 保持一致
firebase.initializeApp({
    apiKey: 'AIzaSyCQ-5t6Uzc9SvuvamD3wiEoHhiY_zMMxrM',
    authDomain: 'origin-performing-art.firebaseapp.com',
    projectId: 'origin-performing-art',
    messagingSenderId: '32164182626',
    appId: '1:32164182626:web:f98d68695e8b02c0542f3b',
});

const messaging = firebase.messaging();

// 新版 SW 一裝好就立刻接管，不必等所有分頁關閉。
// （配合 firebase.json 對本檔設 Cache-Control: no-cache，讓裝置能盡快抓到新版）
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// data.actions 是 JSON 字串：[{ action, title, url }, …]，解析失敗就當作沒有按鈕。
function parseActions(raw) {
    if (!raw) return [];
    try {
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return [];
        return arr.filter((a) => a && a.action && a.title).slice(0, 2);
    } catch (e) {
        return [];
    }
}

// 收到背景訊息時顯示通知。
// 後端（scripts/send-notification.js）一律送 data-only 訊息，讓顯示只發生一次；
// 若改送含 notification 欄位的訊息，FCM 會「自動顯示一則 + 這裡再顯示一則」變成收到兩則。
messaging.onBackgroundMessage((payload) => {
    const d = payload.data || {};
    const title = d.title || 'Origin 起源劇團';
    const actions = parseActions(d.actions);

    // 每個按鈕點下去要開的網址，存進 data 供 notificationclick 取用
    const actionUrls = {};
    actions.forEach((a) => { if (a.url) actionUrls[a.action] = a.url; });

    const options = {
        body: d.body || '',
        icon: '/favicon_package/android-chrome-192x192.png',
        badge: '/favicon_package/favicon-32x32.png',
        data: { url: d.url || '/', actionUrls },
    };
    if (d.image) options.image = d.image;
    if (d.tag) options.tag = d.tag;
    if (d.requireInteraction === 'true') options.requireInteraction = true;
    if (actions.length > 0) {
        options.actions = actions.map((a) => ({ action: a.action, title: a.title }));
    }

    self.registration.showNotification(title, options);
});

// 點擊通知（或通知上的按鈕）時開啟對應頁面
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const data = event.notification.data || {};
    const target =
        (event.action && data.actionUrls && data.actionUrls[event.action]) || data.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            for (const client of list) {
                if (client.url.includes(target) && 'focus' in client) return client.focus();
            }
            return clients.openWindow(target);
        })
    );
});
