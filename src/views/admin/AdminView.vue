<template>
    <div class="contain">
        <div class="progress" :style="{ transform: `scaleX(${progress})` }"></div>
        <div class="head">
            <ul>
                <li class="pointer">
                    檔案
                    <ul>
                        <li @click="synchronize">同步本地資料庫</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="body">
            <div class="pages-selecter">
                <div class="pointer select" @click="changePage($event, 'about')">關於我們</div>
                <div class="pointer" @click="changePage($event, 'blog')">Blog</div>
                <div class="pointer" @click="changePage($event, 'event')">活動行程</div>
            </div>
            <AdminEditorComponent ref="ChildComponent" :data="data" class="AdminEditorComponent"></AdminEditorComponent>
        </div>
    </div>
</template>

<script>
import AdminEditorComponent from '@/components/admin/AdminEditorComponent.vue';
import { io } from "socket.io-client";
const port = 61535;

export default {
    name: 'AdminView',
    components: {
        AdminEditorComponent
    },
    data() {
        return {
            socket: io(`ws://localhost:${port}`),
            progress: 0,
            data: []
        }
    },
    mounted() {
        this.socket.on("checkVersion", version => {
            console.log(version)
        });
        this.socket.on("progress", p => {
            this.progress = p;
            if (p == 1) {
                setTimeout(() => {
                    this.progress = 0;
                }, 1000);
            }
        });
        this.socket.on("getData", data => {
            this.data = data;//JSON.parse();
            console.log(this.data)
        });
    },
    methods: {
        changePage(event, page) {
            document.querySelectorAll('.pages-selecter .pointer').forEach(btn => {
                btn.classList.remove('select');
            })
            event.target.classList.add('select');
            this.socket.emit('getData', page);
            this.$refs.ChildComponent.log()
        },
        synchronize() {
            var doSynchronize = confirm('將會覆蓋本地的資料庫，會遺失未上傳的資料，確定要執行嗎？');
            if (doSynchronize) {
                this.socket.emit('synchronize');
            }
        }
    }
}
</script>
<style scoped>
.progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 3px;
    transition: all 0.5s;
    transform-origin: left;
    background-color: var(--second-color);
}

.contain {
    width: calc(100vw - 2px);
    height: calc(93vh - 2px);
    border: 1px solid #cfcfcf;
}

.head {
    width: 100%;
    height: 1.5rem;
    border-bottom: #cfcfcf 1px solid;
}

.head ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.head>ul>li {
    color: #fff;
    padding: 0 10px;
    line-height: 1.5rem;
    font-size: 1rem;
    position: relative;
    display: inline-block;
    border-right: #cfcfcf 1px solid;
}

.head>ul>li>ul {
    display: none;
    position: absolute;
    z-index: 99;
    left: -1px;
    top: 100%;
    min-width: 180px;
    background-color: #fff;
}

.head>ul>li:hover>ul {
    display: block;
}

.head>ul>li>ul>li {
    transition: all 0.5s;
    background-color: #fff;
    color: #000;
    text-align: center;
}

.head>ul>li>ul>li:hover {
    background-color: #b4b4b4;
    color: #fff;
}

.body {
    width: 100%;
    height: calc(100% - 1.5rem);
    display: flex;
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

.AdminEditorComponent {
    width: 45%;
}
</style>