<template>
  <div>
    <HomeSplideComponent></HomeSplideComponent>
    <div id="p2" class="ZH">
      <div class="p2-inner">
        <div class="split">
          <div class="content_title">演出項目</div>
        </div>
        <div class="imgs">
          <div class="img">
            <img v-bind:src="p2_1" alt="">
            <div class="split">
              <div>街頭表演</div>
            </div>
          </div>
          <div class="img">
            <img v-bind:src="p2_2" alt="">
            <div class="split">
              <div>商業演出</div>
            </div>
          </div>
        </div>
        <router-link to="/contact" class="anchor pointer">聯絡我們</router-link>
      </div>
    </div>
    <div id="p3" class="ZH">
      <video id="logo-video" :src="LogoAnimation" autoplay loop muted playsinline></video>
      <div>
        <div class="split">
          <div class="content_title">跟著<span class="ENG">Origin</span>一起遇火重生</div>
        </div>
        <p>你們是否會常常問自己一個問題，我當初做這件事是開心的嗎？</p>
        <p>最初，也許每一個人心中都是帶著熱情去嘗試新事物，但是隨著時間的流逝，加上高強度壓力的環境壓迫，熱情經常會消逝。跟著<span class="ENG">Origin</span>一起遇火重生，燃起你心中深埋的熱情！
        </p>
        <router-link to="/about" class="anchor pointer">關於我們</router-link>
      </div>
    </div>
    <div id="p4">
      <h6>更多</h6>
      <router-link to="/event" class="anchor li event pointer" data-load="false">
        <div class="ZH" data-load="false" loading="lazy">
          <div>
            活動行程
          </div>
        </div>
      </router-link>
      <router-link to="/blog" class="anchor li blog pointer" data-load="false">
        <div class="ZH" data-load="false" loading="lazy">
          <div>
            BLOG
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import HomeSplideComponent from '@/components/HomeSplideComponent';
import split from '@/assets/js/split.js';
import li from '@/assets/js/li.js';

import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'

export default {
  name: 'HomeView',
  components: {
    HomeSplideComponent
  },
  setup() {
    const storage = useFirebaseStorage();
    function getImageUrl(originUrl) {
      const fileRef = storageRef(storage, originUrl)
      const { url } = useStorageFileUrl(fileRef);
      return url;
    }
    return {
      p2_1: getImageUrl('index/p2/1.jpg'),
      p2_2: getImageUrl('index/p2/2.jpg'),
      LogoAnimation: getImageUrl('index/p3/LogoAnimation.webm')
    }
  },
  mounted() {
    setTimeout(() => {
      split();
      li();
    }, 1000)
    const storage = getStorage();
    if (window.innerWidth <= 500) {
      getDownloadURL(storageRef(storage, 'index/p4/1.jpg')).then(url => document.querySelector('.anchor.blog>div').style.backgroundImage = `url(${url})`);
      getDownloadURL(storageRef(storage, 'index/p4/2.jpg')).then(url => document.querySelector('.anchor.event>div').style.backgroundImage = `url(${url})`);
    } else {
      getDownloadURL(storageRef(storage, 'index/p4/p1.jpg')).then(url => document.querySelector('.anchor.blog>div').style.backgroundImage = `url(${url})`);
      getDownloadURL(storageRef(storage, 'index/p4/p2.jpg')).then(url => document.querySelector('.anchor.event>div').style.backgroundImage = `url(${url})`);
    }
  }
}
</script>


<style scoped>
#p2 .anchor,
#p3 .anchor {
  justify-content: center;
  font-weight: 900;
  letter-spacing: 0.15rem;
  padding: 1.4rem 2.4rem;
  margin-top: 12rem;
  margin-bottom: 0;
}

.content_title {
  font-size: 2rem;
}

#p2 {
  width: 100vw;
  margin: 8rem auto 0 auto;
  background: var(--main-color);
  background: linear-gradient(180deg, var(--main-color) 0%, #000 100%);
  color: #fff;
}

#p2 .anchor,
#p3 .anchor,
#p4 .anchor {
  display: flex;
}

#p2 .p2-inner {
  width: 86vw;
  max-width: calc(740px + 10vw);
  margin: 0 auto;
}

#p2 .imgs {
  display: flex;
  justify-content: space-between;
}

#p2 .imgs .img {
  width: 100%;
  max-width: 370px;
  margin-bottom: 80px;

  height: 110vw;
  max-height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

#p2 .imgs .img img {
  height: 100%;
}

#p2>div>* {
  margin-bottom: 80px;
}

#p2 .img>div {
  position: absolute;
  bottom: 3%;
  left: 5%;
  width: 90%;
}

#p2 .img>div>div {
  width: 100%;
  text-align: end;
  mix-blend-mode: difference;
}

#p3 {
  width: 100%;
  background-color: #000;
  color: #fff;

  display: flex;
  justify-content: space-between;
}

#p3>div {
  width: calc(80vw - 600px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

#logo-video {
  width: 600px;
}

#p3 .content_title {
  /* width: 86vw; */
  color: var(--second-color);
  font-weight: 900;
  margin: 2vh 0;
}

#p3 p {
  width: 100%;
  line-height: 250%;
}

#p4 {
  color: #fff;
  padding: 8rem 0;
  width: 100%;
}

#p4>* {
  width: 50vw;
  margin: 5vh auto;
}

@media only screen and (max-width: 480px) {
  #p2 .imgs {
    display: block;
  }

  #p3 {
    display: block;
    padding-bottom: 12rem;
  }

  #p3>div {
    width: 86vw;
  }

  #p3>*:not(#logo-video) {
    z-index: 48;
    position: relative;
  }

  #logo-video {
    position: -webkit-sticky;
    position: sticky;
    top: calc(50vh - 90vw);
    width: 100%;
    filter: brightness(0.6);
    -webkit-filter: brightness(0.6);
    z-index: 47;
  }

  #p4>h6 {
    width: 86vw;
  }

  #p4>.li {
    width: 100%;
  }
}
</style>
<style src="@/assets/css/li.css" scoped>

</style>
<style src="@/assets/css/split.css" scoped>

</style>