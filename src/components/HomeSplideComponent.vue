<template>
    <Splide @splide:autoplay:playing="onPlaying" :extensions="extensions" :options="options"
        aria-label="Beautiful Images">
        <SplideSlide v-for="url in imagesUrl" v-bind:key="url">
            <img v-bind:src="url" alt="">
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
        <div id="timeline-img" ref="timelineImg">
            <div v-for="(url, i) in imagesUrl" v-bind:key="url" :class="{ active: (index == i), empty: (index < i) }">
            </div>
        </div>
    </div>
</template>

<script>
import '@splidejs/vue-splide/css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { Intersection } from '@splidejs/splide-extension-intersection';
import { ref } from 'vue'

const imagesFilename = ['1-2', '9-2', '2-2', '7-2'];
const timelineImg = ref(null)

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
                    // autoplay: true,
                    autoScroll: false
                }
            },
            autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false
            }
        };

        return {
            timelineImg,
            imagesUrl: imagesFilename.map(url => {
                var images = require.context('../assets/media/index/p1/', false, /\.jpg$/);
                return images('./' + url + ".jpg");
            }),
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
    }
};
</script>

<style src="@/assets/css/splide.css" scoped>

</style>

<style>
#timeline-img>div.active::before {
    --progress: v-bind(rate);
}

#timeline-img>div.empty::before {
    --progress: 0;
}
</style>