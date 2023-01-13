<template>
    <div id="loading">
        <div>
            <div id="logo">
                <img src="@/assets/media/Logo.png" width="100" height="100" alt="" loading="eager">
            </div>
            <div id="circle">
                <img src="@/assets/media/load-circle.png" width="323" height="323" alt="" loading="eager">
            </div>
        </div>
    </div>
</template>

<script>
import LoadingPage from '@/assets/js/loading.js'
export default {
    name: 'LoadingComponent',
    mounted() {
        new LoadingPage(true)
    }
}
</script>

<style src="@/assets/css/loading.css" scoped>

</style>
