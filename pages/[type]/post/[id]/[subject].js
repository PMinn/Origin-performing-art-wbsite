import Head from 'next/head';
import useSWR from 'swr';
import styles from '@/styles/post.module.css';
import Layout from '@/components/Layout';
import { fetchImage } from '@/firebase.js';
import blogs from '@/temp/blogs.json';
import events from '@/temp/events.json';

export default function ({ data, title, description, type, id }) {
    const { data: image, isLoading } = useSWR({ url: '/post', type, id }, async () => await fetchImage(data.image));
    if (data.date) data.date = new Date(data.date);
    return (
        <Layout loading={isLoading}>
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
            {
                <>
                    <div className={styles.outer}>
                        <div className={styles.content}>
                            {image && <img src={image} alt="" />}
                        </div>
                        <div className={styles.inner + ' container'}>
                            <h2>{data.title}</h2>
                            {data.date && <h6 className={styles.date}>{`${data.date.getFullYear()} / ${data.date.getMonth() + 1} / ${data.date.getDate()}`}</h6>}
                        </div>
                    </div>
                    <div className={styles.text + ' container my-5 edit'} dangerouslySetInnerHTML={{
                        __html: data.html
                    }}></div>
                </>
            }
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const { type, id, subject } = params;
    var data, title, description;
    if (type == 'blog') {
        title = subject + ' | BLOG | Origin 起源劇團';
        description = 'BLOG';
        data = blogs[id];
    } else {
        title = subject + ' | 活動行程 | Origin 起源劇團';
        description = '活動行程';
        data = events[id];
    }
    return {
        props: {
            data,
            title,
            description,
            type,
            id
        },
        // revalidate: 1
    };
}

export async function getStaticPaths() {
    const blogPaths = Object.keys(blogs).map(key => {
        const blog = blogs[key];
        return {
            params: {
                type: 'blog',
                id: key,
                subject: blog.title,
            }
        }
    })
    const eventPaths = Object.keys(events).map(key => {
        const event = events[key];
        return {
            params: {
                type: 'event',
                id: key,
                subject: event.title,
            }
        }
    })
    return {
        paths: blogPaths.concat(eventPaths),
        fallback: false, // false or "blocking"
    }
}