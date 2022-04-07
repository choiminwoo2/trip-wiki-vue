import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/member/LoginView.vue';
import JoinView from '@/views/member/JoinView.vue';
import MainPage from '@/views/main/MainPage.vue';
import GalleryMain from '@/views/gallery/galleryMain.vue';
import MailAuth from '@/views/member/MailAuth.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage
  },
  {
    path: '/trip/join',
    name: 'Join',
    component : JoinView
  },
  {
    path: '/trip/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/trip/gallery',
    name: 'GalleryMain',
    component: GalleryMain
  },  
  {
    path: '/trip/mailAuth/:id',
    name: 'MailAuth',
    component: MailAuth
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
