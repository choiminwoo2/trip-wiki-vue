<template>
  <div v-if="loading" class="Loading-container">
      <h1>Loading<i class='bx bxs-color'></i></h1>
  </div>
   <div class="content-container" v-else>
      <div class="img-container">
       <router-link :to="{name:'Home'}"><img src="@/assets/logo.png"></router-link>
        </div>
      <form class="form-container">
          <div class="center-container">
              <h3>비밀번호 변경</h3>
               <input type="password"
                v-model.trim="input_password"
                 placeholder="변경할 비밀번호를 입력해주세요."
                  class="form-control first"
                   ref="f2"
                   autocomplete="new-password">
               <input type="password" v-model.trim="passwordChk" placeholder="비밀번호를 다시 입력 해주세요." class="form-control second" ref="f3" autocomplete="new-password">
               <span>{{password_message}}</span>
              <button class="btn btn-primary clickBtn" @click.prevent="goLogin">비밀번호 변경하기</button>
            
          </div>
      </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import axios from '@/setting/axiossetting.js';
import { watch } from '@vue/runtime-core';
import router from '@/router';
export default {
  setup(){
    const id = useRoute().params.id;
    const key = useRoute().params.key;
    const input_password=ref('');
    const passwordChk = ref('');
    const password_message = ref('');
    const f2 = ref(null);
    const f3 = ref(null);
    const updatePassword= async() =>{
      const password = input_password.value;
      const data = await(await axios.post(`users/password/${id}/${password}`)).data;
      console.log(data);
      if(data ==1){
        alert("비밀번호를 변경했습니다.");
        router.push({
          name:'Login'
        })
      }
    }
    const goLogin = () =>{
      if(input_password.value == ''){
        password_message.value ="비밀번호를 입력 확인해주세요.";
        f2.value.focus();
        return;
      }
      if(passwordChk.value == ''){
        password_message.value="비밀번호 입력을 확인해주세요.";
        f3.value.focus();
        return;
      }
      if(input_password.value == passwordChk.value){
        updatePassword();
      }else{
        password_message.value="비밀번호가 같지 않습니다.";
      }
    }
    //로그인 처리 end
 watch(input_password,()=>{
            const pattern = /^[0-9a-zA-Z]{5,20}$/;
            if(!pattern.test(input_password.value)){
                password_message.value="패스워드는 5~20자로 숫자,영어만 사용해주세요";
            }else{
             password_message.value="";
            }
        })

    const loading = ref(true);
    const auth = async() =>{
      const secrectKey = key;
      const data = await(await axios.post(`SelectToFinder/${secrectKey}/${id}`)).data;
            if(data.result == 1){
              loading.value=false;
            }
    }//auth 인증시 페이지 보여주기.
    auth();
    return{
      loading,goLogin,input_password,passwordChk,password_message,f2,f3
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
        height:280px;
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
            input:nth-child(3){
              margin-bottom: 0px;
            }
            h3{
                margin : 20px 0;
                font-weight: bold;
             }
            .btn{
                border-radius: 5px !important;
                font-size: 12px !important;
                margin-top: 20px !important;
            }
            .btn-xs{
                width: 85px !important;
                height:30px !important;  
            }
            
            .btn-primary{
                width: 100% !important;
            }
        }
    }
}
input{
    margin-bottom: 20px;
    padding : 2px 5px;
}
  .Loading-container{
        width: 100%;
        min-height: 100%;
        max-height:100%;
        height:100%;
        text-align: center;
        margin-top:200px;
        
    }

</style>