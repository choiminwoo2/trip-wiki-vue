<template> 
  <div id="app">
      <router-view 
        @parent_getSession="getSession"
        :parent_id="id"/>
  </div>
</template>
<script>
import axios from '@/setting/axiossetting.js';
import { useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
export default {
  setup(){
    const id = ref('');
    const router = useRouter();
    const getSession = async(received_id) =>{
      if(received_id == ''){
        try{
          const data = await (await axios.post("members/logout")).data;
          id.value='';
          console.log(data);
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