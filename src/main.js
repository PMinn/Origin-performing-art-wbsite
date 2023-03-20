import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp, firebaseAnalytics } from './firebase'

import VueSplide from '@splidejs/vue-splide';

const app = createApp(App);

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
}).use(router).use(VueSplide).mount('#app');

app.config.globalProperties.$analytics = firebaseAnalytics;
console.log(app.config)