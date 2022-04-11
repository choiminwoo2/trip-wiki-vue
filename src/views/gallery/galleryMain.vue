<template>
    <div class="gallery">
        <Header :parent_id="parent_id"/>
        <h3>포토갤러리</h3>
        <h6>사진 속 함께하는 나들이 여행</h6>
        <div class="photo_button">
            <router-link :to="{name:'GalleryWrite'}">
                <button type="button" class="btn btn-success">사진 올리기</button>
            </router-link>
        </div>
        <Gallery_List />
        <Paging />
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import Gallery_List from '@/components/gallery/gallery_list.vue';
import Paging from '@/components/gallery/gallery_pagination.vue';
export default {
    components: {
        Header, Footer, Gallery_List, Paging
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

<style scoped>
    .photo_button {
        text-align: right;
    }
    button {
        margin-right: 250px;
    }
    h3 {
        margin-top: 50px;
        margin-left: 280px;
    }
    h6 {
        margin-left: 250px;
        margin-bottom: 0;
    }

    @media (max-width: 991px) {
        h3, h6 {
            margin-left: 50px;
        }
        .photo_button {
            text-align: left;
            margin: 20px 0px 0px 50px;
        }
    }
</style>