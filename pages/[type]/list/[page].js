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
import events from '@/temp/events.json';

const numberPerPage = 10; // 一頁顯示幾筆資料
const blogKeys = Object.keys(blogs);
const eventKeys = Object.keys(events);
const blogPageLength = Math.ceil(blogKeys.length / numberPerPage);
const eventPageLength = Math.ceil(eventKeys.length / numberPerPage);

export default function BlogList({ data, title, description, type, page, headline, pageLength }) {
    const { data: images, isLoading } = useSWR({ url: '/list', type, page }, async () => {
        var images = data.map(d => d.image);
        for (let i = 0; i < images.length; i++) {
            images[i] = await fetchImage(images[i]);
        }
        return images;
    });
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
                <h2 className={styles['page-title'] + ' m-5'}>{headline}</h2>
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
                <div className={btnStyles.pagination}>
                    {
                        Array.from({ length: pageLength }).map((_, index) => {
                            return <Link href={`/${type}/list/${index + 1}`} className={btnStyles.btn + (page == index + 1 ? " " + btnStyles.active : "") + " pointer"}>{index + 1}</Link>
                        })
                    }
                </div>
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
    var data, title, description, headline, pageLength;
    if (type == 'blog') {
        title = 'BLOG | Origin 起源劇團';
        description = 'BLOG';
        headline = 'BLOG';
        data = blogKeys.map(key => {
            blogs[key].date = new Date(blogs[key].date).getTime();
            return { ...blogs[key], id: key }
        });
        pageLength = blogPageLength;
    } else {
        title = '活動行程 | Origin 起源劇團';
        description = '活動行程';
        headline = '活動行程';
        data = eventKeys.map(key => {
            events[key].date = new Date(events[key].date).getTime();
            return { ...events[key], id: key };
        });
        pageLength = eventPageLength;
    }
    data.sort((a, b) => b.date - a.date);
    data = data.slice(index * numberPerPage, (index + 1) * numberPerPage);
    return {
        props: {
            headline,
            data,
            title,
            description,
            type,
            page,
            pageLength
        },
        // revalidate: 1
    };
}

export async function getStaticPaths() {
    const blogPaths = Array.from({ length: blogPageLength }).map((_, index) => {
        return {
            params: {
                type: 'blog',
                page: (index + 1).toString(),
            }
        }
    })
    const eventPaths = Array.from({ length: eventPageLength }).map((_, index) => {
        return {
            params: {
                type: 'event',
                page: (index + 1).toString(),
            }
        }
    })
    return {
        paths: blogPaths.concat(eventPaths),
        fallback: false, // false or "blocking"
    }
}