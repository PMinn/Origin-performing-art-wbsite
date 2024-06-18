import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

// import fontsStyles from '../styles/fonts.module.css';
import styles from '../styles/contact.module.css';
import { useSettings } from '@/components/Settings.js';

export default function Contact({ title, description }) {
    const { facebook, instagram } = useSettings();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
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
            <div className='container w-[90%] mx-auto py-[7vh]'>
                <h2 className="text-3xl">聯絡我們</h2>
                <div className="block md:flex justify-evenly mt-5">
                    <Link href={"https://www.instagram.com/" + instagram} className={styles['social-link'] + ' pointer'} target="_blank">
                        <div className={styles["contact-logo"]}>
                            <img src="/media/instagram.svg" alt="instagram" />
                        </div>
                        <span className="md:before:content-['instagram\a\a']">@{instagram}</span>
                    </Link>
                    <Link href={"https://www.facebook.com/" + facebook} className={styles['social-link'] + ' pointer'} target="_blank">
                        <div className={styles["contact-logo"]}>
                            <img src="/media/facebook.svg" alt="facebook" />
                        </div>
                        <span className="md:before:content-['facebook\a\a']">{facebook}</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export function getStaticProps() {
    return {
        props: {
            title: '聯絡我們 | Origin 起源劇團',
            description: '聯絡我們，instagram:https://www.instagram.com/origin_performing_art/，facebook:https://www.facebook.com/OriginPerformingArt/。'
        }
    }
}