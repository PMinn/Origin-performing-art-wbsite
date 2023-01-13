<template>
    <Splide @splide:autoplay:playing="onPlaying" :extensions="extensions" :options="options"
        aria-label="Beautiful Images">
        <SplideSlide>
            <img v-bind:src="img1" alt="">
        </SplideSlide>
        <SplideSlide>
            <img v-bind:src="img2" alt="">
        </SplideSlide>
        <SplideSlide>
            <img v-bind:src="img3" alt="">
        </SplideSlide>
        <SplideSlide>
            <img v-bind:src="img4" alt="">
        </SplideSlide>
    </Splide>
    <div id="intro">
        <div class="split">
            <div class="text ENG">Origin</div>
        </div>
        <div class="split">
            <div class="text ZH">起源劇團</div>
        </div>
        <div class="split">
            <div class="text ZH">我們想將對表演的酷愛與熱忱，藉著令人醉心的歌曲、震撼人心的表演帶給觀眾，將表演令人無法抵擋的歡樂帶上街頭，在觀眾的心中留下一抹深刻的記憶。</div>
        </div>
        <div id="timeline-img">
            <div :class="{ active: (index == 0), empty: (index < 0) }"></div>
            <div :class="{ active: (index == 1), empty: (index < 1) }"></div>
            <div :class="{ active: (index == 2), empty: (index < 2) }"></div>
            <div :class="{ active: (index == 3), empty: (index < 3) }"></div>
        </div>
    </div>
</template>

<script>
import '@splidejs/vue-splide/css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { Intersection } from '@splidejs/splide-extension-intersection';


import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'

export default {
    name: 'HomeSplideComponent',
    data() {
        return {
            index: 0,
            rate: 0
        }
    },
    setup() {
        const options = {
            drag: false,
            height: '100vh',
            width: '100vw',
            fixedHeight: '100vh',
            heightRatio: 1,
            disabled: true,
            rewind: true,
            autoplay: 'pause',
            arrows: false,
            pagination: false,
            dots: false,
            interval: 8000,
            speed: 1000,
            pauseOnHover: false,
            focus: 'center',
            intersection: {
                pauseOnHover: false,
                pauseOnFocus: false,
                inView: {
                    autoplay: true,
                    autoScroll: false
                },
                outView: {
                    autoplay: true,
                    autoScroll: false
                }
            },
            autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false
            }
        };

        const storage = useFirebaseStorage();
        function getImageUrl(originUrl) {
            const fileRef = storageRef(storage, originUrl)
            const { url } = useStorageFileUrl(fileRef);
            return url;
        }
        return {
            img1: getImageUrl('index/p1/1-2.jpg'),
            img2: getImageUrl('index/p1/9-2.jpg'),
            img3: getImageUrl('index/p1/2-2.jpg'),
            img4: getImageUrl('index/p1/7-2.jpg'),
            extensions: { Intersection },
            options
        }
    },
    methods: {
        onPlaying(splide, rate) {
            this.index = splide.index;
            this.rate = rate;
        }
    },
    components: {
        Splide,
        SplideSlide,
    },
    mounted() {
        document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));
    }
};
</script>

<style scoped>
#timeline-img>div.active::before {
    --progress: v-bind(rate);
}

#timeline-img>div.empty::before {
    --progress: 0;
}

#image-carousel {
    height: 100vh;
    position: relative;
}

.splide__slide {
    overflow: hidden;
}

.splide__slide img {
    transition: transform 8s linear;
    transform: scale(1.2);
    height: 100vh;
    margin: 0 auto;
    display: block;
}

.splide__slide.is-active img {
    transform: scale(1);
}

#intro {
    width: 86vw;
    position: absolute;
    bottom: 8vh;
    left: 7vw;
    max-width: 500px;
}

#intro .text {
    z-index: 52;
    color: var(--second-color);
    margin-bottom: 1vh;
}

#intro>div:nth-child(1) {
    font-size: 5rem;
}

#intro>div:nth-child(2) {
    font-size: 25px;
}

#intro>div:nth-child(3) {
    width: 100%;
}

#timeline-img {
    display: flex;
    justify-content: center;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 2vh;
}

#timeline-img>div {
    height: 1px;
    width: 20vw;
    max-width: 120px;
    margin: 0 2px;
    background-color: #fff;
}

#timeline-img>div::before {
    display: block;
    content: '';
    background-color: var(--second-color);
    height: 1px;
    width: 20vw;
    max-width: 120px;
    transform-origin: left;
    transform: scaleX(var(--progress));
}
</style>