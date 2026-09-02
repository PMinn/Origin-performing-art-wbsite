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

// 收到背景訊息時顯示通知。
// 後端（scripts/send-notification.js）一律送 data-only 訊息，讓顯示只發生一次；
// 若改送含 notification 欄位的訊息，FCM 會「自動顯示一則 + 這裡再顯示一則」變成收到兩則。
messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || payload.data?.title || 'Origin 起源劇團';
    const image = (payload.notification && payload.notification.image) || payload.data?.image;
    const options = {
        body: (payload.notification && payload.notification.body) || payload.data?.body || '',
        icon: '/favicon_package/android-chrome-192x192.png',
        badge: '/favicon_package/favicon-32x32.png',
        data: { url: (payload.fcmOptions && payload.fcmOptions.link) || payload.data?.url || '/' },
    };
    if (image) options.image = image;
    self.registration.showNotification(title, options);
});

// 點擊通知時開啟對應頁面
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const target = (event.notification.data && event.notification.data.url) || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            for (const client of list) {
                if (client.url.includes(target) && 'focus' in client) return client.focus();
            }
            return clients.openWindow(target);
        })
    );
});
