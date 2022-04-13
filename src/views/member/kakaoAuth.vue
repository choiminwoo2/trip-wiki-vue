<template>
  <div v-if="loading">
      Loading
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import axios from '@/setting/axiossetting.js';
export default {
    setup(){
        const loading = ref(true);
        const code =useRoute().query.code;
        const getAccessToken = async(code) => {
            const data = await(await axios.get(`kakaoLogin/${code}`)).data;
            console.log(data);
        }
        getAccessToken(code);
        return{
            loading
        }
    }
}
</script>

<style>

</style>