<template>
    <header>
        <!-- 로그인/ 로그아웃 nav -->
        <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
            <div class="container-fluid" id="first_nav">
                 <ul class="navbar-nav ms-md-auto" v-if="parent_id" >
                    <li class="nav-link logout-hover" @click="logout" >{{parent_id}}님 (로그아웃)</li>
                    <li><router-link to="#" class="nav-link" v-show="parent_id === 'admin'">관리자페이지</router-link></li>
                    <li><router-link to="#" class="nav-link" v-show="!parent_id === 'admin'">마이페이지</router-link></li>
                </ul>
                <ul class="navbar-nav ms-md-auto" v-else >
                    <li><router-link :to="{name:'Login'}" class="nav-link">로그인</router-link></li>
                    <li><router-link :to="{name:'Join'}" class="nav-link">회원가입</router-link></li>
                </ul>
            </div>
        </nav>
        <!-- 로고 및 검색바 -->
        <div class="row align-items-center" id="middle_header">
            <div class="col-lg-5 col-md-12" id="logo_div">
                <router-link :to="{name:'Home'}">
                    <img src="@/assets/logo_tripWiki.png" class="float-end" id="logo">
                </router-link>  
            </div>
            <div class="col-lg-7 col-md-12">
                <div>
                    <form class="d-flex">
                        <input class="form-control me-sm-2" type="text" style="width:500px" placeholder="Search">
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
        <!-- 포토/ 여행지/ 커뮤니티 nav -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu_nav" aria-controls="menu_nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="menu_nav">
                    <ul class="navbar-nav" id="category">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name:'GalleryMain'}"> 포토갤러리 </router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <router-link class="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false"> 여행지 살펴보기 </router-link>
                            <div class="dropdown-menu">
                                <router-link class="dropdown-item" :to="{name:'TripList'}">&nbsp;서울 </router-link>
                                <router-link class="dropdown-item" to="#">&nbsp;경기/ 인천 </router-link>
                                <router-link class="dropdown-item" to="#">&nbsp;대전/ 충청/ 강원 </router-link>
                                <router-link class="dropdown-item" to="#">&nbsp;부산/ 대구/ 경상 </router-link>
                                <router-link class="dropdown-item" to="#">&nbsp;광주/ 전라/ 제주 </router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="#"> 커뮤니티 </router-link>
                        </li>
                    </ul> 
                </div>
            </div>
        </nav>        
    </header>
</template>

<script>

import cookies from 'vue-cookies';
// import { useStore } from 'vuex';
// import router from '@/router';
// import { ref } from '@vue/reactivity';
import axios from '@/setting/axiossetting.js'
import router from '@/router';
export default {
    props:{
        parent_id:{
            type:String,
            required:true
        }
    },
    emits:['parent_getSession'],
    setup(props,context){
        console.log("props ID=" + props.parent_id);
        context.emit("parent_getSession");
        // const store =useStore();
        // const shownav = ref(false); 
        // shownav.value = store.state.nav_show;
        const logout = async() =>{
            console.log("logout")
            //context.emit("parent_getSession",'logout');
            cookies.remove(props.parent_id);
            const data = await(await axios.post('users/logout')).data;
             console.log(data);
            // if(data){
            //     console.log("shownave.value=" + !shownav.value)
            //     console.log("props 삭제 이후 =" +props.parent_id);
            //     store.dispatch('navShow',false);
            //     shownav.value=false;
                 router.push({
                    name:'Login'
                 })
                
            // }else{
            //     console.log("로그아웃 실패.");
            // }
        }  
        return{
            logout
        }
    }
}
</script>

<style scoped>
    #middle_header {
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 0px;
        margin-left: 0px;
    }
    .logout-hover:hover{
        cursor: pointer;
        font-size: 18px;
        transition: 0.5s font-size;
    }
    #logo {
        width: 200px;
        height: 70px;
    }

    #first_nav {
        height: 18px;
    }

    #category {
        font-size: 18px;
        font-weight: bold;
    }

    #category > li {
        margin-left: 100px;
        margin-right: 100px;
    }

    .navbar-dark .navbar-nav .nav-link {
        color: white;
    }

    .dropdown-menu {
        width: 180px;
        border-style: solid;
        border-width: 3px;
        border-radius: 20px;
        border-color: rgb(138, 132, 132);
    }

    .dropdown-item {
        font-weight: bold;
    }

    @media (min-width: 992px) {
        .navbar-expand-lg .navbar-nav .nav-link {
            padding-right: 0rem;
            padding-left: 0rem;
        }
        #logo {
            max-width: 300px;
        }
    }

    @media (max-width: 991px) {
        #logo_div {
            width: 400px;
        }
        #logo {
            max-width: 300px;
        }
    }

    @media (max-width: 575px) {
        #first_nav {
            height: 90px;
        }
        #logo {
            display:none;
        }
    }
</style>