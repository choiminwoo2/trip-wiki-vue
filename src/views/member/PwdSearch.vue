<template>
  <div class="content-container">
      <div class="img-container">
       <router-link :to="{name:'Home'}"><img src="@/assets/logo.png"></router-link>
        </div>
      <form class="form-container" @submit.prevent="sendId">
          <div class="center-container">
              <h3>비밀번호 찾기</h3>
              <input v-model="input_id" class="form-control" placeholder="아이디 입력">
              <EmailBox />
               <input v-model="input_key" placeholder="인증 번호 입력" class="form-control" style="margin-bottom:5px; margin-top:18px;">
              <button class="btn btn-info btn-xs right-button" @Click="getKey">인증 번호 확인</button>
              <button class="btn btn-primary ">비밀번호 변경하기</button>
          </div>
      </form>
  </div>
</template>

<script>
import EmailBox from '@/components/member/emailBox.vue';
import { useStore } from 'vuex';
import { ref, watch } from '@vue/runtime-core';
import router from '@/router';
import axios from '@/setting/axiossetting.js';
export default {
    components:{
        EmailBox
    },
    setup(){
        const sendEmail = ref('');
        const store = useStore();
        const input_id = ref('');
        const input_key = ref('');
        let sendIdValue = '';

        const readKey = async() =>{
            const secrectKey = input_key.value;
            const id = input_id.value;
            const data = await(await axios.post(`SelectToFinder/${secrectKey}/${id}`)).data;
            if(data.result == 1){
               sendIdValue = data.id;
            }
        }
        const sendId = () =>{
                if(input_id.value == ''){
                    return;
                }
                if(sendEmail.value ==''){
                    return;
                }
                if(sendIdValue != ''){
                     router.push({
                    name : 'PasswordConverterPage',
                    params:{
                        id: input_id.value,
                        key: input_key.value
                    }
                })
                }
        }
        const getKey = () =>{
            readKey();
        }

        watch(input_id,()=>{
            store.dispatch('sendId',input_id.value);
        });
        
        watch(()=>store.state.sendMail.mail,()=>{
            sendEmail.value = store.state.sendMail.mail;
            console.log("sendEmail=" + sendEmail.value)
        })
        return{
            store,sendEmail,input_id,sendId,input_key,getKey,sendIdValue
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
        height:350px;
        width: 400px;
        margin : 0 auto;
        padding: 20px;
        .img{
            text-align: center;
        }
        a{
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