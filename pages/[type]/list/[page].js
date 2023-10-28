import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '@/styles/list.module.css';
import btnStyles from '@/styles/btn.module.css';

import { fetchDatabase, fetchPostListAll, fetchImage } from '@/firebase.js';

import ListPageComponent from '@/components/ListPageComponent';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import blogs from '@/temp/blogs.json';

var blogKeys = Object.keys(blogs);

export default function BlogList({ data, title, description, type, page }) {
    const { data: images, isLoading } = useSWR({ url: '/list', type, page }, async () => {
        var images = data.map(d => d.image);
        for (let i = 0; i < images.length; i++) {
            images[i] = await fetchImage(images[i]);
        }
        return images;
    });
    // const { page } = params;
    // const { data: maxSort } = useSWR({ url: '/db', path: 'blogs/maxSort' }, async ({ path }) => await fetchDatabase(path));
    // const [isLoading, setIsLoading] = useState(true);
    // const [pageIndex, setPageIndex] = useState(10);
    // const pages = [];
    // for (let sort = maxSort + 1; sort > maxSort - pageIndex + 1; sort -= 10) {
    //     pages.push(<ListPageComponent before={sort} type='blog' key={sort}></ListPageComponent>)
    // }
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
            <div className={styles.container + ' container'}>
                <h2 className={styles['page-title'] + ' m-5'}>BLOG</h2>
                {
                    data && data.map((post, index) => (
                        <div className={styles.li + ' anchor pointer'} data-aos="fade-right" data-aos-duration="1000" key={type + '_' + index}>
                            <Link href={`/${type}/post/${post.id}/${post.title}`}>
                                <div className={styles.text}>
                                    <div className={styles.title}>{post.title}</div>
                                    {
                                        type == "blog" ?
                                            <div className={styles.date}>{`${new Date(post.date).getFullYear()} / ${new Date(post.date).getMonth() + 1} / ${new Date(post.date).getDate()}`}</div>
                                            :
                                            <></>
                                    }
                                </div>
                                {images && <img src={images[index]} />}
                            </Link>
                        </div>
                    ))
                }
                {/* {pages}
                {
                    pageIndex < maxSort ?
                        <div className='w-100 d-flex justify-content-center'>
                            <div className={btnStyles.btn + ' mt-5 pointer'} onClick={() => setPageIndex(pageIndex + 10)}>More</div>
                        </div>
                        :
                        <></>
                } */}
            </div>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const { page, type } = params;
    const index = parseInt(page) - 1;
    const blogKeysSlice = blogKeys.slice(index * 10, (index + 1) * 10);
    const data = blogKeysSlice.map(key => ({ ...blogs[key], id: key }));
    return {
        props: {
            data,
            title: 'BLOG | Origin 起源劇團',
            description: 'BLOG',
            type,
            page
        },
        // revalidate: 1
    };
}

export async function getStaticPaths() {
    const paths = Array.from({ length: Math.ceil(blogKeys.length / 10) }).map((_, index) => {
        return {
            params: {
                type: 'blog',
                page: (index + 1).toString(),
            }
        }
    })
    return {
        paths: paths,
        fallback: false, // false or "blocking"
    }
}