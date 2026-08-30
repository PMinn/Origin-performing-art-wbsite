import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const SITE_URL = "https://origin-performing-art.web.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Origin 起源劇團｜花蓮火舞表演・光舞雷射・特技商演團隊",
    template: "%s｜Origin 起源劇團",
  },
  description:
    "Origin 起源劇團源自花蓮的專業街頭火舞表演團隊，提供火舞商演、LED光舞雷射秀、特技雜耍與客製化主題演出，足跡遍及全台及海外，適合婚宴尾牙、節慶祭典、品牌活動與街頭演出邀約。",
  applicationName: "Origin 起源劇團",
  authors: [{ name: "Origin 起源劇團" }],
  manifest: "/favicon_package/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Origin 起源劇團",
  },
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-TileImage": "/favicon_package/mstile-144x144.png",
  },
  icons: {
    icon: [
      { url: "/favicon_package/icon.svg", type: "image/svg+xml" },
      { url: "/favicon_package/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_package/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_package/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon_package/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon_package/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/favicon_package/safari-pinned-tab.svg", color: "#5bbad5" }],
  },
  openGraph: {
    type: "website",
    siteName: "Origin 起源劇團",
    locale: "zh_TW",
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={notoSansTC.variable}>
      <body>{children}</body>
    </html>
  );
}
