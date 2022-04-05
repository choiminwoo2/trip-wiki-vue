<template>
    <div class="gallery">
        <Header />
        <h3>포토갤러리</h3>
        <h6>사진 속 함께하는 나들이 여행</h6>
        <div class="photo_button">
            <button type="button" class="btn btn-success">사진 올리기</button>
        </div>
        <Gallery_List />
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Gallery_List from '@/components/gallery/gallery_list.vue'
export default {
    components: {
        Header, Gallery_List
    }
}
</script>

<style scoped>
    .photo_button {
        text-align: right;
    }
    button {
        margin-right: 100px;
    }
    h3 {
        margin-top: 50px;
        margin-left: 145px;
    }
    h6 {
        margin-left: 110px;
        margin-bottom: 0;
    }

 
</style>