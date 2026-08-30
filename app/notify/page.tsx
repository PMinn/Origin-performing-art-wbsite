import type { Metadata } from "next";
import "./notify.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { NotifyClient } from "./notify-client";

export const metadata: Metadata = {
  title: "開啟通知 | Origin 起源劇團",
  description:
    "教你如何開啟 Origin 起源劇團網站的推播通知，新演出、售票與活動不錯過。iPhone 需先將網站加入主畫面。",
  robots: { index: false, follow: true },
  alternates: { canonical: "/notify" },
};

export default function NotifyPage() {
  return (
    <div className="notify-page">
      <header>
        <SiteNav />
      </header>
      <NotifyClient />
      <SiteFooter />
    </div>
  );
}
