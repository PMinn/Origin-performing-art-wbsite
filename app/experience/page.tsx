import type { Metadata } from "next";
import "./experience.css";
import { ExperienceSections } from "./experience-sections";
import { SiteFooter } from "@/components/site-footer";

const DESC =
  "Origin 起源劇團歷年演出實績：頭城農場跨年、花蓮太平洋燈會、宜蘭傳藝中心夜傳藝、越南富國島火舞演出等，累積全台及海外上百場火舞商演與活動經驗。";

export const metadata: Metadata = {
  title: "演出經歷 | Origin 起源劇團 花蓮火舞表演實績",
  description: DESC,
  keywords: ["花蓮火舞", "火舞表演實績", "火舞商演案例", "光舞表演", "Origin起源劇團", "演出經歷"],
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "演出經歷 | Origin 起源劇團 花蓮火舞表演實績",
    description: DESC,
    url: "/experience",
    images: ["/media/temp/10.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "演出經歷 | Origin 起源劇團 花蓮火舞表演實績",
    description: DESC,
    images: ["/media/temp/10.jpg"],
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
  name: "演出經歷 | Origin 起源劇團",
  url: "https://origin-performing-art.web.app/experience",
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
