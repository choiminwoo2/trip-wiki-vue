<template>

  <Header :parent_id="parent_id"/>
  <div class="list">
  <Board_List/>      
  <Paging />
  <button type="button" class="btn btn-info float-right" @click="goWrite">글 쓰 기</button>  
  </div>    
  
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Board_List from '../../components/community/community_list.vue';
import Paging from '../../components/community/community_pageDo.vue';
import { useRouter} from 'vue-router'
export default {
	components: {
		Header,Board_List,Paging
	},
  props:{
    parent_id:{
      type:String,
      required:false     
    }
  },
	emits:['parent_getSession'],
	setup(props,context){
    context.emit("parent_getSession");
   
    const router = useRouter();
    const goWrite=()=>{
      if(!props.parent_id == ''){
      router.push({
        name:'CommunityWrite',
      });
      } else{
        alert('로그인이 필요한 서비스 입니다.')
      }
    }
    return {
      goWrite
    }
  }
}
</script>

<style scoped>

.list{
    border-radius: .25rem;
    margin-left: 10%;
    margin-right: 10%;
}
button{
  float: right;
}

</style>