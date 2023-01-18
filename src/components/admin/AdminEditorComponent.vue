<template>
    <div>
        <ul>
            <li v-for="d in data" :key="d.id">
                <div class="title">{{ d.title }}</div>
                <div class="post-contain">
                    <div>封面照：<br>{{ (d.img ? d.img : d.image) }}</div>
                    <div v-if="d.date">日期：<br>{{ d.date }}</div>
                    <div v-if="d.lists">時間地點：<br>
                        <div v-for="list in d.lists" :key="list.id">{{ `${new Date(list.start).getMonth() +
            1}/${new
                Date(list.start).getDate()} -
                                    ${new Date(list.end).getMonth() + 1}/${new Date(list.end).getDate()}, ${new
                Date(list.start).getFullYear()}
                                    ${new Date(list.start).getHours().toString().padStart(2, '0')}:${new
                Date(list.start).getMinutes().toString().padStart(2,
                    '0')} - ${new Date(list.end).getHours().toString().padStart(2,
                        '0')}:${new Date(list.end).getMinutes().toString().padStart(2, '0')} ${list.location.zh}` }}
                        </div>
                    </div>
                    <div v-if="d.sort">排序：<br>{{ d.sort }}</div>
                    <div>內容：<br>
                        <div v-html="parse(d.html.replaceAll('\\n', '\n'))"></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { parse } from 'marked'

export default {
    name: 'AdminEditorComponent',
    props: ['data'],
    components: {
    },
    data() {
        return {
            parse
        }
    },
    methods: {
        log() {
            console.log('edtior')
        }
    }
}
</script>
<style scoped>
ul {
    list-style: none;
    color: #fff;
    padding: 0;
}

.title {
    width: calc(100% - 20px);
    background-color: #000000;
    padding: 10px;
    border-radius: 10px;
}

.post-contain {
    /* transform: scaleY(0); */
    transition: all 1s;
    transform-origin: top;
}

.post-contain>* {
    margin: 10px 0;
}
</style>