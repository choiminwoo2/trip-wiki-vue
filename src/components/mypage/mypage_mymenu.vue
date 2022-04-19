<template>
  <div class="container">
  <div class="btn btn-primary" @click="handleClick('I')" >내 정보</div>
  <div class="btn btn-primary" @click="handleClick('M')" >내 커뮤니티</div>  
  <div class="btn btn-primary" @click="handleClick('C')" >내 갤러리</div> 
</div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    setup(){
        const store = useStore();
        const handleClick = (menu) =>{
            store.dispatch('store_menu', menu);
        }
        return{
            handleClick
        }
    }
}
</script>

<style scoped>
.container{
    margin-top:80px;
}
</style>