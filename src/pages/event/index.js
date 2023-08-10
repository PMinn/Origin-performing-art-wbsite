import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '../../styles/eventList.module.css';
import fontsStyles from '../../styles/fonts.module.css';

import { fetchEventList } from '../../../firebaseConfig.js';


export default function EventList() {
    var { data, error, isLoading, isValidating, mutate } = useSWR('/eventList', fetchEventList);
    return (
        <main>
            <Head></Head>
            <div className={styles.container + ' ' + fontsStyles.ZH + ' container'}>
                {
                    data ?
                        data.map((post, index) => (
                            <div key={'event_' + index} className={styles.li + ' anchor pointer'}>
                                <Link href={`/event/${post.id}/${post.title}`}>
                                    <div className={fontsStyles.ZH + ' ' + styles.title}>{post.title}</div>
                                    <img src={post.image} />
                                </Link>
                            </div>
                        ))
                        :
                        <></>
                }
            </div>
        </main>
    )
}