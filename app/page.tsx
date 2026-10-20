import type { Metadata } from "next";
import "./home.css";
import { HomeSections } from "./home-sections";
import { SiteFooter } from "@/components/site-footer";

const DESC =
  "源自花蓮的街頭表演團體，提供火舞、光舞（LED／雷射）與特技雜耍演出，足跡遍及全台及海外，可依主題節慶客製化演出內容。";

export const metadata: Metadata = {
  title: { absolute: "Origin 起源劇團｜花蓮火舞表演・光舞雷射・特技商演團隊" },
  description:
    "Origin 起源劇團源自花蓮的專業街頭火舞表演團隊，提供火舞商演、LED光舞雷射秀、特技雜耍與客製化主題演出，足跡遍及全台及海外，適合婚宴尾牙、節慶祭典、品牌活動與街頭演出邀約。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Origin 起源劇團",
    locale: "zh_TW",
    title: "Origin 起源劇團｜花蓮火舞表演・光舞雷射・特技商演團隊",
    description: DESC,
    url: "/",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Origin 起源劇團標誌與火舞表演" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin 起源劇團｜花蓮火舞表演・光舞雷射・特技商演團隊",
    description: DESC,
    images: ["/og/home.jpg"],
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "PerformingGroup",
  "@id": "https://origin-performing-art.web.app/#organization",
  name: "Origin 起源劇團",
  alternateName: "Origin Performing Art",
  url: "https://origin-performing-art.web.app/",
  logo: "https://origin-performing-art.web.app/media/temp/cover_logo.webp",
  image: "https://origin-performing-art.web.app/media/temp/4.webp",
  description: DESC,
  foundingDate: "2019-04",
  telephone: "+886-905-217-487",
  email: "originperforming@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "花蓮縣",
    addressCountry: "TW",
  },
  areaServed: [
    { "@type": "Country", name: "台灣" },
    { "@type": "AdministrativeArea", name: "花蓮縣" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "演出邀約",
    telephone: "+886-905-217-487",
    email: "originperforming@gmail.com",
    availableLanguage: "zh-TW",
  },
  knowsAbout: ["火舞", "LED光舞", "雷射秀", "雜耍poi", "街頭表演"],
  sameAs: [
    "https://www.instagram.com/origin_performing_art/",
    "https://www.facebook.com/OriginPerformingArt",
    "https://youtube.com/channel/UC8fSpbixNy_0YCZgZ0sKQhg",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        provider: { "@id": "https://origin-performing-art.web.app/#organization" },
        name: "火舞商演",
        description: "著重大場面大特效演出，以3人以上團舞為主，演出時長5-30分鐘",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        provider: { "@id": "https://origin-performing-art.web.app/#organization" },
        name: "特色商演",
        description: "配合店家特色、節慶、活動演出，人數不拘，以完全客製化火舞表演為原則",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        provider: { "@id": "https://origin-performing-art.web.app/#organization" },
        name: "LED光舞演出",
        description: "以光束道具及雷射呈現視覺特效，適合於室內演出",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        provider: { "@id": "https://origin-performing-art.web.app/#organization" },
        name: "街頭演出",
        description: "著重與街頭觀眾互動，通常以1-4人輪替演出為主，演出總時長較長",
      },
    },
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://origin-performing-art.web.app/#website",
  name: "Origin 起源劇團",
  alternateName: "Origin Performing Art",
  url: "https://origin-performing-art.web.app/",
  inLanguage: "zh-Hant-TW",
  publisher: { "@id": "https://origin-performing-art.web.app/#organization" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Origin 起源劇團提供哪些表演項目？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "提供火舞演出（火棍、火球、火流星、火立方等火元素表演）、光舞演出（LED棍球、雷射秀、光線藝術）以及特技演出（雜耍poi、立方體等道具雜耍）。",
      },
    },
    {
      "@type": "Question",
      name: "火舞商演與街頭演出有什麼不同？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "火舞商演著重大場面大特效，以3人以上團舞為主，演出時長約5-30分鐘；街頭演出則著重與觀眾互動，通常以1-4人輪替演出，演出總時長較長。",
      },
    },
    {
      "@type": "Question",
      name: "可以客製化演出內容嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可以，特色商演會配合店家特色、節慶或活動主題，演出人數不拘，以完全客製化火舞表演為原則。",
      },
    },
    {
      "@type": "Question",
      name: "室內活動適合哪種演出？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LED光舞演出以光束道具及雷射呈現視覺特效，適合於室內演出。",
      },
    },
    {
      "@type": "Question",
      name: "如何聯絡 Origin 起源劇團洽詢演出？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可撥打0905217487、email至originperforming@gmail.com，或透過Instagram（origin_performing_art）與Facebook（OriginPerformingArt）私訊洽詢。",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <HomeSections />
      <SiteFooter />
    </>
  );
}
