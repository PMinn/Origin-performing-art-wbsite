import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 手機版（< 64rem）的捲動動畫：文字淡入上移、圖片緩慢縮放（視差）、橫向 pin 面板。
// 桌面版的動畫各頁自行處理，這裡只負責手機。

type MobileMotionOptions = {
  /** 要做淡入的文字區塊選擇器（例如 "#s1 .text-outer"） */
  texts: string[];
  /** 要做圖片縮放視差的容器選擇器（例如 "#s1 .img-outer img"） */
  images: string[];
};

let ctx: gsap.Context | null = null;

export function initMobileMotion({ texts, images }: MobileMotionOptions) {
  gsap.registerPlugin(ScrollTrigger);
  ctx?.revert();
  ctx = gsap.context(() => build({ texts, images }));
}

function build({ texts, images }: MobileMotionOptions) {

  // 避免 iOS 網址列收合造成 pin 的位置跳動
  ScrollTrigger.config({ ignoreMobileResize: true });

  // 橫向 pin 要最先建立：它會插入 pin-spacer，其後的 trigger 位置才會算對
  const panelsContainer = document.querySelector<HTMLElement>("#panels-container");
  if (panelsContainer) {
    panelsContainer.classList.add("h-scroll");
    // 容器本身只佔一個螢幕寬並裁切，面板溢出的部分不會撐開頁面（否則 iOS 可以往右滑）
    panelsContainer.style.width = "100%";
    gsap.to(gsap.utils.toArray<HTMLElement>("#panels-container .panel"), {
      x: () => -1 * (panelsContainer.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        invalidateOnRefresh: true,
        end: () => "+=" + (panelsContainer.scrollWidth - window.innerWidth),
      },
    });
  }

  texts.forEach((sel) => {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return;
    // 覆蓋 .text-outer 的 transition，避免與 gsap 衝突
    gsap.set(el, { transition: "none" });
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  images.forEach((sel) => {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 1.12 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  ScrollTrigger.refresh();
}

export function cleanupMobileMotion() {
  // revert 會還原 gsap.from 套上的 inline 樣式（opacity、transform），避免重新掛載時以 0 為起點
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  const container = document.querySelector<HTMLElement>("#panels-container");
  container?.classList.remove("h-scroll");
  if (container) container.style.width = "";
}
