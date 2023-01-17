<template>
    <div id="contain">
        <div class="pages-selecter">
            <div class="pointer select" @click="changePage($event, 'about')">關於我們</div>
            <div class="pointer" @click="changePage($event, 'blog')">Blog</div>
            <div class="pointer" @click="changePage($event, 'event')">活動行程</div>
        </div>
        <ChildComponent ref="ChildComponent"></ChildComponent>
    </div>
</template>

<script>
import AdminEditorComponent from '@/components/admin/AdminEditorComponent.vue'
export default {
    name: 'AdminView',
    components: {
        ChildComponent: AdminEditorComponent
    },
    mounted() {
    },
    methods: {
        changePage(event, page) {
            document.querySelectorAll('.pages-selecter .pointer').forEach(btn => {
                btn.classList.remove('select');
            })
            event.target.classList.add('select');
            console.log(page)
            this.$refs.ChildComponent.log()
        }
    }
}
</script>
<style scoped>
#contain {
    width: calc(100vw - 2px);
    height: 100vh;
    display: flex;
    border: 1px solid #cfcfcf;
}

.pages-selecter {
    width: calc(10% - 1px);
    height: 100%;
    border-right: 1px solid #cfcfcf;
}

.pages-selecter div {
    width: 100%;
    padding: 3vh 0;
    text-align: center;
    color: #fff;
    font-family: sans-serif;
    border-bottom: 1px solid #cfcfcf36;
    transition: all 0.5s;
}

.pages-selecter div:hover,
.pages-selecter div.select {
    background-color: #181818;
}
</style>