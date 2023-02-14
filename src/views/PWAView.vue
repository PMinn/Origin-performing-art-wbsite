<template>
    <div></div>
</template>

<script>
export default {
    name: 'PWAView',
    beforeMount() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js");
        }
    }
}
</script>

<style scoped>

</style>
