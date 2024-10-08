import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Gen from '@/views/gen.vue'
import Chat from '@/views/chat.vue'
import Jour from '@/views/journal.vue'
import Search from '@/views/search.vue'
import Tour from '@/views/tour.vue'
import Share from '@/views/ChatShare.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
	{ path: '/gen', name: 'gen', component: Gen },
	{ path: '/chat', name: 'chat', component: Chat },
	{ path: '/jour', name: 'jour', component: Jour },
	{ path: '/search', name: 'search', component: Search },
	{ path: '/tour', name: 'tour', component: Tour },
	{ path: '/share/:id', name: 'tour', component: Share },
  ]
})

export default router
