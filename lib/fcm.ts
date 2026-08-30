import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, ref, set, serverTimestamp } from "firebase/database";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported as isMessagingSupported,
  type Messaging,
} from "firebase/messaging";

// Firebase 網頁設定值（公開資訊）— 與 public/firebase-messaging-sw.js 保持一致
const firebaseConfig = {
  apiKey: "AIzaSyCQ-5t6Uzc9SvuvamD3wiEoHhiY_zMMxrM",
  authDomain: "origin-performing-art.firebaseapp.com",
  databaseURL: "https://origin-performing-art-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "origin-performing-art",
  messagingSenderId: "32164182626",
  appId: "1:32164182626:web:f98d68695e8b02c0542f3b",
};

// Firebase Console → 專案設定 → Cloud Messaging → 網頁推送憑證 產生的 VAPID public key
const VAPID_KEY =
  "BG7LXWFB61H9tTaUyPH4Lra_4r9pNTYRs-Equ0bTJatA1kubbWxNfH5mLQ9YgutCUnyJRvAmERVID-5a3DXpBIg";

export const TOKEN_STORAGE_KEY = "originNotifyToken";

export function pushSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "serviceWorker" in navigator &&
    typeof window !== "undefined" &&
    "Notification" in window &&
    "PushManager" in window
  );
}

let app: FirebaseApp | undefined;
let messaging: Messaging | undefined;

async function getMessagingInstance(): Promise<Messaging> {
  if (!(await isMessagingSupported())) throw new Error("此瀏覽器不支援 Firebase Messaging");
  if (!app) app = getApps()[0] ?? initializeApp(firebaseConfig);
  if (!messaging) messaging = getMessaging(app);
  return messaging;
}

async function registerAndGetToken(): Promise<string> {
  const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  const m = await getMessagingInstance();
  const token = await getToken(m, { vapidKey: VAPID_KEY, serviceWorkerRegistration: swReg });
  if (!token) throw new Error("無法取得 FCM token");
  return token;
}

async function saveToken(token: string): Promise<void> {
  if (!app) app = getApps()[0] ?? initializeApp(firebaseConfig);
  const db = getDatabase(app);
  await set(ref(db, "fcmTokens/" + token), {
    createdAt: serverTimestamp(),
    userAgent: navigator.userAgent,
    subscribedToTopic: false,
  });
}

/** 請求權限並訂閱推播，成功回傳 'granted'，否則回傳 'denied' | 'default'。 */
export async function subscribe(): Promise<NotificationPermission> {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return permission;
  const token = await registerAndGetToken();
  await saveToken(token);
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  return "granted";
}

/** 前景訊息 → 顯示簡單通知。回傳解除訂閱函式。 */
export async function listenForeground(): Promise<() => void> {
  const m = await getMessagingInstance();
  return onMessage(m, (payload) => {
    const n = payload.notification ?? payload.data ?? {};
    if (n.title) {
      new Notification(n.title, {
        body: n.body ?? "",
        icon: "/favicon_package/android-chrome-192x192.png",
      });
    }
  });
}

/** 已授權時靜默刷新 token（token 可能輪替）。 */
export async function refreshTokenSilently(): Promise<void> {
  try {
    const token = await registerAndGetToken();
    if (token !== localStorage.getItem(TOKEN_STORAGE_KEY)) {
      await saveToken(token);
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  } catch {
    /* 忽略 */
  }
}
