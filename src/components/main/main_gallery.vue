<template>
    <!-- 포토갤러리 -->
    <div class="gallery_list ">
        <span>사진 속 나들이</span>
        <router-link :to="{name:'GalleryMain'}">
            <button type="button" id="move-btn" class="btn btn-primary">포토갤러리 >> </button>
        </router-link>
        <div class="gallery_wrapper">
            <div>
                <img src="@/assets/image/beach.jpg" class="gallery-photo">
            </div>
            <div>
                <img src="@/assets/image/flower.jpg" class="gallery-photo">
            </div>
            <div>
                <img src="@/assets/image/winter.jpg" class="gallery-photo">
            </div>
            <div>
                <img src="@/assets/image/flower.jpg" class="gallery-photo">
            </div>
            <div>
                <img src="@/assets/image/winter.jpg" class="gallery-photo">
            </div>
            <div>
                <img src="@/assets/image/beach.jpg" class="gallery-photo">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .gallery_list {
        overflow: hidden;
        margin: 40px 0 30px 0;
        text-align: center;
    }
    
    span {
        margin-left: 10px;
        margin-right: 500px;
        font-size: 20px;
        font-weight: bold;
        color: rgb(68, 56, 56);
    }

    #move-btn {
        margin-bottom: 10px;
        font-weight: bold;
        width: 200px;
    }

    .gallery_wrapper {
        width: 1003px;
        margin: 0 auto;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-style: double;
        border-radius: 5%;
        border-width: 2px;
        overflow: hidden;
        box-shadow: 0px 0px 3px rgb(75, 72, 72);
    }

    .gallery_wrapper > div {
        width: 333px;
        height: 600px;
        float: left;
        overflow: hidden;
    }

    .gallery-photo {
        width: auto;
        height: 100%;
        
    }
</style>