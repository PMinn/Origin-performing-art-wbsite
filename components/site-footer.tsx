import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from "./contact-icons";

export function SiteFooter() {
  return (
    <footer className="site-footer text-xs lg:text-base">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/temp/cover_logo.webp" alt="Origin 起源劇團標誌" />
        <div className="footer-links">
          <a href="tel:0905217487">
            <PhoneIcon />
            0905217487
          </a>
          <a href="mailto:originperforming@gmail.com">
            <MailIcon />
            originperforming@gmail.com
          </a>
          <a href="https://www.instagram.com/origin_performing_art/" target="_blank" rel="noreferrer">
            <InstagramIcon />
            https://www.instagram.com/origin_performing_art/
          </a>
          <a href="https://www.facebook.com/OriginPerformingArt" target="_blank" rel="noreferrer">
            <FacebookIcon />
            https://www.facebook.com/OriginPerformingArt
          </a>
        </div>
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/temp/qr_ig.png" alt="Origin起源劇團 Instagram 頁面 QR Code" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/temp/qr_fb.png" alt="Origin起源劇團 Facebook 頁面 QR Code" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/temp/qr_yt.png" alt="Origin起源劇團 Youtube 頁面 QR Code" />
        <span>Instagram</span>
        <span>Facebook</span>
        <span>Youtube</span>
      </div>
    </footer>
  );
}
