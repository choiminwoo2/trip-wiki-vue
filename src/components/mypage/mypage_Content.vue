<template>
  <div class="container">
      <MyInfo :parent_id="parent_id" v-if="menu=='I'" />
      <MyBoard :parent_id="parent_id" v-else-if="menu=='M'" />
      <MyReply :parent_id="parent_id" v-else-if="menu=='C'" />
      <MyGallery :parent_id="parent_id" v-else/>
  </div>
</template>

<script>
import { ref ,watch} from'vue';
import {useStore} from 'vuex';
import MyInfo from '@/components/mypage/mypage_info.vue';
import MyBoard from '@/components/mypage/myBoard_list.vue';
import MyReply from '@/components/mypage/myReply_list.vue';
import MyGallery from '@/components/mypage/my_gallery.vue';
export default {
  components: {
    MyInfo,MyBoard,MyReply, MyGallery
  },
  props:{
        parent_id:{
            type:String,
            required:true
        }
    },
    setup(){
      const  menu = ref("I");
       console.log ("[content-setup]"+menu.value)
      const store = useStore();
    watch(()=> store.state.menu, () =>{
        menu.value = store.state.menu;
       console.log ("[content-watch]"+menu.value)
    })
    return{
      menu
    }
}
}
</script>

<style>

</style>