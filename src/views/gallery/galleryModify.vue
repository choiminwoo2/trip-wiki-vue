<template>
    <div class="galleryModify">
        <Header :parent_id="parent_id"/>
        <Gallery_Modify :parent_id="parent_id"/>
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Gallery_Modify from '@/components/gallery/gallery_modify.vue';
export default {
    components: {
        Header, Gallery_Modify
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