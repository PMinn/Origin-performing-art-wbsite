<template>
  <div id="outer">
    <div id="content" v-bind:style="{ backgroundImage: 'url(' + post.img + ')' }"></div>
    <div id="inner">
      <h1 id="event_title">{{ post.title }}</h1>
      <div id="event_detail">
        <div v-for="list in post.lists" v-bind:key="list">
          <div class="hr"></div>
          <a :href="'https://www.google.com/maps/search/?api=1&query=' + list.location.point.latitude + ',' + list.location.point.longitude"
            class="ZH"><img src="@/assets/media/event/location.svg" alt="location icon"> {{ list.location.zh }}</a>
          <br>
          <span class="ENG"><img src="@/assets/media/event/time.svg" alt="time icon"> {{ list.timeString }}</span>
        </div>
      </div>
    </div>
  </div>
  <div id="text" class="ZH" v-html="post.html"></div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref as storageRef } from 'firebase/storage'
import { useFirestore, useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'EventView',
  beforeMount() {
    this.fetchData();
  },
  data() {
    return {
      post: {
        lists: [],
        title: '',
        html: '',
        img: '',
        timeString: ''
      }
    }
  },
  mounted() {
    setTimeout(() => {
      var title = document.getElementById('event_title');
      title.style.transform = 'translateX(0)';

      var detail = document.getElementById('event_detail');
      detail.style.transform = 'translateY(0)';
      detail.style.opacity = '1';

      var text = document.getElementById('text');
      text.style.transform = 'translateX(0)';
    }, 1000)
  },
  methods: {
    async fetchData() {
      const db = useFirestore()
      const storage = useFirebaseStorage();
      function getImageUrl(originUrl) {
        const fileRef = storageRef(storage, originUrl)
        const { url } = useStorageFileUrl(fileRef);
        return url;
      }
      const id = useRoute().params.id;
      const docSnap = await getDoc(doc(db, 'event', id));
      if (docSnap.exists()) {
        var post = docSnap.data();
        post.img = getImageUrl(post.image);
        post.lists.map(list => {
          var start = list.start.toDate();
          var end = list.end.toDate();
          list.timeString = `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}, ${start.getFullYear()} ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
          return list;
        })
        document.title = post.title + ' - event - Origin | 起源劇團';
        this.post = post;
      }
    }
  }
}
</script>

<style scoped>
#outer {
  height: 50vh;
  position: relative;
}

#content {
  height: 100%;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(4px) opacity(.4);
  -webkit-filter: blur(4px) opacity(.4);
}

#inner {
  width: 80vw;
  padding: 0 10vw 5vh 10vw;
  overflow-y: auto;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}

#event_title {
  transform: translateX(-100vw);
  transition: transform 1s ease 0s;
}

#event_detail {
  opacity: 0;
  transform: translateY(5vh);
  transition: opacity 1s ease 1s, transform 1s ease 1s;
}



#event_detail>div>a {
  color: #fff;
  text-decoration: none;
}

#event_detail img {
  margin-right: 5px;
}

#inner .hr {
  border-color: rgb(148, 148, 148);
  margin: 2vh auto;
}

#text {
  color: #fff;
  width: 86vw;
  margin: 8vh auto;
  line-height: 180%;
  transform: translateX(-100vw);
  transition: transform 1s ease 0s;
}

.event-bar {
  display: flex;
  height: 20px;
  margin-top: 1vh;
}

.event-bar>* {
  margin-right: 2vw;
}

.google {
  background-color: #fff;
  color: rgb(51, 51, 51);
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  text-decoration: none;
  height: 20px;
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 3px;
  font-family: PingFang SC, Helvetica Neue, Helvetica, STHeitiSC-Light, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

.google img {
  width: 14px;
  position: relative;
  top: 3px;
}
</style>
