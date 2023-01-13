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
                        <a href="/facebook" class="ENG anchor pointer" target="_blank">
                            <img src="@/assets/media/facebook.svg" widyh="24" height="24" alt="">
                            OriginPerformingArt
                        </a>
                        <a href="/instagram" class="ENG anchor pointer" target="_blank">
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
    name: 'FooterComponent'
}
</script>

<style scoped>
footer {
    background-color: #1b1b1b;
    padding: 5vh 0;
}

.footer-inner {
    width: 86vw;
    margin: 0 auto;

    display: flex;
    align-items: stretch;
}

.footer-inner-left,
.footer-inner-right {
    width: 50%;
}

.footer-block-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 45px;
    padding-top: 45px;
}

.footer-logo {
    width: 200px;
}

.footer-block-media {
    padding-top: 36px;
    padding-bottom: 36px;
}

.footer-block-media {
    display: flex;
    justify-content: space-evenly;
}

.footer-block-media .anchor {
    display: flex;
}

.footer-block-logo>*,
.footer-block-link a,
.footer-block-media a {
    margin-bottom: 25px;
}

.footer-block-link {
    height: calc(100% - 1px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.footer-block-link a {
    width: 100%;
    text-align: center;
}


.anchor>img {
    margin: 0 5px;
    width: 24px;
}

footer small {
    width: 100%;
    color: #747474;
    text-align: center;
}

.hr {
    border-bottom: 1px #414141 solid;
}

@media only screen and (max-width: 480px) {
    .footer-inner {
        display: block;
    }

    .footer-inner-left,
    .footer-inner-right {
        width: 100%;
    }

    .footer-logo {
        width: 30vw;
        height: auto;
    }

    .footer-block-media,
    .footer-block-link {
        display: block;
    }

    .footer-block-link a {
        display: flex;
    }

    .footer-block-link {
        padding-top: 36px;
        padding-bottom: 36px;
        margin-bottom: 3vh;
        height: unset;
    }
}
</style>
