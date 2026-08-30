"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "首頁" },
  { href: "/experience", label: "演出經歷" },
  { href: "/notify", label: "開啟通知" },
];

export function SiteNav({ variant = "plain" }: { variant?: "plain" | "cover" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        id={variant === "cover" ? "cover_text" : undefined}
        className={`site-nav text-primary${variant === "cover" ? " is-cover" : ""}`}
      >
        <h1>
          <Link href="/">
            Origin <span className="zh">起源劇團</span>
          </Link>
        </h1>
        <button
          type="button"
          className={`menu-icon${open ? " open" : ""}`}
          aria-label="選單"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div className={`menu${open ? " open" : ""}`}>
        <div>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
