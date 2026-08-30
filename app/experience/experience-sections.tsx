"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteNav } from "@/components/site-nav";

export function ExperienceSections() {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 64rem)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const run = () => {
      const move = (sel: string, offset: number) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (el) el.style.transform = `translateY(${-offset * 100}%)`;
      };

      ScrollTrigger.create({
        trigger: "#s4",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => move("#s4 .text-outer", self.progress - 0.65),
      });

      ScrollTrigger.create({
        trigger: "#s5",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => move("#s5 .text-outer", self.progress - 0.65),
      });

      const panelsContainer = document.querySelector<HTMLElement>("#panels-container");
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

      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") run();
    else window.addEventListener("load", run);

    return () => {
      window.removeEventListener("load", run);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf("#panels-container .panel");
    };
  }, []);

  return (
    <>
      <header>
        <SiteNav />
      </header>

      <div id="s4" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/8.webp" alt="Origin起源劇團2021至2023年演出經歷照片" />
        </div>
        <div className="text-outer text-tertiary-50 text-sm lg:text-xl">
          <h2 className="text-secondary-300 font-bold text-3xl lg:text-5xl">演出經歷</h2>
          <div>
            <div>
              <h3 className="text-tertiary-200 font-bold text-lg mt-4 lg:text-2xl">2021</h3>
              <ul>
                <li>2021頭城農場跨年</li>
                <li>2021英群企業尾牙</li>
                <li>2021花蓮六期重劃區祭天祈福大會</li>
                <li>2021花蓮聖南宮祭天祈福吉安遶境活動</li>
              </ul>
              <h3 className="text-tertiary-200 font-bold text-lg mt-4 lg:text-2xl lg:mt-[5%]">2022</h3>
              <ul>
                <li>2022二派克食品尾牙活動</li>
                <li>2022羅東藝穗節</li>
                <li>2022花蓮祭天祈福暨遶境活動</li>
                <li>2022新竹縣議員候選人林禹佑總部成立萬聖Party</li>
                <li>2022安富利晚宴</li>
                <li>2022王正源建築師事務所尾牙</li>
              </ul>
            </div>
            <div>
              <h3 className="text-tertiary-200 font-bold text-lg mt-4 lg:text-2xl">2023</h3>
              <ul>
                <li>2023碧潭地景/碧潭寫生趣活動演出</li>
                <li>2023花蓮野宅露營區活動演出</li>
                <li>2023花蓮饗海．邊境露營區活動演出</li>
                <li>2023碧潭水舞2023開幕表演</li>
                <li>2023桃園燈會</li>
                <li>2023王正源建築師事務所尾牙餐會</li>
                <li>2023新光和纖旺年晚會</li>
                <li>2023易發集團尾牙活動</li>
                <li>2023盈正豫順電子公司尾牙活動</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="s5" className="section">
        <div className="img-outer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/temp/9.webp" alt="Origin起源劇團2024至2025年演出經歷照片" />
        </div>
        <div className="text-outer text-tertiary-50 text-sm lg:text-xl">
          <h2 className="text-secondary-300 font-bold text-3xl lg:text-5xl">演出經歷</h2>
          <div>
            <div>
              <h3 className="text-tertiary-200 font-bold text-lg mt-4 lg:text-2xl">2024</h3>
              <ul>
                <li>2024金門縣烈嶼芋頭節</li>
                <li>2024越南富國島火舞演出</li>
                <li>2024南投營火露營音樂祭 大型火舞秀</li>
                <li>2024金門底揪市集 演出嘉賓</li>
                <li>2024金門第一獅子會授證儀式</li>
                <li>2024宜蘭傳統藝術中心 愛在夏天夜傳藝 大型火舞秀</li>
                <li>2024花蓮縣清潔隊員節特邀演出</li>
              </ul>
              <h3 className="text-tertiary-200 font-bold text-lg mt-4 lg:text-2xl">2025</h3>
              <ul>
                <li>2025花蓮縣七星連珠星空音樂節 大型火舞秀</li>
                <li>2025花蓮縣太平洋燈會</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="panels">
        <div id="panels-container" style={{ width: "300%" }}>
          <div id="panel_5" className="panel full-screen">
            <div className="text-outer">
              <h2 className="text-2xl font-bold text-tertiary-200 lg:text-5xl">碧潭地景藝術節開場</h2>
              <p className="text-base text-tertiary-300 mt-2 lg:text-2xl lg:mt-8">大型火舞商演</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/10.jpg" alt="碧潭地景藝術節開場大型火舞商演" />
          </div>
          <div id="panel_6" className="panel full-screen">
            <div className="text-outer text-tertiary-300">
              <h2 className="text-2xl font-bold text-tertiary-200 lg:text-5xl">宜蘭傳藝中心 愛在夏天 夜傳藝</h2>
              <p className="text-base text-tertiary-300 mt-2 lg:text-2xl lg:mt-8">客製化風格主題商演</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/11.webp" alt="宜蘭傳藝中心愛在夏天夜傳藝客製化風格主題商演" />
          </div>
          <div id="panel_7" className="panel full-screen">
            <div className="text-outer text-tertiary-300">
              <h2 className="text-2xl font-bold text-tertiary-200 lg:text-5xl">花蓮七星潭 七星連珠星光音樂會</h2>
              <p className="text-base text-tertiary-300 mt-2 lg:text-2xl lg:mt-8">特色活動結合火舞藝術撼動觀眾</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/temp/12.webp" alt="花蓮七星潭七星連珠星光音樂會火舞演出" />
          </div>
        </div>
      </div>
    </>
  );
}
