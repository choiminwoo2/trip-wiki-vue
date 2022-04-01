<template>
  <div class="login-Container">
    <img src="@/assets/logo.png">
    <LoginPages/>

  </div>
</template>

<script>
import LoginPages from '@/components/member/loginPages.vue'
export default {
    components: {
      LoginPages
    }
}
</script>

<style leng="scss" scoped>

 @media screen and (min-width:1024px){
  .login-Container{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin : 0 auto;
    max-width: 1100px;
    justify-content: center;
    justify-items: center;
    margin-top:225px;

  }
  img{
    position: relative;
    max-width:200px;
    max-height: 200px;
    margin: 0 auto;
    transform: translateX(-25px);
  }
}
/* 태블릿 pc~ */
/* 가로의 길이가 768에서 1023px 사이 */
@media screen and (min-width: 768px) and (max-width:1023px) {
   .login-Container{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin : 0 auto;
    max-width: 70%;
    justify-content: center;
    justify-items: center;
    margin-top:150px;
  } 
   img{
    position: relative;
    max-width:200px;
    max-height: 200px;
    margin: 0 auto;
    transform: translateX(-15px);
  }
  .header{
  height:200px;
}

}
/* 모바일~*/
/* 가로의 길이가  767 이하*/
@media screen and (max-width:767px){
   .login-Container{
   display: flex;
    flex-direction: column;
    min-height: 100%;
    margin : 0 auto;
    justify-content: center;
    justify-items: center;
    min-width: 300px;
    max-width: 600px;
   margin-top:150px;

  }
   img{
    position: relative;
    max-width:125px;
    max-height: 125px;
    margin: 0 auto;
    transform: translateX(-10px);
  }
  .header{
  height:150px;
}
}
</style>