import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/member/LoginView.vue';
import JoinView from '@/views/member/JoinView.vue';
import MainPage from '@/views/main/MainPage.vue';
import MailAuth from '@/views/member/MailAuth.vue';
import MailAuthSucess from '@/views/member/MailAuthSucess.vue';
import PwdSearch from '@/views/member/PwdSearch.vue';
import IdSearch from '@/views/member/IdSearch.vue';
import Myinfo from '@/views/mypage/mypage_inform.vue';
import TripList from '@/views/trip/TripList.vue';
import TripDetail from '@/views/trip/TripDetail.vue';
import CommunityView  from '@/views/community/community_list.vue';
import GalleryMain from '@/views/gallery/galleryMain.vue';
import GalleryWrite from '@/views/gallery/galleryWrite.vue';
import GalleryDetail from '@/views/gallery/galleryDetail.vue';
import GalleryModify from '@/views/gallery/galleryModify.vue';
import PasswordConverterPage from '@/views/member/PasswordConverterPage.vue';
import KakaoAuth from '@/views/member/kakaoAuth.vue';


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
    path: '/trip/TripDetail/:contentId',
    name: 'TripDetail',
    component: TripDetail
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
    path: '/trip/galleryDetail/:num',
    name: 'GalleryDetail',
    component: GalleryDetail
    },
    {
    path: '/trip/galleryModify/:num',
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
    path: '/trip/PasswordConverter/:id/:key',
    name : 'PasswordConverterPage',
    component : PasswordConverterPage
  },
  {
    path: '/trip/auth/',
    name : 'KakaoAuth',
    component : KakaoAuth
  },
  {
    path: '/trip/TripDetail/:contentId',
    name: 'TripDetail',
    component: TripDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
