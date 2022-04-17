<template>
    <Header :parent_id="parent_id"/>
<div class="detail">
    <Comment_Detail :parent_id="parent_id"  />
    <Modal/>
    <Comment :parent_id="parent_id"/>
</div>
    <Footer />
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import Comment_Detail from '../../components/community/community_detail.vue';
import Modal from '../../components/community/community_modalDo.vue';
import Comment from '../../components/community/community_comment.vue'
export default{
    components:{
        Header, Footer,Comment_Detail, Modal, Comment
    },
    props:{
        parent_id:{
            type:String,
            required:true
        }
    },
    emits:['parent_getSession'],
    setup(props, context){
        context.emit("parent_getSession");
    }

}
</script>

<style>
.detail{
        margin-left: 10%;
    margin-right: 10%;
}
</style>