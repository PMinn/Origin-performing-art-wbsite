import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '../../styles/blogList.module.css';
import fontsStyles from '../../styles/fonts.module.css';

import { fetchBlogList } from '../../../firebaseConfig.js';


export default function BlogList() {
    var { data, error, isLoading, isValidating, mutate } = useSWR('/blogList', fetchBlogList);
    return (
        <main>
            <Head></Head>
            <div className={styles.content + ' ' + fontsStyles.ZH}>
                {
                    data ?
                        data.map((blog, index) => (
                            <Link className="anchor pointer" href={`/blog/${blog.id}/${blog.title}`} key={'blog_' + index}>
                                <div className={styles.li}>
                                    <div>
                                        <img src={blog.img} alt="" />
                                    </div>
                                    <div className={styles['content-text']}>
                                        <div z={styles['content-bar']}></div>
                                        <h4>{blog.title}</h4>
                                    </div>
                                </div>
                            </Link>
                        ))
                        :
                        <></>
                }
            </div>
        </main>
    )
}