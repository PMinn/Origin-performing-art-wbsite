import Link from 'next/link';
import { useSettings } from '@/components/Settings.js';

export default function FooterComponent() {
    const { facebook, instagram } = useSettings();

    return (
        <footer className="bg-gray-900 py-[5vh]">
            <div className="container mx-auto w-[90%]">
                <div className="border-b border-[#414141] md:flex">
                    <div className="w-full md:w-1/2">
                        <div className="border-b border-[#414141] flex flex-col items-center py-[45px]">
                            <img className="w-[30vw] h-auto md:w-[200px] md:h-[200px] mb-[25px]" src="/media/Logo.webp" alt="Origin 起源劇團 logo" loading="lazy" width={300} height={300} />
                            <div className="tracking-wide">Origin 起源劇團</div>
                        </div>
                        <div className="py-[26px] md:flex justify-evenly">
                            <Link href={'https://www.facebook.com/' + facebook} className="pointer flex gap-[5px] mb-[25px]" target="_blank">
                                <img src="/media/facebook.svg" width="24" height="24" alt="" />
                                {facebook}
                            </Link>
                            <Link href={'https://www.instagram.com/' + instagram} className="pointer flex gap-[5px] mb-[25px]" target="_blank">
                                <img src="/media/instagram.svg" width="24" height="24" alt="" />
                                {instagram}
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className=" h-full flex flex-col justify-evenly">
                            <Link href="/" className="pointer mb-[25px] w-full md:text-center">首頁</Link>
                            <Link href="/about" className="pointer mb-[25px] w-full md:text-center">關於我們</Link>
                            <Link href="/event/list/1" className="pointer mb-[25px] w-full md:text-center">活動行程</Link>
                            <Link href="/blog/list/1" className="pointer mb-[25px] w-full md:text-center">BLOG</Link>
                            <Link href="/contact" className="pointer mb-[25px] w-full md:text-center">聯絡我們</Link>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <small className="w-full text-center text-[#828383] pt-2">Copyright© 2022 <Link className="pointer text-[#828383]" href="https://github.com/PMinn"
                        target="_blank">P'MIN.</Link> All Rights Reserved.</small>
                </div>
            </div>
        </footer>
    )
}