import Link from 'next/link';
import Head from 'next/head';

import Layout from '@/components/Layout';
import blogs from '@/temp/blogs.json';
import events from '@/temp/events.json';

const numberPerPage = 10; // 一頁顯示幾筆資料
const blogKeys = Object.keys(blogs);
const eventKeys = Object.keys(events);
const blogPageLength = Math.ceil(blogKeys.length / numberPerPage);
const eventPageLength = Math.ceil(eventKeys.length / numberPerPage);

export default function BlogList({ data, title, description, type, page, headline, pageLength }) {
    return (
        <Layout loading={false}>
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
            <div className="container mx-auto py-[7vh]">
                <h2 className="text-3xl m-5">{headline}</h2>
                {
                    data && data.map((post, index) => (
                        <div className="pointer" data-aos="fade-right" data-aos-duration="1000" key={type + '_' + index}>
                            <Link className="block w-full h-[18vh]" href={`/${type}/post/${post.id}/${post.title}`}>
                                <div className="absolute px-[8vw] w-full h-full flex flex-col justify-center">
                                    <div className="text-2xl">{post.title}</div>
                                    {
                                        type == "blog" &&
                                        <div>{`${new Date(post.date).getFullYear()} / ${new Date(post.date).getMonth() + 1} / ${new Date(post.date).getDate()}`}</div>
                                    }
                                </div>
                                {post.image && <img className="object-cover w-full h-full" src={post.image} alt={post.title + '橫幅'} />}
                            </Link>
                        </div>
                    ))
                }
                <div className="flex justify-center items-center mt-4 gap-1">
                    {
                        Array.from({ length: pageLength }).map((_, index) => {
                            return <Link href={`/${type}/list/${index + 1}`} className={"min-w-[44px] min-h-[44px] px-6 py-3 flex justify-center items-center pointer " + (page == index + 1 ? "bg-primary" : "")}>{index + 1}</Link>
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