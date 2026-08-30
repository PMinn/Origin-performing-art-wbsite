"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  listenForeground,
  pushSupported,
  refreshTokenSilently,
  subscribe,
  TOKEN_STORAGE_KEY,
} from "@/lib/fcm";

type BtnState = "default" | "loading" | "granted" | "denied";
type DeviceTab = "ios" | "android" | "desktop" | "trouble";

const BTN_LABEL: Record<BtnState, string> = {
  default: "開啟通知",
  loading: "處理中…",
  granted: "通知已開啟",
  denied: "通知已被封鎖",
};

const TABS: { id: DeviceTab; icon: string; label: string }[] = [
  { id: "ios", icon: "apple", label: "iPhone / iPad" },
  { id: "android", icon: "android", label: "Android" },
  { id: "desktop", icon: "monitor", label: "電腦" },
  { id: "trouble", icon: "bell-off", label: "收不到通知" },
];

/* Phosphor Icons（regular），與頁尾同一套字型化圖示 */
const ICONS: Record<string, string> = {
  apple:
    "M223.3,169.59a8.07,8.07,0,0,0-2.8-3.4C203.53,154.53,200,134.64,200,120c0-17.67,13.47-33.06,21.5-40.67a8,8,0,0,0,0-11.62C208.82,55.74,187.82,48,168,48a72.2,72.2,0,0,0-40,12.13,71.56,71.56,0,0,0-90.71,9.09A74.63,74.63,0,0,0,16,123.4a127.06,127.06,0,0,0,40.14,89.73A39.8,39.8,0,0,0,83.59,224h87.68a39.84,39.84,0,0,0,29.12-12.57,125,125,0,0,0,17.82-24.6C225.23,174,224.33,172,223.3,169.59Zm-34.63,30.94a23.76,23.76,0,0,1-17.4,7.47H83.59a23.82,23.82,0,0,1-16.44-6.51A111.14,111.14,0,0,1,32,123,58.5,58.5,0,0,1,48.65,80.47,54.81,54.81,0,0,1,88,64h.78A55.45,55.45,0,0,1,123,76.28a8,8,0,0,0,10,0A55.44,55.44,0,0,1,168,64a70.64,70.64,0,0,1,36,10.35c-13,14.52-20,30.47-20,45.65,0,23.77,7.64,42.73,22.18,55.3A105.82,105.82,0,0,1,188.67,200.53ZM128.23,30A40,40,0,0,1,167,0h1a8,8,0,0,1,0,16h-1a24,24,0,0,0-23.24,18,8,8,0,1,1-15.5-4Z",
  android:
    "M176,148a12,12,0,1,1-12-12A12,12,0,0,1,176,148ZM92,136a12,12,0,1,0,12,12A12,12,0,0,0,92,136Zm148,24v24a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V161.13A113.38,113.38,0,0,1,51.4,78.72L26.34,53.66A8,8,0,0,1,37.66,42.34L63.82,68.5a111.43,111.43,0,0,1,128.55-.19l26-26a8,8,0,0,1,11.32,11.32L204.82,78.5c.75.71,1.5,1.43,2.24,2.17A111.25,111.25,0,0,1,240,160Zm-16,0a96,96,0,0,0-96-96h-.34C74.91,64.18,32,107.75,32,161.13V184H224Z",
  chrome:
    "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,16a88,88,0,0,1,73.72,40H128a48.08,48.08,0,0,0-45.6,33l-23.08-40A87.89,87.89,0,0,1,128,40Zm32,88a32,32,0,1,1-32-32A32,32,0,0,1,160,128ZM40,128a87.44,87.44,0,0,1,9.56-39.86L86.43,152c.06.1.13.19.19.28A48,48,0,0,0,137.82,175l-23.1,40A88.14,88.14,0,0,1,40,128Zm92.69,87.87L169.57,152c.08-.14.14-.28.22-.42a47.88,47.88,0,0,0-6-55.58H210a88,88,0,0,1-77.29,119.87Z",
  monitor:
    "M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Z",
  safari:
    "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z",
  share:
    "M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z",
  add: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z",
  apps: "M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z",
  menu: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z",
  bell: "M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM35.71,72a8,8,0,0,0,7.1-4.32A94.13,94.13,0,0,1,76.27,30.77a8,8,0,1,0-8.54-13.54A111.46,111.46,0,0,0,28.61,60.32,8,8,0,0,0,35.71,72Zm186.1,103.94A16,16,0,0,1,208,200H167.2a40,40,0,0,1-78.4,0H48a16,16,0,0,1-13.79-24.06C43.22,160.39,48,138.28,48,112a80,80,0,0,1,160,0C208,138.27,212.78,160.38,221.81,175.94ZM150.62,200H105.38a24,24,0,0,0,45.24,0ZM208,184c-10.64-18.27-16-42.49-16-72a64,64,0,0,0-128,0c0,29.52-5.38,53.74-16,72Z",
  "bell-off":
    "M53.92,34.62A8,8,0,1,0,42.08,45.38L58.82,63.8A79.59,79.59,0,0,0,48,104c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.8a40,40,0,0,0,78.4,0h15.44l19.44,21.38a8,8,0,1,0,11.84-10.76ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a63.65,63.65,0,0,1,6.26-27.62L168.09,184Zm166-4.73a8.13,8.13,0,0,1-2.93.55,8,8,0,0,1-7.44-5.08C196.35,156.19,192,129.75,192,104A64,64,0,0,0,96.43,48.31a8,8,0,0,1-7.9-13.91A80,80,0,0,1,208,104c0,35.35,8.05,58.59,10.52,64.88A8,8,0,0,1,214,179.25Z",
  check:
    "M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z",
  warning:
    "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z",
  lock: "M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z",
  gear: "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z",
  moon: "M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z",
  refresh:
    "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z",
  arrowLeft:
    "M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z",
};

