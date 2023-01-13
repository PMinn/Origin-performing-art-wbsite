<template>
  <div>
    <CursorComponent></CursorComponent>
    <NavComponent></NavComponent>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script type="text/javascript">
import NavComponent from '@/components/NavComponent'
import CursorComponent from '@/components/CursorComponent'
import FooterComponent from '@/components/FooterComponent'

import loadFonts from '@/assets/js/fonts.js'

export default {
  name: 'App',
  components: {
    NavComponent,
    CursorComponent,
    FooterComponent
  },
  created() {
    console.log('created');
  },
  setup() {
    console.log('setup');
    return {
    }
  },
  mounted() {
    console.log('mounted');
    loadFonts()
  },
  unmounted() {
    console.log('unmounted')
  }
}
</script>

<style src="@/assets/css/init.css">

</style>