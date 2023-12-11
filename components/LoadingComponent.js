// import { useState } from 'react';
import styles from '../styles/LoadingComponent.module.css';

export default function LoadingComponent({ isLoading }) {

    return (
        <div className={styles.loading + ' ' + (isLoading ? '' : styles.hidden)}>
            <div>
                <div className={styles.logo}>
                    <img src="/media/Logo.webp" width="100" height="100" alt="" loading="eager" />
                </div>
                <div className={styles.circle}>
                    <img src="/media/load-circle.webp" width="323" height="323" alt="" loading="eager" />
                </div>
            </div>
        </div>
    )
}