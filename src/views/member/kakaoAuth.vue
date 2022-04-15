<template>
  <div v-if="loading">
      Loading
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import axios from '@/setting/axiossetting.js';
import router from '@/router';
export default {
    setup(){
        const loading = ref(true);
        const code =useRoute().query.code;
        const getAccessToken = async(code) => {
            const data = await(await axios.get(`kakaoLogin/${code}`)).data;
            usingId(data.id);
        }
        getAccessToken(code);
        

        const usingId = async(id) =>{
            const data = await(await axios.post(`authLogin/${id}`)).data;
            if(data == 1){
                router.push({
                    name : 'Home'
                });
            }else{
                console.log(data);
                //   router.push({
                // name: 'KakaJoinView',
                // params:{
                //     'id' : id
                // }
            //});
            }
        }
        return{
            loading,usingId
        }
    }
}
</script>

<style>

</style>