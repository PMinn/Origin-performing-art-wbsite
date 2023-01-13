<template>
    <div v-bind:style="{ display: (isShow ? 'flex' : 'none'), transform, top, left, opacity, backgroundColor }"
        v-bind:class="{ cursor: true, show: isShow }" ref="cursor">
        <div></div>
    </div>
</template>

<script>

export default {
    name: 'CursorComponent',
    data() {
        return {
            isShow: false,
            transform: 1,
            top: 0,
            left: 0,
            opacity: 1,
            backgroundColor: 'transparent'
        }
    },
    mounted() {
        // cursor()
        if (window.innerWidth >= 480) {
            this.isShow = true;
            window.addEventListener('mousemove', this.mousemove);
        }
    },
    methods: {
        mousemove(e) {
            if (document.querySelectorAll('.pointer:hover').length > 0) {
                this.transform = `scale(1.5)`;
                this.top = `${e.clientY - 25}px`;
                this.left = `${e.clientX - 25}px`;
                this.opacity = 1;
                this.backgroundColor = '#ffffff30';
            } else {
                this.transform = `scale(1)`;
                this.top = `${e.clientY - 25}px`;
                this.left = `${e.clientX - 25}px`;
                this.opacity = 0.8;
                this.backgroundColor = 'transparent';
            }
        }
    },
}
</script>

<style scoped>
.cursor {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px #fff solid;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: 999;
    transition: transform 0.5s, background-color 0.5s, opacity 0.5s;
    opacity: 0;
}

.cursor.show {
    opacity: 1;
}

.cursor>div {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #fff;
    pointer-events: none;
}
</style>