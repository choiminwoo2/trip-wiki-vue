<template>
  <div class="container">
  <div class="btn btn-primary" @click="handleClick('I')" >내 정보</div>
  <div class="btn btn-primary" @click="handleClick('M')" >내 게시물</div> 
  <div class="btn btn-primary" @click="handleClick('F')" >좋아요 한 게시물 확인</div> 
  <div class="btn btn-primary" @click="handleClick('C')" >내 댓글</div> 
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

<style>

</style>