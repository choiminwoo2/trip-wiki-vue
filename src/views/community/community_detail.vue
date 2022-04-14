<template>
    <Comment_Detail :parent_id="parent_id"  />
    <Modal/>
    <Comment :parent_id="parent_id"/>
</template>

<script>
import Comment_Detail from '../../component/community/community_detail.vue';
import Modal from '../../component/community/community_modalDo.vue';
import Comment from '../../component/community/community_comment.vue'
export default{
    components:{
        Comment_Detail, Modal, Comment
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
</style>