<template>
  <Header :parent_id="parent_id"/>
  <Memberlist />
  <Footer />
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Memberlist from '@/components/administer/member_update.vue';
import Footer from '@/components/main/footer_info.vue';

export default {
components: {
    Header , Memberlist,Footer
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
    }
}
</script>

<style>

</style>