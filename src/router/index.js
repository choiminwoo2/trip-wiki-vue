import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/member/LoginView.vue';
import JoinView from '@/views/member/JoinView.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/trip/join',
    name: 'Join',
    component : JoinView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
