import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import BlogListView from '../views/BlogListView.vue'
import BlogView from '../views/BlogView.vue'
import EventListView from '../views/EventListView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Origin | 起源劇團',
      nav: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: '關於我們 - Origin | 起源劇團',
      nav: true
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: '聯絡我們 - Origin | 起源劇團',
      nav: true
    }
  },
  {
    path: '/blog',
    name: 'blogList',
    component: BlogListView,
    meta: {
      title: 'blog - Origin | 起源劇團',
      nav: true
    }
  },
  {
    path: '/blog/:id',
    name: 'blog',
    component: BlogView,
    meta: {
      title: 'blog - Origin | 起源劇團',
      nav: false
    }
  },
  {
    path: '/event',
    name: 'eventList',
    component: EventListView,
    meta: {
      title: 'event - Origin | 起源劇團',
      nav: true
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if (to.meta.nav) window.document.body.classList.add('nav');
  else window.document.body.classList.remove('nav');
  next()
})
export default router
