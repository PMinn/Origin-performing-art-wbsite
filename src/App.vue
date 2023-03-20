<template>
  <div>
    <LoadingComponent v-bind:hidden="!loading"></LoadingComponent>
    <CursorComponent></CursorComponent>
    <NavComponent></NavComponent>
    <router-view v-on:setLoading="setLoading"></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script type="text/javascript">
import { version } from "../package.json";

import LoadingComponent from '@/components/LoadingComponent';
import NavComponent from '@/components/NavComponent';
import CursorComponent from '@/components/CursorComponent';
import FooterComponent from '@/components/FooterComponent';

export default {
  name: 'App',
  components: {
    LoadingComponent,
    NavComponent,
    CursorComponent,
    FooterComponent
  },
  data() {
    return {
      loading: true
    }
  },
  metaInfo: {
    changed(metaInfo) {
      firebase.analytics().setCurrentScreen(metaInfo.title);
      firebase.analytics().logEvent("page_view");
      firebase.analytics().logEvent("screen_view", {
        screen_name: metaInfo.title,
        app_version: version
      });
    }
  },
  mounted() {
    this.init();
    window.addEventListener('load', () => {
      setTimeout(() => this.loading = false, 500);
    });
  },
  methods: {
    setLoading(isLoading) {
      this.loading = isLoading;
    },
    init() {
      var script = document.createElement('script');
      script.type = "module";
      script.src = "https://cdn.jsdelivr.net/gh/pminn/banner/src/banner.mjs";
      document.head.appendChild(script);
    }
  }
}
</script>
<style src="@/assets/css/init.css"></style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&family=Zen+Kurenaido&display=swap');

.ENG {
  font-family: 'Zen Kurenaido', sans-serif;
}

.ZH {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>