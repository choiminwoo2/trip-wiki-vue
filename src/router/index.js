import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/member/LoginView.vue';
import JoinView from '@/views/member/JoinView.vue';
import MainPage from '@/views/main/MainPage.vue';
import MailAuth from '@/views/member/MailAuth.vue';
import GalleryMain from '@/views/gallery/galleryMain.vue';
import GalleryWrite from '@/views/gallery/galleryWrite.vue';
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
    path: '/trip/mailAuth/:id',
    name: 'MailAuth',
    component: MailAuth
  },
  {
    path: '/trip/gallery',
    name: 'GalleryMain',
    component: GalleryMain
  },  
  {
    path: '/trip/galleryWrite',
    name: 'GalleryWrite',
    component: GalleryWrite
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
