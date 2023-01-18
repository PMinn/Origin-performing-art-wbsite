<template>
    <div>
        <ul>
            <li v-for="d in data" :key="d.id">
                <div class="title" @click="titleOnclick($event)" data-open="false">{{ d.title }}</div>
                <div class="post-contain">
                    <div>封面照：<br>{{ d.img }}</div>
                    <div>日期：<br>{{ d.date }}</div>
                    <div>內容：<br>{{ d.html }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// {{ JSON.stringify(d, null, '&nbsp;&nbsp;&nbsp;&nbsp;') }}
export default {
    name: 'AdminEditorComponent',
    props: ['data'],
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        log() {
            console.log('edtior')
        },
        titleOnclick(event) {
            if (event.target.dataset.open == 'false') {
                document.querySelectorAll('.post-contain').forEach(contain => {
                    contain.style.transform = 'scaleY(0)';
                })
                event.target.nextElementSibling.style.transform = 'scaleY(1)';
                event.target.dataset.open = 'true';
            } else {
                event.target.nextElementSibling.style.transform = 'scaleY(0)';
                event.target.dataset.open = 'false';
            }
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
    transform: scaleY(0);
    transition: all 1s;
    transform-origin: top;
}

.post-contain>* {
    margin: 10px 0;
}
</style>