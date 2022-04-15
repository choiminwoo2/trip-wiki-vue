<template>
  <div class="join-container">
      <h1>처음 로그인하신 고객님은 회원가입에 동의하셔야 합니다.</h1>
      <button class="btn btn-info" @click="kakaoJoin">회원 가입에 동의하기</button>
  </div>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import { useRoute } from 'vue-router'
import router from '@/router';

export default {
    setup(){
        const id = useRoute().params.id;
        const callAxiosJoin = async() => {
            console.log(id); 
            const data= await (await axios.post(`kokaoJoins/${id}`)).data;
            if(data ==1){
                router.push({
                    name: 'Home'
                })
            }
        }

        const kakaoJoin = () =>{
            callAxiosJoin();
        }
        return{
            kakaoJoin
        }
    }
}
</script>

<style lang="scss" scoped>
    .join-container{
        text-align: center;
    }


</style>