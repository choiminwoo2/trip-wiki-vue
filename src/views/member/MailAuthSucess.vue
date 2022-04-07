<template>
  <div v-if="loading" class="Loading-container">
      <h1>Loading<i class='bx bxs-color'></i></h1>
  </div>
  <div class="mail-container" v-else>
     <h1>메일 인증이 완료 되었습니다.</h1>
    <hr>
    <div>
    <h4>{{timer}} 후 메인페이지로 이동합니다.</h4>
    </div>
  </div>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import { useRoute } from 'vue-router'
import router from '@/router';
import { ref } from '@vue/reactivity';

export default {
    setup(){
        const mail = useRoute().params.mail;
        const authKey =useRoute().params.authKey;
        const timer = ref(3);
        const loading = ref(true);
        const id = useRoute().params.id;
      
        const getAuthSucess = async() =>{
            const data = await(await axios.post(`createUserAuth/${mail}/${authKey}/${id}`)).data;
            loading.value=false;
            if(data > 0){
                var interval = setInterval(() => {
                
                    if(timer.value >= 1){
                        timer.value = timer.value -1;
                }else{
                     clearInterval(interval);   
                      router.push({
                        name:'Home'
                    })
                }
                }, 1000);
                
            }
        }
        getAuthSucess();
        return{
            getAuthSucess,timer,loading
        }
    }
}
</script>

<style lang="scss" scoped>


  .mail-container{
        margin: 0 auto;
        margin-top:50px;
        width:900px;
        
        h1,h4{
            width: inherit;
            text-align: center;
        }
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