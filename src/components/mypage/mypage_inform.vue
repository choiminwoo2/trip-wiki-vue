<template>
  <Mymenu :parent_id="parent_id"/>
  <Content :parent_id="parent_id"/>
</template>

<script>
import Mymenu from '@/components/mypage/mypage_mymenu.vue'
import Content from '@/components/mypage/mypage_Content.vue'
export default {
 components: {
   Mymenu,Content
 },
 props:{
        parent_id:{
            type:String,
            required:true
        }
    },
    setup(){
    }
}
</script>

<style>

</style>