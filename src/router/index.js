import { createRouter, createWebHistory } from 'vue-router'
import ChatViewer from '@/components/ChatViewer.vue'

const routes = [
  {
    path: '/chat-viewer',
    name: 'ChatViewer',
    component: ChatViewer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router