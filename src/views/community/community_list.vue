<template>
  <Board_List/>      
  <Paging />
  <button type="button" class="btn btn-info float-right" @click="goWrite">글 쓰 기</button>            
</template>

<script>
import Board_List from '../../components/community/community_list.vue';
import Paging from '../../components/community/community_pageDo.vue';
import { useRouter} from 'vue-router'
export default {
	components: {
		Board_List,Paging
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
      router.push({
        name:'CommunityWrite',
      });
    }
    return {
      goWrite
    }
  }
}
</script>