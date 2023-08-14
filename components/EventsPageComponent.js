import Link from 'next/link';
import useSWR from 'swr';

import styles from '@/styles/eventList.module.css';

import { fetchEventList } from '@/firebase.js';

export default function EventsPageComponent({ before }) {
    const { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/eventList', before }, fetchEventList);

    return (
        <>
            {
                data ?
                    data.map((post, index) => (
                        <div key={'event_' + index} className={styles.li + ' anchor pointer'} data-aos="fade-right" data-aos-duration="1000">
                            <Link href={`/event/${post.id}/${post.title}`}>
                                <div className={styles.title}>{post.title}</div>
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