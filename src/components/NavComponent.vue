<template>
    <div>
        <!-- menu last update 2022/11/20 -->
        <nav>
            <router-link to="/" id="title" class="ENG pointer">Origin</router-link>
            <div id="menu-icon" v-bind:class="{ pointer: true, open: isMenuOpen }" @click="onclick">
                <div></div>
                <div></div>
            </div>
        </nav>
        <div id="menu" class="ZH" v-bind:class="{ open: isMenuOpen }" v-bind:style="{ display: menuDisplay }">
            <router-link @click="onclickRouter" to="/" class="pointer">首頁</router-link>
            <router-link @click="onclickRouter" to="/about" class="pointer">關於我們</router-link>
            <router-link @click="onclickRouter" to="/event" class="pointer">活動行程</router-link>
            <router-link @click="onclickRouter" to="/blog" class="pointer ENG">BLOG</router-link>
            <router-link @click="onclickRouter" to="/contact" class="pointer">聯絡我們</router-link>
        </div>
        <!-- menu end -->
    </div>
</template>

<script>
export default {
    name: 'NavComponent',
    data() {
        return {
            isOpen: false,
            isMenuOpen: false,
            isIconOpen: false,
            menuDisplay: 'none'
        }
    },
    mounted() {
        document.addEventListener('DOMContentLoaded', () => {

        })
    },
    methods: {
        hidden() {
            this.isOpen = false;
            this.isMenuOpen = false;
            this.isIconOpen = false;
            setTimeout(() => {
                if (!this.isOpen) this.menuDisplay = 'none';
            }, 500)
        },
        show() {
            this.isOpen = true;
            this.isIconOpen = true;
            this.menuDisplay = 'flex';
            setTimeout(() => {
                if (this.isOpen) this.isMenuOpen = true;
            }, 100)
        },
        onclick() {
            if (this.isOpen) this.hidden();
            else this.show();
        },
        onclickRouter() {
            this.hidden();
        }
    }
}
</script>

<style scoped>
nav {
    height: 5vh;
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vh 5vw;
    position: fixed;
    top: 0;
    z-index: 50;
    /* backdrop-filter: blur(7px); */
    mix-blend-mode: difference;
}

#title {
    color: var(--second-color);
    font-size: 20px;
    /* font-family: monospace; */
    text-decoration: none;
    height: 20px;
    line-height: 20px;
}

#menu-icon {
    height: 2vh;
    width: 2vh;
    display: flex;
    flex-direction: column;
    padding: 1.5vh;
}

#menu-icon>div {
    width: 30px;
    height: 1px;
    border-radius: 5px;
    background-color: var(--second-color);
    -webkit-transition: all 0.5s ease;
    /* -webkit-transition: -webkit-transform 0.5s ease; */
    transition: all 0.5s ease;
}

#menu-icon>div:nth-child(1) {
    transform: rotateZ(0) translateY(calc(50% - 5px));
    -webkit-transform: rotateZ(0) translateY(calc(50% - 5px));
}

#menu-icon.open>div:nth-child(1) {
    transform: rotateZ(45deg) translateY(50%);
    -webkit-transform: rotateZ(45deg) translateY(50%);
}

#menu-icon>div:nth-child(2) {
    transform: rotateZ(0) translateY(calc(50% + 5px));
    -webkit-transform: rotateZ(0) translateY(calc(50% + 5px));
}

#menu-icon.open>div:nth-child(2) {
    transform: rotateZ(-45deg) translateY(50%);
    -webkit-transform: rotateZ(-45deg) translateY(50%);
}

#menu {
    display: none;
    flex-direction: column;
    width: 100vw;
    height: 36vh;
    padding: 32vh 0;
    background-color: var(--second-color);
    -webkit-transition: opacity 0.5s ease;
    transition: opacity 0.5s ease;
    opacity: 0;
    justify-content: space-evenly;
    align-items: center;
    z-index: 49;
    position: fixed;
    top: 0;
    left: 0;
}

#menu.open {
    opacity: 1;
}

#menu>* {
    color: #000;
    font-size: 1.2rem;
    text-decoration: none;
}
</style>
