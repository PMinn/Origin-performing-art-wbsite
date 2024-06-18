import Link from 'next/link';
import Head from 'next/head';
import styles from '@/styles/index.module.css';
import { fetchImage, fetchDatabase, fetchStorageMultipleByPaths } from '@/firebase.mjs';
import Layout from '@/components/Layout';

export default function Index({ title, description, images }) {
    return (
        <Layout>
            <Head>
                {/* HTML Meta Tags  */}
                <title>{title}</title>
                <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
                <meta name='description' content={description} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content="https://origin-performing-art.web.app/" />
                <meta property="og:type" content="website" /> {/* article */}
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property="og:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="app" /> {/* summary, summary_large_image, app, player */}
                <meta property="twitter:domain" content="origin-performing-art.web.app" />
                <meta property="twitter:url" content="https://origin-performing-art.web.app/" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
            </Head>
            <div>
                <section className="w-full h-svh overflow-hidden inline-flex flex-nowrap items-center justify-start relative text-primary">
                    <h2 className={'text-8xl absolute left-[10vw] w-[80vw] z-10 top-[15vh] ' + styles['cover__titleZh']}>起源劇團</h2>
                    {
                        images.homeSplide ?
                            (
                                <>
                                    <div className={'whitespace-nowrap shrink-0 ' + styles['cover__round']} style={{ '--during': 10 * images.homeSplide.length + 's' }}>
                                        {
                                            images.homeSplide.map((url, index) => <img className="inline w-[50vw] md:w-[20vw] h-auto mx-[3vw]" src={url} alt={"首頁圖片輪播" + index} key={"cover_1_" + index} />)
                                        }
                                    </div>
                                    <div className={'whitespace-nowrap shrink-0 ' + styles['cover__round']} style={{ '--during': 10 * images.homeSplide.length + 's' }}>
                                        {
                                            images.homeSplide.map((url, index) => <img className="inline w-[50vw] md:w-[20vw] h-auto mx-[3vw]" src={url} alt={"首頁圖片輪播" + index} key={"cover_2_" + index} />)
                                        }
                                    </div>
                                </>
                            )
                            :
                            <></>
                    }
                    <h2 className="text-8xl absolute left-[10vw] w-[80vw] z-10 bottom-[15vh] text-end">Origin</h2>
                </section>
                <section className="w-full py-16 text-center text-lg leading-[4em] tracking-wide">
                    <div className="container mx-auto">
                        <p data-aos="fade-up" data-aos-duration="1000">
                            我們因著火舞而相遇<br />
                            有了共同努力的目標<br />
                            我們想將對表演的酷愛與熱忱<br />
                            與其令人無法抵擋的歡樂帶上街頭<br />
                            在觀眾的心中留下一抹深刻的記憶
                        </p>
                    </div>
                </section>
                <section className="w-full mt-[8rem] pb-[8rem] bg-gradient-to-b from-gray-950 to-gray-900">
                    <div className="container mx-auto w-[90%]">
                        <h2 className="text-3xl mb-[80px]" data-aos="fade-up" data-aos-duration="1000">演出項目</h2>
                        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5 mb-[80px]">
                            <div className="w-full h-auto aspect-square md:aspect-video overflow-hidden relative md:mb-[80px] block">
                                {
                                    images.project[0] ?
                                        <img className="w-full h-full object-cover" src={images.project[0]} alt="街頭表演" />
                                        :
                                        <></>
                                }
                                <div className="absolute bottom-0 left-0 w-full px-10 py-5 text-end mix-blend-difference text-xl" data-aos="fade-up" data-aos-duration="1000">街頭表演</div>
                            </div>
                            <div className="w-full h-auto aspect-square md:aspect-video overflow-hidden relative md:mb-[80px] block">
                                {
                                    images.project[1] ?
                                        <img className="w-full h-full object-cover" src={images.project[1]} alt="商業演出" />
                                        :
                                        <></>
                                }
                                <div className="absolute bottom-0 left-0 w-full px-10 py-5 text-end mix-blend-difference text-xl" data-aos="fade-up" data-aos-duration="1000">商業演出</div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center mb-[80px]">
                            <Link href="/contact" className="min-w-[44px] min-h-[44px] px-10 py-3 flex justify-center items-center pointer bg-primary text-black">聯絡我們</Link>
                        </div>
                    </div>
                </section>
                <section className="bg-black w-full block pb-[12rem] md:pb-0">
                    <div className="md:container flex flex-col md:flex-row justify-between gap-[10vw]">
                        {
                            images.logo ?
                                <video className="sticky top-0 w-full brightness-50 md:brightness-100 md:w-1/2 max-w-[600px]" src={images.logo} autoPlay loop muted playsInline></video>
                                :
                                <></>
                        }
                        <div className="w-[90%] md:w-full flex flex-col justify-center mx-auto relative" data-aos="fade-up" data-aos-duration="1000">
                            <div>
                                <h2 className="text-secondary text-3xl font-black my-[2vh]">跟著 Origin 一起遇火重生</h2>
                            </div>
                            <p className="leading-10">你們是否會常常問自己一個問題，我當初做這件事是開心的嗎？</p>
                            <p className="leading-10">最初，也許每一個人心中都是帶著熱情去嘗試新事物，但是隨著時間的流逝，加上高強度壓力的環境壓迫，熱情經常會消逝。跟著Origin一起遇火重生，燃起你心中深埋的熱情！</p>
                            <div className="w-full flex justify-center mt-5">
                                <Link href="/about" className="min-w-[44px] min-h-[44px] px-10 py-3 flex justify-center items-center pointer bg-primary text-black">關於我們</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-[8rem] w-full">
                    <div className="container mx-auto">
                        <h2 className="text-3xl pl-2 md:pl-0">更多</h2>
                        <Link href="/event/list/1" className="pointer relative my-[5vh] w-full h-[18vh] block leading-[20vh] text-lg font-bold" data-aos="fade-right" data-aos-duration="1000">
                            <div className="inline-block h-full z-10 absolute top-0 left-[8vw]">活動行程</div>
                            {
                                images.moreSection[0] ?
                                    <img className="w-full h-full object-cover z-0" src={images.moreSection[0]} alt="" />
                                    :
                                    <></>
                            }
                        </Link>
                        <Link href="/blog/list/1" className="pointer relative my-[5vh] w-full h-[18vh] block leading-[20vh] text-lg font-bold" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
                            <div className="inline-block h-full z-10 absolute top-0 left-[8vw]">BLOG</div>
                            {
                                images.moreSection[1] ?
                                    <img className="w-full h-full object-cover z-0" src={images.moreSection[1]} alt="" />
                                    :
                                    <></>
                            }
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const urls = await fetchDatabase('/homeSplide');
    const homeSplide = await fetchStorageMultipleByPaths(urls);
    const images = {
        homeSplide,
        project: [fetchImage('index/p2/1.jpg'), fetchImage('index/p2/2.jpg')],
        logo: fetchImage('index/p3/LogoAnimation.webm'),
        moreSection: [fetchImage('index/p4/p1.webp'), fetchImage('index/p4/p2.webp')]
    };
    await Promise.all([...images.project, images.logo, ...images.moreSection])
        .then((values) => {
            images.project = values.slice(0, 2);
            images.logo = values[2];
            images.moreSection = values.slice(3, 5);
        })
    return {
        props: {
            title: 'Origin 起源劇團',
            description: '我們因著火舞而相遇，有了共同努力的目標，我們想將對表演的酷愛與熱忱，與其令人無法抵擋的歡樂帶上街頭，在觀眾的心中留下一抹深刻的記憶。演出項目：街頭表演、商業演出。',
            images
        }
    }
}