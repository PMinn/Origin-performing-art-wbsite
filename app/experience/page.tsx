import type { Metadata } from "next";
import "./experience.css";
import { ExperienceSections } from "./experience-sections";
import { SiteFooter } from "@/components/site-footer";

const DESC =
  "Origin 起源劇團歷年演出實績：頭城農場跨年、花蓮太平洋燈會、宜蘭傳藝中心夜傳藝、越南富國島火舞演出等。";

export const metadata: Metadata = {
  title: "演出經歷與花蓮火舞表演實績",
  description: DESC,
  alternates: { canonical: "/experience" },
  openGraph: {
    type: "website",
    siteName: "Origin 起源劇團",
    locale: "zh_TW",
    title: "演出經歷與花蓮火舞表演實績｜Origin 起源劇團",
    description: DESC,
    url: "/experience",
    images: [{ url: "/og/experience.jpg", width: 1200, height: 630, alt: "Origin 起源劇團標誌與火舞演出實績" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "演出經歷與花蓮火舞表演實績｜Origin 起源劇團",
    description: DESC,
    images: ["/og/experience.jpg"],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://origin-performing-art.web.app/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "演出經歷",
      item: "https://origin-performing-art.web.app/experience",
    },
  ],
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "演出經歷｜Origin 起源劇團",
  url: "https://origin-performing-art.web.app/experience",
  inLanguage: "zh-Hant-TW",
  isPartOf: { "@id": "https://origin-performing-art.web.app/#website" },
  about: { "@id": "https://origin-performing-art.web.app/#organization" },
  publisher: { "@id": "https://origin-performing-art.web.app/#organization" },
};

export default function ExperiencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <ExperienceSections />
      <SiteFooter />
    </>
  );
}
