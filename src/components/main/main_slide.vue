<template>
    <!-- 사진 슬라이드 -->
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active slide_div">
                <img src="@/assets/image/spring.jpg" class="d-block w-100 slide_img">
            </div>
            <div class="carousel-item slide_div">
                <img src="@/assets/image/flower.jpg" class="d-block w-100 slide_img">
            </div>
            <div class="carousel-item slide_div">
                <img src="@/assets/image/seasons.png" class="d-block w-100 slide_img">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <img class="carousel-control-prev-icon" src="@/assets/image/bxs-caret-left-circle.png" aria-hidden="true">
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <img class="carousel-control-next-icon" src="@/assets/image/bxs-caret-right-circle.png" aria-hidden="true">
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    /* 슬라이드 */
    .slide_div, .active {
        overflow: hidden;
        text-align: center;
    }
    
    .slide_img {
        min-width: 100%;
        height: 500px;
        object-fit: cover;
    }

    .carousel-indicators {
        background-color:rgb(172, 151, 151);
        opacity: 0.5;
        border-radius: 100%;
    }
</style>