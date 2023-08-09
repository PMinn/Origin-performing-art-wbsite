import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from '../styles/HomeSplideComponent.module.css';
import fontsStyles from '../styles/fonts.module.css';

import app from '../../firebaseConfig.js';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css/core';
// import { Intersection } from '@splidejs/splide-extension-intersection';

async function fetchHomeSplideImage() {
    const storage = getStorage(app);
    const urls = ['index/p1/1-2.jpg', 'index/p1/9-2.jpg', 'index/p1/2-2.jpg', 'index/p1/7-2.jpg'];
    var downloadURL = urls.map(async url => await getDownloadURL(ref(storage, url)));
    return await Promise.all(downloadURL);
}

export default function HomeSplideComponent() {
    const { data: homeSplide, error: homeSplideError } = useSWR('/fetchHomeSplideImage', fetchHomeSplideImage);

    useEffect(() => {

    }, [])

    return (
        <>
            <Head>
            </Head>
            {/*  data-bs-pause={false} data-bs-touch={false} data-bs-keyboard={false} */}
            <div id="slide" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    {
                        (homeSplide ?
                            homeSplide.map((url, index) => {
                                return (
                                    <button type="button" data-bs-target="#slide" data-bs-slide-to={index} className={(index == 0 ? "active" : "")}></button>
                                )
                            })
                            :
                            <></>)
                    }
                </div>
                <div class="carousel-inner">
                    {
                        (homeSplide ?
                            homeSplide.map((url, index) => {
                                return (
                                    <div className={"carousel-item" + (index == 0 ? ' active' : '')} >
                                        <img src={url} draggable="false" class="d-block h-100" />
                                    </div>
                                )
                            })
                            :
                            <></>)
                    }
                </div>
            </div>
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="..." class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div className={styles.intro}>
                <div className="split">
                    <div className={styles.text + " " + fontsStyles.ENG}>Origin</div>
                </div>
                <div className="split">
                    <div className={styles.text + " " + fontsStyles.ZH}>起源劇團</div>
                </div>
                <div className="split">
                    <div className={styles.text + " " + fontsStyles.ZH}>我們想將對表演的酷愛與熱忱，藉著令人醉心的歌曲、震撼人心的表演帶給觀眾，將表演令人無法抵擋的歡樂帶上街頭，在觀眾的心中留下一抹深刻的記憶。</div>
                </div>
                <div className={styles["timeline-img"]}>
                    <div className="{active: (index == 0), empty: (index < 0) }"></div>
                    <div className="{active: (index == 1), empty: (index < 1) }"></div>
                    <div className="{active: (index == 2), empty: (index < 2) }"></div>
                    <div className="{ active: (index == 3), empty: (index < 3) }"></div>
                </div>
            </div>
        </>
    )
}