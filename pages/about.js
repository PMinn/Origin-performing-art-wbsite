import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import { fetchDatabase, fetchStorageMultipleByPaths } from '@/firebase.mjs';
import Layout from '@/components/Layout';

export default function About({ title, description, data }) {
    const { data: images } = useSWR({ url: '/storage', path: 'members' }, async () => await fetchStorageMultipleByPaths(data.members.map(member => member.image)));

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
            <div className="container mx-auto w-[90%] py-[7vh]">
                <h2 className="text-2xl px-2 md:px-4">成員</h2>
                <div className='w-full flex flex-wrap'>
                    {
                        images &&
                        data.members.map((member, index) => (
                            <div className="w-1/2 md:w-1/3 px-2 md:px-4 py-5 md:[&:nth-child(3n+1)]:mt-[10vh] md:[&:nth-child(3n)]:mt-[10vh] even:mt-[5vh] md:even:mt-0" data-aos="fade-up" data-aos-duration="1000" key={'member_card_' + index}>
                                <div className="w-full h-[86vw] max-h-[500px] overflow-hidden relative flex items-center justify-center">
                                    <img className="object-cover w-full h-full z-20" src={images[index]} />
                                </div>
                                <div>
                                    <h3 className='mt-4'>{member.name}</h3>
                                    {
                                        member.instagram &&
                                        <Link className="pointer h-[40px] w-auto py-[10px] flex items-center" href={'https://instagram.com/' + member.instagram}>
                                            <img className="w-[1rem] h-[1rem] mr-[0.5rem]" src="/media/instagram.svg" />Instagram
                                        </Link>
                                    }
                                    <div>{member.intro}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const members = await fetchDatabase('/members');
    return {
        props: {
            title: '關於我們 | Origin 起源劇團',
            description: '關於我們，成員。',
            data: {
                members
            }
        }
    }
}