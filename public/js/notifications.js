/* 訂閱推播通知
 * 需求：頁面已載入 firebase-app-compat / firebase-messaging-compat / firebase-database-compat
 * 使用：在頁面放一個 id="notify-btn" 的按鈕即可，本檔會自動綁定。
 */
(function () {
    // ⚠️ 從 Firebase Console → 專案設定 → 一般 取得下列值
    const firebaseConfig = {
        apiKey: 'AIzaSyCQ-5t6Uzc9SvuvamD3wiEoHhiY_zMMxrM',
        authDomain: 'origin-performing-art.firebaseapp.com',
        databaseURL: 'https://origin-performing-art-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'origin-performing-art',
        messagingSenderId: '32164182626',
        appId: '1:32164182626:web:f98d68695e8b02c0542f3b',
    };

    // ⚠️ Firebase Console → 專案設定 → Cloud Messaging → 網頁推送憑證 產生的金鑰對（VAPID public key）
    const VAPID_KEY = 'BG7LXWFB61H9tTaUyPH4Lra_4r9pNTYRs-Equ0bTJatA1kubbWxNfH5mLQ9YgutCUnyJRvAmERVID-5a3DXpBIg';

    const btn = document.getElementById('notify-btn');
    const supported =
        'serviceWorker' in navigator &&
        'Notification' in window &&
        'PushManager' in window;

    if (!btn) return;
    if (!supported) {
        btn.hidden = true;
        return;
    }

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    const db = firebase.database();

    function setState(state) {
        // state: 'default' | 'granted' | 'denied' | 'loading'
        btn.dataset.state = state;
        btn.disabled = state === 'loading';
        const labels = {
            default: '訂閱通知',
            granted: '已訂閱通知',
            denied: '通知已被封鎖（請至瀏覽器設定開啟）',
            loading: '處理中…',
        };
        btn.textContent = labels[state] || labels.default;
    }

    async function registerAndGetToken() {
        const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        const token = await messaging.getToken({ vapidKey: VAPID_KEY, serviceWorkerRegistration: swReg });
        if (!token) throw new Error('無法取得 FCM token');
        return token;
    }

    async function saveToken(token) {
        // 用 token 當 key，避免同一裝置重複寫入
        await db.ref('fcmTokens/' + token).set({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            userAgent: navigator.userAgent,
            subscribedToTopic: false, // 由 Admin 腳本掛進 topic 後改為 true
        });
    }

    async function subscribe() {
        try {
            setState('loading');
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                setState(permission === 'denied' ? 'denied' : 'default');
                return;
            }
            const token = await registerAndGetToken();
            await saveToken(token);
            localStorage.setItem('originNotifyToken', token);
            setState('granted');
        } catch (err) {
            console.error('[notify] 訂閱失敗', err);
            setState('default');
            alert('訂閱通知失敗，請稍後再試');
        }
    }

    // 網頁開啟時收到訊息 → 顯示一個簡單的前景通知
    messaging.onMessage((payload) => {
        const n = payload.notification || payload.data || {};
        if (n.title) new Notification(n.title, { body: n.body || '', icon: '/favicon_package/android-chrome-192x192.png' });
    });

    // 初始狀態
    if (Notification.permission === 'granted' && localStorage.getItem('originNotifyToken')) {
        setState('granted');
        // 靜默刷新 token（token 可能會輪替）
        registerAndGetToken().then((t) => {
            if (t !== localStorage.getItem('originNotifyToken')) {
                saveToken(t).then(() => localStorage.setItem('originNotifyToken', t));
            }
        }).catch(() => {});
    } else if (Notification.permission === 'denied') {
        setState('denied');
    } else {
        setState('default');
    }

    btn.addEventListener('click', subscribe);
})();
