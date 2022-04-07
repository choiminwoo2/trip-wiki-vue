<template>
  <div v-if="loading" class="Loading-container">
      <h1>Loading<i class='bx bxs-color'></i></h1>
  </div>
  <div class="mail-container" v-else>
     <h1>메일 인증시 사이트를 이용하실 수 있습니다.</h1>
    <hr>
    <div>
    <h4><a href="https://www.google.com/intl/ko/gmail/about/">인증하러 가기</a></h4>
    </div>
  </div>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import { ref } from '@vue/reactivity';
import {useRoute} from 'vue-router'
export default {
    setup(){
        const loading = ref(true);
        const id = useRoute().params.id;
        const mailAuth = async() =>{
            try{
                const data = await(await axios.get(`createMailAuth/${id}`)).data;
                console.log(data);
                loading.value=false;
                console.log(data);
            }catch(err){
                console.log(err);
            }
            
        }
        mailAuth();
        return{
            loading,mailAuth
        }
    }
}
</script>

<style lang="scss" scoped>
    @keyframes AnimationIcon {
        0% {transform: rotate(90deg);}
        25% {transform: rotate(90deg);}
        50% {transform: rotate(90deg);}
        100% {transform: rotate(90deg);}
    }
    .mail-container{
        margin: 0 auto;
        margin-top:50px;
        width:900px;
        h1{
            background-color: aqua;
            padding : 10px 20px;
        }
        div{
            width: inherit;
            text-align: center;
        }
    }
    .bx{
        animation: AnimationIcon 2s ease-in 1s infinite running fill-mode;
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
