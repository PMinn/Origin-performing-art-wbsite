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
    handleScroll: function (event) {
      console.log(event)
    }
  }
}
</script>

<style src="@/assets/css/blogList.css" scoped>

</style>
