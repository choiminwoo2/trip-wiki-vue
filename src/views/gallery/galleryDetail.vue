<template>
    <div class="galleryDetail">
        <Header :parent_id="parent_id"/>
        <Gallery_Detail :parent_id="parent_id" />
        <Comment :parent_id="parent_id" />
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Gallery_Detail from '@/components/gallery/gallery_detail.vue';
import Comment from '@/components/gallery/gallery_comment.vue';
export default {
    components: {
        Header, Gallery_Detail, Comment
    },
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    emits:['parent_getSession'],
    setup(props, context) {
        context.emit("parent_getSession");
    }

}
</script>

<style>

</style>