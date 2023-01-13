<template>
  <div>
    <!-- <loading></loading> -->
    <!-- <section id="image-carousel" class="splide" aria-label="Beautiful Images">
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide">
            <img src="@/assets/media/index/p1/1-2.jpg" alt="">
          </li>
          <li class="splide__slide">
            <img src="@/assets/media/index/p1/9-2.jpg" alt="">
          </li>
          <li class="splide__slide">
            <img src="@/assets/media/index/p1/2-2.jpg" alt="">
          </li>
          <li class="splide__slide">
            <img src="@/assets/media/index/p1/7-2.jpg" alt="">
          </li>
        </ul>
      </div>
    </section> -->
    <HomeSplideComponent></HomeSplideComponent>
    <div id="p2" class="ZH">
      <div class="p2-inner">
        <div class="split">
          <div class="content_title">演出項目</div>
        </div>
        <div class="imgs">
          <div class="img">
            <img src="@/assets/media/index/p2/1.jpg" alt="">
            <div class="split">
              <div>街頭表演</div>
            </div>
          </div>
          <div class="img">
            <img src="@/assets/media/index/p2/2.jpg" alt="">
            <div class="split">
              <div>商業演出</div>
            </div>
          </div>
        </div>
        <a href="/contact" class="anchor pointer">聯絡我們</a>
      </div>
    </div>
    <div id="p3" class="ZH">
      <video id="logo-video" src="@/assets/media/Logo3.mp4" autoplay loop muted playsinline></video>
      <div>
        <div class="split">
          <div class="content_title">跟著<span class="ENG">Origin</span>一起遇火重生</div>
        </div>
        <p>你們是否會常常問自己一個問題，我當初做這件事是開心的嗎？</p>
        <p>最初，也許每一個人心中都是帶著熱情去嘗試新事物，但是隨著時間的流逝，加上高強度壓力的環境壓迫，熱情經常會消逝。跟著<span class="ENG">Origin</span>一起遇火重生，燃起你心中深埋的熱情！
        </p>
        <a href="/about" class="anchor pointer">關於我們</a>
      </div>
    </div>
    <div id="p4">
      <h6>更多</h6>
      <a href="/event" class="anchor li event pointer" data-load="false">
        <div class="ZH" data-load="false" loading="lazy">
          <div>
            活動行程
          </div>
        </div>
      </a>
      <a href="/blog" class="anchor li blog pointer" data-load="false">
        <div class="ZH" data-load="false" loading="lazy">
          <div>
            BLOG
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
// import LoadingComponent from '@/components/LoadingComponent'
import HomeSplideComponent from '@/components/HomeSplideComponent';

export default {
  name: 'HomeView',
  components: {
    // loading: LoadingComponent
    HomeSplideComponent
  },
  data() {
    return {
    }
  },
  mounted() {
    import('@/assets/js/split.js').then(splitModule => {
      setTimeout(() => {
        splitModule.default()
        document.body.style.overflow = 'auto';
        window.scroll(0, 0);
        // notification('home')
        import('@/assets/js/li.js').then(module => {
          module.default()
        })
      }, 1000)
    })

    document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'))
  }
}
</script>


<style src="@/assets/css/index.css" scoped>

</style>
<style src="@/assets/css/li.css" scoped>

</style>
<style src="@/assets/css/split.css" scoped>

</style>