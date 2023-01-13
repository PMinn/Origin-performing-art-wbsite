<template>
  <div id="content">
    <div v-for="post in eventList" v-bind:key="post.oid">
      <router-link class="anchor pointer li" data-load="false" :to="{ path: '/event/' + post.id }">
        <div class="ZH" v-bind:style="{ backgroundImage: 'url(\'' + post.img + '\')' }">{{ post.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref as storageRef } from 'firebase/storage'
import { useDatabase, useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { ref, query, orderByChild, startAfter, limitToFirst, get } from 'firebase/database'
import li from '@/assets/js/li.js';

export default {
  name: 'EventListView',
  data() {
    return {
      eventList: [],
      startIndex: -999,
      lastStartIndex: -999,
      inSearching: false
    }
  },
  beforeMount() {
    this.fetchBlog();
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(li, 1000);
  },
  unmounted: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchBlog() {
      this.inSearching = true;
      const database = useDatabase();
      const storage = useFirebaseStorage();
      function getImageUrl(originUrl) {
        const fileRef = storageRef(storage, originUrl)
        const { url } = useStorageFileUrl(fileRef);
        return url;
      }
      var order = query(ref(database, 'events'), orderByChild('sort'));
      var filter = query(order, startAfter(this.startIndex), limitToFirst(10));
      get(filter)
        .then(snapshot => {
          if (snapshot.exists()) {
            var data = snapshot.val();
            data = Object.keys(data).map(key => {
              var d = data[key];
              d.oid = key;
              d.img = getImageUrl(d.image);
              this.startIndex = Math.max(this.startIndex, d.sort);
              return d;
            })
            data.sort(function (a, b) {
              return a.sort - b.sort;
            });

            if (this.lastStartIndex == this.startIndex) {
              window.removeEventListener('scroll', this.handleScroll);
            }
            this.lastStartIndex = this.startIndex;
            this.eventList = this.eventList.concat(data);
            this.inSearching = false;
          } else {
            console.log("No data available");
            window.removeEventListener('scroll', this.handleScroll);
          }
        })
    },
    handleScroll: function () {
      li();
      if (!this.inSearching && (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - window.innerHeight)) {
        this.fetchBlog();
      }
    }
  }
}
</script>

<style  scoped>
.anchor {
  margin: 0;
}

#events {
  width: 600px;
  margin: 0 auto;
}

#events>div {
  margin: 3vh auto;
}

@media only screen and (max-width: 480px) {
  #events {
    width: 100vw;
  }

  #events>div {
    margin: 0;
  }
}
</style>
<style src="@/assets/css/li.css" scoped>

</style>
