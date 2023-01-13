<template>
  <div id="content">
    <router-link v-for="post in blogList" v-bind:key="post.oid" class="anchor pointer"
      :to="{ path: '/blog/' + post.id }">
      <div class="li">
        <div>
          <img v-bind:src="post.img" data-rendered="false" alt="">
        </div>
        <div class="content_text">
          <div class="content_bar"></div>
          <h4>{{ post.title }}</h4>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ref as storageRef } from 'firebase/storage'
import { useDatabase, useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { ref, query, orderByChild, startAt, limitToFirst, get } from 'firebase/database'

export default {
  name: 'BlogListView',
  data() {
    return {
      blogList: [],
      startIndex: 0,
    }
  },
  beforeMount() {
    this.fetchBlog();
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchBlog() {
      const database = useDatabase();
      const storage = useFirebaseStorage();
      function getImageUrl(originUrl) {
        const fileRef = storageRef(storage, originUrl)
        const { url } = useStorageFileUrl(fileRef);
        return url;
      }
      var order = query(ref(database, 'blogs'), orderByChild('date'));
      var filter = query(order, startAt(this.startIndex), limitToFirst(10));
      get(filter)
        .then(snapshot => {
          var data = snapshot.val();
          data = Object.keys(data).map(key => {
            var d = data[key];
            d.oid = key;
            d.img = getImageUrl(d.img);
            return d;
          })
          this.startIndex += 10;
          this.blogList = data;
        })
    },
    handleScroll: function () {
      // console.log(event)
    }
  }
}
</script>

<style scoped>
#content {
  width: calc(100vw - 40px);
  max-width: 600px;
  margin: 0 auto;
}

.li {
  background-color: #1d1d1d;
  margin: 2vh auto;
}

.li>div {
  max-height: 20vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.li>div>img {
  width: 100%;
}

.li>.content_text {
  padding: 30px;
  width: auto;
  position: relative;
  color: #fff;
  display: block;
}

.li>.content_text>h4 {
  width: 100%;
}

.li .content_bar {
  width: 40px;
  height: 1px;
  background-color: var(--second-color);
}
</style>
