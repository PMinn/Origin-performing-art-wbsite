<template>
    <div>
        <!-- menu last update 2022/11/20 -->
        <nav>
            <router-link to="/" id="title" class="ENG pointer">Origin</router-link>
            <div id="menu-icon" class="pointer">
                <div></div>
                <div></div>
            </div>
        </nav>
        <div id="menu" class="ZH">
            <router-link @click="closeMenu" to="/" class="pointer">首頁</router-link>
            <router-link @click="closeMenu" to="/about" class="pointer">關於我們</router-link>
            <router-link @click="closeMenu" to="/event" class="pointer">活動行程</router-link>
            <router-link @click="closeMenu" to="/blog" class="pointer ENG">BLOG</router-link>
            <router-link @click="closeMenu" to="/contact" class="pointer">聯絡我們</router-link>
        </div>
        <!-- menu end -->
    </div>
</template>

<script>
import Nav from '@/assets/js/nav.js'
export default {
    name: 'NavComponent',
    setup() {
        return {
            nav: new Nav()
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        document.addEventListener('DOMContentLoaded', () => {

        })
    },
    methods: {
        closeMenu() {
            this.nav.hidden();
        }
    }
}
</script>

<style src="@/assets/css/nav.css">

</style>
