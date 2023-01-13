import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'

import VueSplide from '@splidejs/vue-splide';

createApp(App).use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
}).use(router).use(VueSplide).mount('#app')