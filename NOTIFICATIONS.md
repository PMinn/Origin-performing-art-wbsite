# 推播通知設定指南

網站使用 Firebase Cloud Messaging (FCM) 讓使用者訂閱推播通知。

## 一、Firebase Console 設定（一次性）

1. **啟用 Cloud Messaging**
   Firebase Console → 專案 `origin-performing-art` → 建構 → Cloud Messaging。

2. **建立網頁 App 並取得設定值**
   專案設定 → 一般 → 你的應用程式 → 若還沒有網頁 App 就新增一個。
   複製 `apiKey`、`messagingSenderId`、`appId`。

3. **產生網頁推送金鑰對（VAPID key）**
   專案設定 → Cloud Messaging → 網頁設定 → 「產生金鑰對」，複製公開金鑰。

4. **把上面的值填進這兩個檔案**（把 `REPLACE_WITH_...` 換掉）：
   - `lib/fcm.ts`（`firebaseConfig` 與 `VAPID_KEY`）
   - `public/firebase-messaging-sw.js`（`firebase.initializeApp({...})`）

5. **Realtime Database 規則**
   讓匿名使用者能寫入自己的 token、但不能讀取整份名單：

   ```json
   {
     "rules": {
       "fcmTokens": {
         ".read": false,
         "$token": {
           ".write": true
         }
       }
     }
   }
   ```

## 二、部署

網站為 Next.js 16（App Router）以靜態匯出（`output: 'export'`）產生 `out/`，
`git push` 到 `main` 由 GitHub Actions 執行 `npm ci && npm run build` 後部署到 Firebase Hosting。
`firebase-messaging-sw.js` 必須在網站根目錄（放在 `public/` 底下，匯出後會位於 `out/` 根目錄，自動符合）。

## 三、發送通知

### 前置：把訂閱者掛進 `all` topic（Console 發送必需）

網頁端無法自行訂閱 topic，需用 Admin 權限執行一次：

1. Firebase Console → 專案設定 → 服務帳戶 → 產生新的私密金鑰，
   存成 `scripts/service-account.json`（已列入 .gitignore）。
2. 安裝與執行：
   ```bash
   cd scripts
   npm install
   npm run subscribe        # 把新 token 掛進 "all"，並清掉失效 token
   ```
   有新訂閱者時再跑一次即可。

### 方式 A：Firebase Console 手動發送（你選的方式）

Console → Messaging → 建立第一個行銷活動 → Firebase 通知訊息 →
填標題／內文 → 目標選「主題」→ 輸入 `all` → 排定時間 → 立即發送。

### 方式 B：本機一行指令發送（備用）

```bash
cd scripts
npm run send -- "新演出開賣！" "本週六花蓮火舞演出，快來看" "https://origin-performing-art.web.app/experience"
```

## 四、測試

1. 用手機或桌機 Chrome 開網站 → 選單 → 「訂閱通知」→ 允許。
2. 到 Realtime Database 確認 `fcmTokens` 下多了一筆。
3. `npm run subscribe` 後用方式 A 或 B 發一則，確認收得到。
   （iOS 需 16.4+ 且要先把網站「加入主畫面」才能收推播。）
