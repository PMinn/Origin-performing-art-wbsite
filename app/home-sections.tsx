"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteNav } from "@/components/site-nav";

export function HomeSections() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.matchMedia("(min-width: 64rem)").matches;
    const panelsContainer = document.querySelector<HTMLElement>("#panels-container");

    if (!isDesktop) {
      if (panelsContainer) panelsContainer.style.width = "100%";
      return;
    }

    const run = () => {
      const coverImg = document.getElementById("cover_img");

      ScrollTrigger.create({
        trigger: "#cover_text",
        start: "top top",
        end: "max",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: "#cover",
        start: "top top",
        end: "bottom",
        onUpdate: (self) => {
          if (!coverImg) return;
          coverImg.style.opacity = String(1 - self.progress);
          coverImg.style.transform = `translateY(${self.progress * 100}vh)`;
        },
      });

      const parallax = (trigger: string, apply: (offset: number) => void) => {
        ScrollTrigger.create({
          trigger,
          start: "top bottom",
          end: "bottom center",
          onUpdate: (self) => apply(self.progress - 0.65),
        });
      };

      const move = (sel: string, vh: number, offset: number) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (el) el.style.transform = `translateY(${-offset * vh}vh)`;
      };

      parallax("#s1", (o) => move("#s1 .text-outer", 100, o));
      parallax("#s2", (o) => move("#s2 .text-outer", 100, o));
      parallax("#s3", (o) => move("#s3 .text-outer", 100, o));

      if (panelsContainer) {
        gsap.to(gsap.utils.toArray<HTMLElement>("#panels-container .panel"), {
          x: () => -1 * (panelsContainer.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: "#panels-container",
            pin: true,
            start: "top top",
            scrub: 1,
            end: () => "+=" + (panelsContainer.scrollWidth - window.innerWidth),
          },
        });
      }

      parallax("#s6", (o) => {
        move("#s6 .text-outer>div>h2", 100, o);
        move("#s6 .text-outer>div>h3", 50, o);
        move("#s6 .text-outer>hr", 100, o);
        move("#s6 .text-outer>p", 100, o);
      });

      parallax("#s7", (o) => {
        move("#s7 .text-outer>img", 100, o);
        move("#s7 .text-outer>div>h2", 10, o);
        move("#s7 .text-outer>div>hr", 10, o);
        move("#s7 .text-outer>div>p", 10, o);
        move("#s7 .text-outer>div>h3", 10, o);
        move("#s7 .text-outer>div>img", 50, o);
      });

      parallax("#s8", (o) => {
        move("#s8 .text-outer>h2", 100, o);
        move("#s8 .text-outer>hr", 100, o);
        move("#s8 .text-outer>p", 100, o);
        move("#s8 .text-outer>div", 50, o);
      });

      parallax("#s9", (o) => {
        move("#s9 .text-outer>div", 10, o);
        move("#s9 .text-outer>hr", 10, o);
        move("#s9 .text-outer>p", 10, o);
        move("#s9 .text-outer>h3", 150, o);
      });

      parallax("#s10", (o) => move("#s10 .text-outer", 100, o));

      parallax("#s11", (o) => {
        move("#s11 .text-outer>h2", 50, o);
        move("#s11 .text-outer>hr", 50, o);
        move("#s11 .text-outer>p", 50, o);
        move("#s11 .text-outer>h3", 150, o);
      });

      ScrollTrigger.create({
        trigger: "#s12",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
          const offset = self.progress - 0.65;
          const t = document.querySelector<HTMLElement>("#s12 .text-outer");
          const img = document.querySelector<HTMLElement>("#s12 .img-outer img");
          if (t) t.style.transform = `translateY(${offset * 50}vh)`;
          if (img) img.style.opacity = String(1 - self.progress);
        },
      });

      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      run();
    } else {
      window.addEventListener("load", run);
    }

    return () => {
      window.removeEventListener("load", run);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("#panels-container .panel");
    };
  }, []);

  return (
    <>
      <header id="cover" className="section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="cover_img" src="/media/temp/cover_logo.webp" alt="Origin 起源劇團標誌" />
        <SiteNav variant="cover" />
      </header>

      <div id="s1" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/1.webp" alt="花蓮火舞表演團體 Origin 起源劇團街頭演出" />
        </div>
        <div className="text-outer text-primary-950">
          <h2 className="text-xl font-bold lg:text-6xl lg:text-secondary-100">起源於花蓮，依山傍水而生</h2>
          <p className="text-xs font-medium">
            源自花蓮的街頭表演團體，
            <br />
            火舞是我們的畫筆，
            <br />
            彩繪著笑容與熱愛，
            <br />
            每一個山海之間，
            <br />
            都有屬於自己獨一無二的存在。
            <br />
            <br />
            因為火舞我們相遇，
            <br />
            願您能在屬於Origin熾熱的波濤之中，
            <br />
            覓得獨一無二的感動。
          </p>
        </div>
      </div>

      <div id="s2" className="section">
        <div className="text-outer">
          <h2 className="text-2xl font-bold text-tertiary-200 lg:text-6xl lg:text-secondary-100">表演項目</h2>
          <ul className="text-tertiary-400 font-bold lg:text-secondary lg:text-2xl">
            <li className="lg:mt-[15%]">
              火舞演出
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 lg:text-lg lg:text-white lg:pl-8">
                火棍、火球、火流星、火立方等火元素表演.
              </div>
            </li>
            <li className="lg:mt-[15%]">
              光舞演出
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 lg:text-lg lg:text-white lg:pl-8">
                LED棍球、雷射秀、光線等光舞藝術.
              </div>
            </li>
            <li className="lg:mt-[15%]">
              特技演出
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 lg:text-lg lg:text-white lg:pl-8">
                雜耍poi 、立方體等道具雜耍.
              </div>
            </li>
          </ul>
        </div>
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/2.webp" alt="Origin起源劇團火舞、光舞、特技表演項目" />
        </div>
      </div>

      <div id="s3" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/3.webp" alt="火舞商演、特色商演、LED光舞演出等表演類型" />
        </div>
        <div className="text-outer">
          <h2 className="text-2xl font-bold text-tertiary-200 lg:text-6xl lg:text-secondary lg:pl-1">表演類型</h2>
          <ul className="text-tertiary-400 font-bold lg:text-tertiary lg:text-2xl">
            <li className="lg:mt-[10%]">
              街頭演出
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 pt-1 lg:text-lg lg:text-white lg:pl-8">
                著重與街頭觀眾互動，
                <br />
                通常以1-4人輪替演出為主，演出總時長較長
              </div>
            </li>
            <li className="lg:mt-[10%]">
              火舞商演
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 pt-1 lg:text-lg lg:text-white lg:pl-8">
                著重大場面大特效演出，
                <br />
                以3人以上團舞為主，演出時長5-15分鐘
              </div>
            </li>
            <li className="lg:mt-[10%]">
              特色商演
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 pt-1 lg:text-lg lg:text-white lg:pl-8">
                配合店家特色/節慶/活動演出
                <br />
                演出人數不拘，以完全客製化火舞表演為原則
              </div>
            </li>
            <li>
              LED光舞演出
              <br />
              <div className="text-sm text-gray-200 font-normal pl-2 pt-1 lg:text-lg lg:text-white lg:pl-8">
                以光束道具及雷射
                <br />
                呈現視覺特效，適合於室內演出
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div id="panels">
        <div id="panels-container" style={{ width: "400%" }}>
          <div id="panel_1" className="panel full-screen red">
            <div className="text-outer">
              <h2 className="text-2xl font-bold text-tertiary-300 mb-2 lg:text-secondary lg:text-6xl lg:pt-[10vh]">
                火舞商演
              </h2>
              <p className="text-sm text-tertiary-200 lg:text-primary lg:text-xl">
                著重大場面大特效演出，
                <br />
                以3人以上團舞為主，演出時長5-30分鐘
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/4.webp" alt="Origin起源劇團火舞商演大型團體火舞秀" />
          </div>
          <div id="panel_2" className="panel full-screen orange">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/5.webp" alt="配合店家特色與節慶的客製化特色商演火舞表演" />
            <div className="text-outer">
              <h2 className="text-2xl font-bold text-tertiary-50 pb-2 lg:text-6xl lg:text-secondary-50 lg:pb-[4vh]">
                特色商演
              </h2>
              <p className="text-xs text-tertiary-100 lg:text-primary lg:text-xl lg:text-secondary-100">
                配合店家特色/節慶/活動演出
                <br />
                演出人數不拘，以完全客製化火舞表演為原則
              </p>
            </div>
          </div>
          <div id="panel_3" className="panel full-screen purple">
            <div className="text-outer">
              <h2 className="text-2xl font-bold text-gray-100 pb-2 lg:text-6xl lg:text-secondary-50 lg:pb-[4vh]">
                LED光舞演出
              </h2>
              <p className="text-xs text-gray-50 lg:text-secondary-50 lg:text-xl">
                以光束道具及雷射
                <br />
                呈現視覺特效，適合於室內演出
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/6.webp" alt="LED光舞演出雷射光束視覺特效表演" />
          </div>
          <div id="panel_4" className="panel full-screen green">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/7.webp" alt="街頭火舞演出與觀眾互動" />
            <div className="text-outer">
              <h2 className="text-2xl font-bold text-tertiary-200 pb-2 lg:text-6xl lg:text-tertiary-200 lg:pb-[8vh]">
                街頭演出
              </h2>
              <p className="text-xs text-tertiary-300 lg:text-tertiary-300 lg:text-xl">
                著重與街頭觀眾互動，
                <br />
                通常以1-4人輪替演出為主，演出總時長較長
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="s6" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/17.webp" alt="Origin起源劇團專業火舞特殊技藝演出，細節的追求、完美的瞬間" />
        </div>
        <div className="text-outer">
          <div>
            <h2 className="text-2xl font-bold text-tertiary-200 ml-2 mb-1 lg:text-6xl lg:text-tertiary-200 lg:ml-4">
              專業
            </h2>
            <h3 className="text-3xl text-primary mb-1 mr-4 hidden lg:block">特殊技藝，精湛吸睛</h3>
          </div>
          <hr className="border-t-1 border-tertiary-300 border-b-0" />
          <p className="text-xs text-tertiary-200 ml-8 mt-2 lg:text-xl lg:text-tertiary-200 lg:ml-4 lg:mt-4">
            細節的追求，完美的瞬間
          </p>
          <h3 className="text-xs text-primary ml-8 mt-1 lg:hidden">特殊技藝，精湛吸睛</h3>
        </div>
      </div>

      <div id="s8" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/16.webp" alt="火與舞之間極致視覺呈現的火舞表演瞬間" />
        </div>
        <div className="text-outer">
          <h2 className="text-2xl font-bold text-white ml-2 mb-1 lg:text-6xl lg:text-white lg:ml-4 lg:mb-4">極致</h2>
          <hr className="border-t-1 border-tertiary-300 border-b-0" />
          <p className="text-xs text-white ml-8 mt-2 lg:text-xl lg:text-white lg:ml-4 lg:mt-4">
            在火與舞之間，呈現極致的可能
          </p>
          <div>
            <h3 className="text-shadow-md text-xs text-secondary-100 ml-8 mt-[50%] ml-auto mr-2 lg:text-2xl lg:text-secondary-100 lg:mt-[9vh] mr-[3vw]">
              最高標準自我要求，
              <br />
              全力以赴呈現每個畫面
            </h3>
          </div>
        </div>
      </div>

      <div id="s9" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/18.webp" alt="大場面震撼視覺效果火舞演出，活動氣氛帶動" />
        </div>
        <div className="text-outer">
          <div>
            <h2 className="text-2xl font-bold text-white ml-2 lg:text-6xl lg:text-white lg:ml-4">震撼</h2>
          </div>
          <hr className="border-t-1 border-tertiary-300 border-b-0" />
          <p className="text-xs text-tertiary-300 ml-2 mt-2 lg:text-xl lg:text-tertiary-300 lg:ml-4 lg:mt-4">
            目光凝聚，震撼人心
          </p>
          <h3 className="w-full text-xs text-primary ml-2 mt-1 lg:text-2xl lg:text-center lg:absolute lg:bottom-[8vh]">
            大場面營造、活動氣氛帶動
          </h3>
        </div>
      </div>

      <div id="s10" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/19.webp" alt="真摯動人的火舞表演，心靈共鳴瞬間" />
        </div>
        <div className="text-outer">
          <div>
            <h2 className="text-2xl font-bold text-secondary-100 ml-2 lg:text-6xl lg:ml-4">真摯</h2>
          </div>
          <hr className="border-t-1 border-tertiary-300 border-b-0" />
          <p className="text-xs text-tertiary-300 ml-2 mt-2 lg:text-xl lg:ml-4 lg:mt-4">動作的真摯，心靈的共鳴</p>
          <h3 className="text-shadow-md text-xs text-primary ml-2 mt-1 lg:text-2xl lg:text-end lg:absolute lg:bottom-[5vh] lg:right-[2vw]">
            不只表演，更是心與心的對話
          </h3>
        </div>
      </div>

      <div id="s7" className="section">
        <div className="img-outer hidden lg:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/13.webp" alt="Origin起源劇團客製化舞碼編排火舞表演" />
        </div>
        <div className="text-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/14.webp" alt="用火與身體吟詠故事的客製化火舞演出" />
          <div>
            <h2 className="text-2xl font-bold text-tertiary-200 ml-8 mb-2 lg:text-6xl lg:ml-4 lg:mb-4">吟詠</h2>
            <hr className="border-t-1 border-tertiary-300 border-b-0" />
            <p className="text-xs text-tertiary-200 ml-8 mt-2 lg:text-xl lg:ml-4 lg:mt-4">
              我們用火與身體，吟詠每一段無聲的故事
            </p>
            <h3 className="text-sm text-primary-950 ml-8 mt-1 lg:text-2xl lg:text-tertiary lg:mt-[18vh] lg:text-end">
              客製化舞碼編排
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hidden lg:block" src="/media/temp/15.webp" alt="客製化舞碼編排火舞演出細節" />
          </div>
        </div>
      </div>

      <div id="s11" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hidden lg:block" src="/media/temp/20.webp" alt="互動式光舞特技表演與觀眾交流，室內演出最佳選擇" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lg:hidden" src="/media/temp/22.jpg" alt="互動式光舞特技表演與觀眾交流，室內演出最佳選擇" />
        </div>
        <div className="text-outer">
          <h2 className="text-3xl font-bold text-white ml-1 mb-2 lg:text-6xl lg:mb-4">交流</h2>
          <hr className="border-t-1 border-tertiary-300 border-b-0" />
          <p className="text-xs text-white ml-1 mt-2 lg:text-xl lg:mt-4">觀眾不只是觀眾，而是故事的一部份</p>
          <h3 className="text-gray-200 text-xs ml-1 mt-2 text-shadow-md lg:text-tertiary-200 lg:text-2xl">
            互動式表演結合光舞特技
            <br />
            更為溫馨、歡樂且安全
            <br />
            室內演出最佳選擇
          </h3>
        </div>
      </div>

      <div id="s12" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/21.webp" alt="Origin起源劇團因為火舞而相遇的動人演出瞬間" />
        </div>
        <div className="text-outer">
          <p className="text-md text-center text-secondary-100 text-shadow-md lg:text-2xl">
            因為火舞，我們相遇
            <br />
            期待與您一起在火焰中，覓得感動...
          </p>
        </div>
      </div>
    </>
  );
}
