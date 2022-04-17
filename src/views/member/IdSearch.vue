<template>
 <div class="content-container">
      <div class="img-container">
       <router-link :to="{name:'Home'}"><img src="@/assets/logo.png"></router-link>
        </div>
      <form class="form-container" @submit.prevent="sendId">
          <div class="center-container">
              <h3>아이디 찾기</h3>
              <EmailBox />
              <button class="btn btn-primary " style="margin-top:10px;">비밀번호 확인하러 가기</button>
          </div>
      </form>
  </div>
</template>

<script>
import EmailBox from '@/components/member/emailBox.vue'
export default {
    components: {
        EmailBox
    },
    setup(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes opacityContainer {
    0% {opacity: 0;}
    25% { opacity: 0.25;}
    50% {opacity: 0.5;}
    75% { opacity: 0.75;}
    100% {opacity: 1;}
}
.content-container::-webkit-scrollbar{
    display: none;
}
.content-container{
    animation: 1s ease-in 0.5s opacityContainer;
    width:100%;
    height: 95%;
    margin : 0 auto;
    .img-container{
        display: flex;
        justify-content: center;
        padding-bottom: 10px;
    }
    padding-top:50px;
    .form-container{
        margin-top:30px;
        border : 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        height:200px;
        width: 400px;
        margin : 0 auto;
        padding: 20px;
        .img{
            text-align: center;
        }
        .center-container{
            width:300px;
            height:300px;
            margin:0 auto;
            margin-top:20px;
            h3{
                margin : 20px 0;
                font-weight: bold;
            }
            .btn-group{
                display: grid;
                grid-template-columns: 65% 35%;
                column-gap: 20px;
                .btn{
                    border-radius: 5px !important;
                    font-size: 12px !important;
                }
                .btn-xs{
                    width: 85px !important;
                    height:30px !important;  
                }
            }
            .right-button{
                float:right !important;
                font-size: 12px !important;
                width: 125px !important;
                    height:30px !important;
                    margin-bottom: 12px;
            }
            .btn-primary{
                width: 100% !important;
            }
        }
    }
}
input{
    margin-bottom: 18px;
    padding : 2px 5px;
}
</style>