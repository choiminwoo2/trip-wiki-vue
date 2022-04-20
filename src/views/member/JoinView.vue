<template>
  <div class="join-container">
    <router-link :to="{name:'Home'}"><img src="@/assets/logo.png"></router-link>
    <MemberJoin/>
  </div>
</template>

<script>
import MemberJoin from '@/components/member/member_join.vue';
export default {
    components :{
        MemberJoin
    }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width:1024px){
  .join-container{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin : 0 auto;
    max-width: 1100px;
    justify-content: center;
    justify-items: center;
      padding-top:100px;
  }
  img{
    position: relative;
    max-width:200px;
    max-height: 200px;
    margin: 0 auto;
    transform: translateX(3px);
  }
  a{
    text-align: center;
  }
}
/* 태블릿 pc~ */
/* 가로의 길이가 768에서 1023px 사이 */
@media screen and (min-width: 768px) and (max-width:1023px) {
   .join-container{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin : 0 auto;
    max-width: 70%;
    justify-content: center;
    justify-items: center;
    transform: translateX(-10px);
      padding-top:100px;
  } 
   img{
    position: relative;
    max-width:200px;
    max-height: 200px;
    margin: 0 auto;
  }
  a{
    text-align: center;
  }
}
/* 모바일~*/
/* 가로의 길이가  767 이하*/
@media screen and (max-width:767px){
   .join-container{
   display: flex;
    flex-direction: column;
    min-height: 100%;
    margin : 0 auto;
    justify-content: center;
    justify-items: center;
    min-width: 300px;
    max-width: 600px;
      padding-top:100px;
  }
   img{
    position: relative;
    max-width:125px;
    max-height: 125px;
    margin: 0 auto;
  }
  a{
    text-align: center;
  }
}
</style>