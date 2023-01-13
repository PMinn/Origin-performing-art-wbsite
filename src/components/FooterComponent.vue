<template>
    <div>
        <!-- footer last update 2022/11/20 -->
        <footer class="ZH">
            <div class="footer-inner">
                <div class="footer-inner-left">
                    <div class="hr footer-block-logo">
                        <img class="footer-logo" src="@/assets/media/Logo.png" alt="">
                        <a class="anchor"><span class="ENG">Origin</span> <span class="ZH">起源劇團</span></a>
                    </div>
                    <div class="hr footer-block-media">
                        <a href="/facebook" class="ENG anchor pointer">
                            <img src="@/assets/media/facebook2.svg" widyh="24" height="24" alt="">
                            OriginPerformingArt
                        </a>
                        <a href="/instagram" class="ENG anchor pointer">
                            <img src="@/assets/media/instagram.svg" widyh="24" height="24" alt="">
                            origin_performing_art
                        </a>
                    </div>
                </div>
                <div class="footer-inner-right">
                    <div class="hr footer-block-link">
                        <router-link to="/" class="anchor pointer">首頁</router-link>
                        <router-link to="/about" class="anchor pointer">關於我們</router-link>
                        <router-link to="/event" class="anchor pointer">活動行程</router-link>
                        <router-link to="/blog" class="anchor pointer ENG">BLOG</router-link>
                        <router-link to="/contact" class="anchor pointer">聯絡我們</router-link>
                    </div>
                    <small class="ENG footer-block-copyright">Copyright© 2022 P'MIN. All Rights Reserved.</small>
                </div>
            </div>
        </footer>
        <!-- footer end -->
    </div>
</template>

<script>
export default {
    name: 'FooterComponent',
    mounted() {

    }
}
</script>

<style src="@/assets/css/footer.css">

</style>
