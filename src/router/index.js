import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import BlogListView from '../views/BlogListView.vue';
import BlogView from '../views/BlogView.vue';
import EventListView from '../views/EventListView.vue';
import EventView from '../views/EventView.vue';
import AdminView from '../views/admin/AdminView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import PWAView from '../views/PWAView.vue';

import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "../firebase.js";

const routes = [{
  path: '/',
  alias: ['/index.html'],
  name: 'home',
  component: HomeView,
  meta: {
    title: 'Origin | 起源劇團',
    nav: false,
    dynamicPath: false
  }
}, {
  path: '/about',
  name: 'about',
  component: AboutView,
  meta: {
    title: '關於我們 - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}, {
  path: '/contact',
  name: 'contact',
  component: ContactView,
  meta: {
    title: '聯絡我們 - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}, {
  path: '/blog',
  name: 'blogList',
  component: BlogListView,
  meta: {
    title: 'blog - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}, {
  path: '/blog/:id/:title?',
  name: 'blog',
  component: BlogView,
  meta: {
    title: 'blog - Origin | 起源劇團',
    nav: false,
    dynamicPath: true
  }
}, {
  path: '/event',
  name: 'eventList',
  component: EventListView,
  meta: {
    title: 'event - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}, {
  path: '/event/:id/:title?',
  name: 'event',
  component: EventView,
  meta: {
    title: 'event - Origin | 起源劇團',
    nav: false,
    dynamicPath: true
  }
}, {
  path: '/PWA',
  name: 'PWA',
  component: PWAView,
  meta: {
    title: 'PWA - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}, {
  path: '/admin',
  name: 'admin',
  component: AdminView,
  meta: {
    title: 'admin - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}, {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFoundView,
  meta: {
    title: '404 - Origin | 起源劇團',
    nav: true,
    dynamicPath: false
  }
}]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }
})

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title;
  if (to.meta.nav) window.document.body.classList.add('nav');
  else window.document.body.classList.remove('nav');
  if (!to.meta.dynamicPath) {
    logEvent(firebaseAnalytics, "screen_view", {
      screen_name: to.meta.title
    })
  }
  next();
})

export default router;