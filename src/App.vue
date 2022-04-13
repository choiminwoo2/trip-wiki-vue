<template> 
      <router-view 
        @parent_getSession="getSession"
        :parent_id="id"/>
</template>
<script>
import axios from '@/setting/axiossetting.js';
import { useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
export default {
  setup(){
    const id = ref('');
    const router = useRouter();
    console.log("render App.vue");

    const getSession = async(received_id) =>{

      console.log("getSession init Value=" +received_id);
      if(received_id == 'logout'){
        try{
          const data = await (await axios.post("users/logout")).data;
          id.value='';
          console.log("getSession=" + data);
        }catch(err){
          console.log(err);
        }
      }else{
        try{
          const data = await ( await axios.get("getSession")).data;
          id.value = data;
          console.log("Session=" + data);
        }catch(err){
          console.log(err);
        }
      }
    }
    return{
      router,getSession,id
    }
  }
}
</script>
<style lang="scss">
  html{
    height:100%;
    min-height: 100%;
    width: 100%;
    body{
      min-height: 100%;
      height:100%;
      box-sizing: border-box;
    }
  }
  #app{
    min-height: 100%;
    height: 100%;
  }
 
</style>