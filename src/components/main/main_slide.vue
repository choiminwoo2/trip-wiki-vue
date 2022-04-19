<template>
    <!-- 사진 슬라이드 -->
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active slide_div">
                <img src="@/assets/main_img/trip_jejudo.png" class="d-block w-100 slide_img" @click="go('제주')">
            </div>
            <div class="carousel-item slide_div">
                <router-link class="nav-link" :to="{name:'Community'}">
                    <img src="@/assets/main_img/community.png" class="d-block w-100 slide_img">
                </router-link>
            </div>
            <div class="carousel-item slide_div">
                <router-link class="nav-link" :to="{name:'GalleryMain'}">
                    <img src="@/assets/main_img/gallery.png" class="d-block w-100 slide_img">
                </router-link>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <img class="carousel-control-prev-icon" src="@/assets/main_img/bxs-caret-left-circle.png" aria-hidden="true">
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <img class="carousel-control-next-icon" src="@/assets/main_img/bxs-caret-right-circle.png" aria-hidden="true">
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import router from '@/router';
export default {
    setup() {
        const store =useStore();
        const keyword = ref('');
        const search_main = ()=>{
            router.push({
                    name:'TripList',
                    query: {keyword: keyword.value}
                })
            store.dispatch('store_keyword', keyword.value)
          
                        }
        const go = (location) =>{
            router.push({
                name:'TripList',
                query: {
                    keyword: location
                }
            })
            store.dispatch('store_keyword', location)
        } 
        return{
            search_main, go, keyword
        }
    }

}
</script>

<style scoped>
    /* 슬라이드 */
    .slide_div, .active {
        overflow: hidden;
        text-align: center;
    }
    
    .slide_img {
        min-width: 100%;
        height: 500px;
        object-fit: cover;
    }

    .carousel-indicators {
        background-color:rgb(172, 151, 151);
        opacity: 0.5;
        border-radius: 100%;
    }

    a { 
        padding: 0;
    }

    .slide_img {
        transition-duration: 3s;
        transition-timing-function: ease-out;
    }

    .slide_img:hover {
        transition: transform 3s;
        transform: scale(1.2);
    }
</style>