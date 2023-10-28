import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import styles from '@/styles/post.module.css';

import NFComponent from '@/components/NFComponent.js';
import Layout from '@/components/Layout';

import { fetchBlog, fetchImage } from '@/firebase.js';
import blogs from '@/temp/blogs.json';
// var blogWithId = {};
// Object.keys(blogs).forEach(key => {
//     blogWithId[blogs[key].id] = blogs[key];
// });
// var blogIds = Object.keys(blogs).map(key => blogs[key].id);

export default function Blog({ data, title, description, type, id }) {
    const router = useRouter();
    // const { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/blog', id: router.query.id }, fetchBlog);
    const { data: image, isLoading } = useSWR({ url: '/post', type, id }, async () => await fetchImage(data.image));
    data.date = new Date(data.date);
    return (
        <Layout loading={isLoading}>
            <Head>
                <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
                <meta name='description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />
                <meta property="og:url" content="https://origin-performing-art.web.app/" />
                <meta property="og:type" content="website" /> {/* article */}
                <meta property='og:description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />
                <meta property="og:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
                <meta name="twitter:card" content="app" /> {/* summary, summary_large_image, app, player */}
                <meta property="twitter:domain" content="origin-performing-art.web.app" />
                <meta property="twitter:url" content="https://origin-performing-art.web.app/" />
                <meta name="twitter:description" content="Origin是一個火舞表演團體,主要表演地區為東台灣" />
                <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
                <title>{title}</title>
            </Head>
            {
                // !isLoading &&
                //     !error ?
                //     (
                //         data.code == 200 ?
                //             (
                <>
                    <div className={styles.outer}>
                        <div className={styles.content}>
                            {image && <img src={image} alt="" />}
                        </div>
                        <div className={styles.inner + ' container'}>
                            <h2>{data.title}</h2>
                            <h6 className={styles.date}>{`${data.date.getFullYear()} / ${data.date.getMonth() + 1} / ${data.date.getDate()}`}</h6>
                        </div>
                    </div>
                    <div className={styles.text + ' container my-5'} dangerouslySetInnerHTML={{
                        __html: data.html
                    }}></div>
                </>
                //         ) : (
                //             data.code == 404 ?
                //                 (
                //                     <NFComponent></NFComponent>
                //                 ) : (
                //                     <>error: {error}</>
                //                 )
                //         )
                // ) : (
                //     <>error: {error}</>
                // )
            }
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const { type, id, subject } = params;
    return {
        props: {
            data: blogs[id],
            title: subject + '| BLOG | Origin 起源劇團',
            description: 'BLOG',
            type,
            id
        },
        // revalidate: 1
    };
}

export async function getStaticPaths() {
    const paths = Object.keys(blogs).map(key => {
        const blog = blogs[key];
        return {
            params: {
                type: 'blog',
                id: key,
                subject: blog.title,
            }
        }
    })
    return {
        paths: paths,
        fallback: false, // false or "blocking"
    }
}