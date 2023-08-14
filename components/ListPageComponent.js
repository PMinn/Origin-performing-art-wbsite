import Link from 'next/link';
import useSWR from 'swr';

import styles from '@/styles/list.module.css';

import { fetchPostList } from '@/firebase.js';

export default function ListPageComponent({ before, type }) {
    const { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/list', before, type }, fetchPostList);

    return (
        <>
            {
                data ?
                    data.map((post, index) => (
                        <div className={styles.li + ' anchor pointer'} data-aos="fade-right" data-aos-duration="1000" key={type + '_' + index}>
                            <Link href={`/${type}/${post.id}/${post.title}`}>
                                <div className={styles.text}>
                                    <div className={styles.title}>{post.title}</div>
                                    {
                                        post.date ?
                                            <div className={styles.date}>{`${new Date(post.date).getFullYear()} / ${new Date(post.date).getMonth() + 1} / ${new Date(post.date).getDate()}`}</div>
                                            :
                                            <></>
                                    }
                                </div>
                                <img src={post.image} />
                            </Link>
                        </div>
                    ))
                    :
                    <></>
            }
        </>
    )
}