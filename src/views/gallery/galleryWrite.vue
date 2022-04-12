<template>
    <div class="galleryWrite">
        <Header :parent_id="parent_id"/>
        <Gallery_Write :parent_id="parent_id"/>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import Gallery_Write from '@/components/gallery/gallery_write.vue';
export default {
    components: {
        Header, Footer, Gallery_Write
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