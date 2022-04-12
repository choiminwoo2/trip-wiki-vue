import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/member/LoginView.vue';
import JoinView from '@/views/member/JoinView.vue';
import MainPage from '@/views/main/MainPage.vue';
import MailAuth from '@/views/member/MailAuth.vue';
import MailAuthSucess from '@/views/member/MailAuthSucess.vue';
import PwdSearch from '@/views/member/PwdSearch.vue';
import IdSearch from '@/views/member/IdSearch.vue';
import Myinfo from '@/components/mypage/mypage_inform.vue';
import TripList from '@/views/trip/TripList.vue';
import CommunityView  from '@/views/community/community_list.vue';
import CommunityWrite from '@/views/community/community_write.vue';
import GalleryMain from '@/views/gallery/galleryMain.vue';
import GalleryWrite from '@/views/gallery/galleryWrite.vue';
import GalleryDetail from '@/views/gallery/galleryDetail.vue';
import GalleryModify from '@/views/gallery/galleryModify.vue';

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
    path: '/trip/TripList',
    name: 'TripList',
    component: TripList
  },
  {
    path: '/trip/community',
    name: 'Community',
    component : CommunityView
  },
  {
    path: '/trip/galleryWrite',
    name: 'GalleryWrite',
    component: GalleryWrite
  }
  ,
  {
    path: '/trip/galleryDetail',
    name: 'GalleryDetail',
    component: GalleryDetail
    },
    {
    path: '/trip/galleryModify',
    name: 'GalleryModify',
    component: GalleryModify
    },
  {
    path : '/trip/PwdSearch',
    name : 'PwdSearch',
    component : PwdSearch
  },
  {
    path : '/trip/Idsearch',
    name : 'IdSearch',
    component : IdSearch
  },
  {
    path: '/trip/communityWrite',
    name: 'CommunityWrite',
    component : CommunityWrite
  }
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
