<template>
  <div id="page">
    <div id="main">
      <div id="main_img">
        <img v-bind:src="blog.img" alt="">
      </div>
      <div class="main-text">
        <h6 class="ENG" id="blog_date">{{ `${blog.date.toDate().getFullYear()} / ${blog.date.toDate().getMonth() + 1} /
        ${blog.date.toDate().getDate()}` }}</h6>
        <h1 class="ZH" id="blog_title">{{ blog.title }}</h1>
        <div class="hr" style="border-color: rgb(168, 168, 168);"></div>
      </div>
    </div>
    <div id="content" v-html="blog.html"></div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref as storageRef } from 'firebase/storage'
import { useFirestore, useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { doc, getDoc } from 'firebase/firestore'

export default {
  name: 'BlogView',
  beforeMount() {
    this.fetchData();
  },
  data() {
    return {
      blog: {
        date: {
          toDate() {
            return new Date()
          }
        },
        title: '',
        html: '',
        img: ''
      }
    }
  },
  mounted() {
    var main_img = document.querySelector('#main_img img');
    function inviewAni() {
      document.querySelectorAll('#content>*:not(.show)').forEach(item => {
        if (window.pageYOffset + window.innerHeight > item.offsetTop - item.offsetHeight / 2) {
          item.classList.add('show');
        }
      })
    }
    setTimeout(() => {
      var width = main_img.width;
      var height = main_img.height;
      if (height < width) {
        main_img.style.width = 'auto';
        main_img.style.height = '100%';
      } else {
        main_img.style.height = 'auto';
        main_img.style.width = '100%';
      }
      inviewAni();
      function scrollChangeWidth() {
        var imgHight = window.innerHeight * 0.4;
        var scrollHeight = window.pageYOffset;
        var scrollRate = scrollHeight / imgHight;
        main_img.style.width = `${100 + scrollRate * 100}%`;
      }
      function scrollChangeHeight() {
        var imgHight = window.innerHeight * 0.4;
        var scrollHeight = window.pageYOffset;
        var scrollRate = scrollHeight / imgHight;
        main_img.style.height = `${100 + scrollRate * 100}%`;
      }

      if (height < width) {
        main_img.style.width = 'auto';
        document.addEventListener('scroll', () => {
          scrollChangeHeight();
          inviewAni();
        })
      } else {
        main_img.style.height = 'auto';
        document.addEventListener('scroll', () => {
          scrollChangeWidth();
          inviewAni();
        })
      }
    }, 1000);
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
      const docSnap = await getDoc(doc(db, 'blog', id));
      if (docSnap.exists()) {
        var blog = docSnap.data();
        blog.img = getImageUrl(blog.img);
        document.title = blog.title + ' - blog - Origin | 起源劇團';
        this.blog = blog;
      }

    }
  }
}
</script>

<style scoped>
#main {
  width: 100vw;
  max-width: 600px;
  height: 40vh;
  color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.main-text {
  width: 80%;
  z-index: 1;
}

#blog_date,
#blog_title {
  margin: 1vh 0;
}

#blog_date {
  color: gray;
}

#main_img {
  width: 100%;
  height: 40vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

#main_img>img {
  /* height: auto;
    width: 100%; */
  filter: brightness(0.8);
  -webkit-transition: all 0.1s ease 0s;
  transition: all 0.1s ease 0s;
}

#content {
  width: 80vw;
  max-width: 600px;
  padding: 2vh 10vw;
  margin: 0 auto;
  color: #fff;
  font-size: 15px;
  line-height: 28px;
}

#content img {
  width: 100%;
}

#content>* {
  width: 100%;
  margin: 3vh 0;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1.5s ease 0s, transform 1.5s ease 0s;
}

#content>*.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