function Ic({ name }: { name: string }) {
  return (
    <svg className="ic" viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d={ICONS[name]} />
    </svg>
  );
}

type Env = { tab: DeviceTab; standaloneNote: boolean; fallbackMsg: string | null };

function detectEnv(): Env {
  const ua = navigator.userAgent;
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(ua);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  const supported = pushSupported();

  return {
    tab: isIOS ? "ios" : isAndroid ? "android" : "desktop",
    standaloneNote: supported && isIOS && standalone,
    fallbackMsg: supported
      ? null
      : isIOS && !standalone
        ? "在 Safari 完成上面的「加入主畫面」步驟並從主畫面開啟後，才會出現允許通知的按鈕。"
        : "你目前的瀏覽器不支援網頁通知，請改用最新版的 Chrome、Edge、Firefox 或 Safari。",
  };
}

export function NotifyClient() {
  const [env, setEnv] = useState<Env>({ tab: "desktop", standaloneNote: false, fallbackMsg: null });
  const [btn, setBtn] = useState<BtnState>("default");

  useEffect(() => {
    // 客戶端裝置偵測只能在 hydration 後執行，避免與預先產生的 HTML 不一致
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnv(detectEnv());

    if (!pushSupported()) return;

    if (Notification.permission === "granted" && localStorage.getItem(TOKEN_STORAGE_KEY)) {
      setBtn("granted");
      void refreshTokenSilently();
    } else if (Notification.permission === "denied") {
      setBtn("denied");
    }

    let unsub: (() => void) | undefined;
    listenForeground()
      .then((fn) => {
        unsub = fn;
      })
      .catch(() => {});
    return () => unsub?.();
  }, []);

  const { tab, standaloneNote: showStandaloneNote, fallbackMsg } = env;
  const setTab = (t: DeviceTab) => setEnv((e) => ({ ...e, tab: t }));

  const onSubscribe = useCallback(async () => {
    setBtn("loading");
    try {
      const result = await subscribe();
      setBtn(result === "granted" ? "granted" : result === "denied" ? "denied" : "default");
    } catch (err) {
      console.error("[notify] 訂閱失敗", err);
      setBtn("default");
      alert("訂閱通知失敗，請稍後再試");
    }
  }, []);

  // 「開啟通知」動作按鈕：放在每個分頁的步驟裡，讓使用者順著做
  const actionButton = (
    <span className="step-action">
      <button
        type="button"
        className="notify-btn"
        data-state={btn}
        disabled={btn === "loading" || btn === "granted" || btn === "denied"}
        onClick={onSubscribe}
      >
        <Ic name={btn === "granted" ? "check" : "bell"} />
        {BTN_LABEL[btn]}
      </button>
      {fallbackMsg && <span className="step-hint">{fallbackMsg}</span>}
      {showStandaloneNote && (
        <span className="step-hint">你已從主畫面開啟，直接點按鈕並選「允許」即可。</span>
      )}
    </span>
  );

  return (
    <main>
      <div className="hero">
        <h2>開啟通知</h2>
        <p className="lead">
          有新的演出、開賣或活動時，消息會直接送到你的手機或電腦，不用一直回來看網站。
        </p>
        {btn === "granted" && (
          <span className="status-line" data-tone="granted">
            <Ic name="check" />
            這個裝置已開啟通知
          </span>
        )}
        {btn === "denied" && (
          <span className="status-line" data-tone="denied">
            <Ic name="warning" />
            通知已被封鎖，請看「收不到通知」分頁
          </span>
        )}
      </div>

      <div className="tabs" role="tablist" aria-label="依裝置查看步驟">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            className="tab"
            onClick={() => setTab(t.id)}
          >
            <Ic name={t.icon} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "ios" && (
        <section className="panel" role="tabpanel" id="panel-ios" aria-labelledby="tab-ios">
          <h3>
            <Ic name="apple" />
            iPhone / iPad（用 Safari）
          </h3>
          <div className="callout">
            <Ic name="warning" />
            <span>
              因為 Apple 的限制，iPhone / iPad 一定要先用 Safari 把網站「加入主畫面」，再從主畫面的圖示打開，才能開啟通知。需 iOS / iPadOS 16.4 以上。
            </span>
          </div>
          <ol className="steps">
            <li>
              <span className="txt">
                用 <b>Safari</b> 開啟本網站。
              </span>
              <span className="sub">iOS 上用 Chrome、LINE、Facebook 內建瀏覽器都收不到通知。</span>
            </li>
            <li>
              <span className="txt">點畫面下方中間的「分享」按鈕（往上箭頭的圖示）。</span>
            </li>
            <li>
              <span className="txt">在選單往下滑，選「加入主畫面」，再點右上角「加入」。</span>
            </li>
            <li>
              <span className="txt">回到主畫面，點剛新增的「Origin 起源劇團」圖示打開。</span>
            </li>
            <li>
              <span className="txt">打開右上角的選單，點「開啟通知」回到這一頁。</span>
            </li>
            <li>
              <span className="txt">點下面的按鈕，跳出詢問時選「允許」。</span>
              {actionButton}
            </li>
          </ol>
        </section>
      )}

      {tab === "android" && (
        <section
          className="panel"
          role="tabpanel"
          id="panel-android"
          aria-labelledby="tab-android"
        >
          <h3>
            <Ic name="android" />
            Android（用 Chrome）
          </h3>
          <ol className="steps">
            <li>
              <span className="txt">
                用 <b>Chrome</b> 開啟本網站。
              </span>
            </li>
            <li>
              <span className="txt">點下面的按鈕，瀏覽器跳出詢問時選「允許」。</span>
              {actionButton}
            </li>
          </ol>
          <div className="callout">
            <Ic name="add" />
            <span>建議也從網址列選單選「安裝應用程式 / 加到主畫面」，開啟速度與通知會更穩定。</span>
          </div>
        </section>
      )}

      {tab === "desktop" && (
        <section
          className="panel"
          role="tabpanel"
          id="panel-desktop"
          aria-labelledby="tab-desktop"
        >
          <h3>
            <Ic name="monitor" />
            電腦（Chrome、Edge、Firefox）
          </h3>
          <ol className="steps">
            <li>
              <span className="txt">點下面的按鈕，瀏覽器視窗左上角跳出詢問時選「允許」。</span>
              {actionButton}
            </li>
          </ol>
          <div className="callout">
            <Ic name="lock" />
            <span>之後想關閉：點網址列左邊的鎖頭圖示 → 網站設定 → 通知。</span>
          </div>
        </section>
      )}

      {tab === "trouble" && (
        <section
          className="panel"
          role="tabpanel"
          id="panel-trouble"
          aria-labelledby="tab-trouble"
        >
          <h3>
            <Ic name="bell-off" />
            收不到通知？
          </h3>
          <ul className="faq">
            <li>
              <Ic name="lock" />
              <span>
                之前不小心按了「封鎖 / 不允許」：先到瀏覽器的網站設定把「通知」改回允許，再回對應分頁重按一次。
              </span>
            </li>
            <li>
              <Ic name="gear" />
              <span>
                <b>iPhone：</b>設定 → 通知 → 找到已加入主畫面的「Origin 起源劇團」→ 開啟「允許通知」。
              </span>
            </li>
            <li>
              <Ic name="gear" />
              <span>
                <b>Android：</b>長按網站圖示 →「應用程式資訊」→ 通知；或設定 → 應用程式 → Chrome → 網站設定 → 通知。
              </span>
            </li>
            <li>
              <Ic name="gear" />
              <span>
                <b>電腦 Chrome：</b>點網址列左邊的鎖頭圖示 → 網站設定 → 通知 → 允許。
              </span>
            </li>
            <li>
              <Ic name="moon" />
              <span>手機開了省電模式，或「勿擾 / 專注模式」，通知可能延遲送達。</span>
            </li>
            <li>
              <Ic name="refresh" />
              <span>換手機、換瀏覽器或清除瀏覽器資料後，要再回到這頁重新開啟一次。</span>
            </li>
          </ul>
        </section>
      )}

    </main>
  );
}
