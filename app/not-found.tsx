import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "找不到頁面",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
        color: "#f9f6ed",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#e9c460" }}>404</h1>
      <p>找不到這個頁面。</p>
      <Link href="/" style={{ color: "#eb5604", textDecoration: "none" }}>
        ← 回首頁
      </Link>
    </main>
  );
}
