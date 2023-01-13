<template>
  <div>
    <LoadingComponent></LoadingComponent>
    <CursorComponent></CursorComponent>
    <NavComponent></NavComponent>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script type="text/javascript">
import LoadingComponent from '@/components/LoadingComponent'
import NavComponent from '@/components/NavComponent'
import CursorComponent from '@/components/CursorComponent'
import FooterComponent from '@/components/FooterComponent'

export default {
  name: 'App',
  components: {
    LoadingComponent,
    NavComponent,
    CursorComponent,
    FooterComponent
  },
  mounted() {
    var styleSheet = document.createElement('style');
    styleSheet.innerText = "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&family=Zen+Kurenaido&display=swap');";
    document.head.appendChild(styleSheet);
  }
}
</script>

<style src="@/assets/css/init.css">

</style>
<style>
.ENG {
  font-family: 'Zen Kurenaido', sans-serif;
}

.ZH {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>