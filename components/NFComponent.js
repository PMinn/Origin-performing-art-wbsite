import Head from 'next/head';

import styles from '../styles/NFComponent.module.css';
// import fontsStyles from '../styles/fonts.module.css';

export default function NFComponent() {
    return (
        <div>
            <Head>
                <title>404 - Origin | 起源劇團</title>
            </Head>
            <h2 className={styles.text}>404 Not Found</h2>
        </div>
    )
}