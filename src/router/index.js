import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/member/LoginView.vue';
import JoinView from '@/views/member/JoinView.vue';
import MainPage from '@/views/main/MainPage.vue';
import MailAuth from '@/views/member/MailAuth.vue';
import MailAuthSucess from '@/views/member/MailAuthSucess.vue';
import Myinfo from '@/components/mypage/mypage_inform.vue';
import Myboardlist from '@/components/mypage/myBoard_list.vue'; 
import TripList from '@/views/trip/TripList.vue';
import CommunityView  from '@/views/community/community_list.vue';
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
    path: '/trip/mailAuth/:id',
    name: 'MailAuth',
    component: MailAuth
  },
  {
    path:'/trip/mailAuth/:authKey/:mail/:id',
    name: 'MailAuthSucess',
    component : MailAuthSucess
  },
  {
    path: '/trip/myInfo',
    name:'Myinfo',
    component: Myinfo
  },
  {
    path: '/trip/myBoardlist',
    name:'Myboardlist',
    component: Myboardlist
  }, 
  {
    path: '/trip/TripList',
    name: 'TripList',
    component: TripList
  },
  {
    path: '/trip/community',
    name: 'Community',
    component : CommunityView
  },
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
