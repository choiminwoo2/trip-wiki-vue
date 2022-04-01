<template>
    <div>
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

        <!-- 여행지 살펴보기 -->
        <div class="trip_card_list ">
            <span> 어디로 가면 좋을까? </span>
            <button type="button" id="move-btn" class="btn btn-primary">여행지 살펴보기 > </button>
            <div class="card_wrapper">
                <div class="card">
                    <img src="@/assets/image/spring.jpg" class="card-img-top trip-photo">
                    <div class="card-body">
                        <h6 class="card-title">중앙HTA</h6>
                        <p class="card-text" style="font-size: 13px">서울특별시 종로구 율곡로10길 디아망 4층(봉익동 10-1)</p>
                    </div>
                </div>
                <div class="card">
                    <img src="@/assets/image/spring.jpg" class="card-img-top trip-photo">
                    <div class="card-body">
                        <h6 class="card-title">중앙HTA</h6>
                        <p class="card-text" style="font-size: 13px">서울특별시 종로구 율곡로10길 디아망 4층(봉익동 10-1)</p>
                    </div>
                </div>
                <div class="card">
                    <img src="@/assets/image/spring.jpg" class="card-img-top trip-photo">
                    <div class="card-body">
                        <h6 class="card-title">중앙HTA</h6>
                        <p class="card-text" style="font-size: 13px">서울특별시 종로구 율곡로10길 디아망 4층(봉익동 10-1)</p>
                    </div>
                </div>
                <div class="card">
                    <img src="@/assets/image/spring.jpg" class="card-img-top trip-photo">
                    <div class="card-body">
                        <h6 class="card-title">중앙HTA</h6>
                        <p class="card-text" style="font-size: 13px">서울특별시 종로구 율곡로10길 디아망 4층(봉익동 10-1)</p>
                    </div>
                </div>
                <div class="card">
                    <img src="@/assets/image/spring.jpg" class="card-img-top trip-photo">
                    <div class="card-body">
                        <h6 class="card-title">중앙HTA</h6>
                        <p class="card-text" style="font-size: 13px">서울특별시 종로구 율곡로10길 디아망 4층(봉익동 10-1)</p>
                    </div>
                </div>
                <div class="card">
                    <img src="@/assets/image/spring.jpg" class="card-img-top trip-photo">
                    <div class="card-body">
                        <h6 class="card-title">중앙HTA</h6>
                        <p class="card-text" style="font-size: 13px">서울특별시 종로구 율곡로10길 디아망 4층(봉익동 10-1)</p>
                    </div>
                </div>      
            </div>
        </div>

        <!-- 포토갤러리 -->
          <div class="gallery_list ">
            <span> 사진 속 나들이 </span>
            <button type="button" id="move-btn" class="btn btn-primary">포토갤러리 > </button>
            <div class="gallery_wrapper">

                    <img src="@/assets/image/beach.jpg" class="gallery-photo">
                    <img src="@/assets/image/flower.jpg" class="gallery-photo">
                    <img src="@/assets/image/winter.jpg" class="gallery-photo">
                    <img src="@/assets/image/spring.jpg" class="gallery-photo">
                    <img src="@/assets/image/spring.jpg" class="gallery-photo">

            </div>
        </div>
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
      min-height: 450px;
      object-fit: cover;
    }

    .carousel-indicators {
        background-color:rgb(172, 151, 151);
        opacity: 0.5;
        border-radius: 100%;
    }

    /* 여행지 */
    .trip_card_list, .gallery_list {
        overflow: hidden;
        margin: 60px 0 30px 0;
        text-align: center;
    }
    
    span {
        margin-right: 600px;
        font-size: 18px;
        font-weight: bold;
    }

    #move-btn {
        margin-bottom: 10px;
        font-weight: bold;
    }

    .card_wrapper {
        width: 964px;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        border-style: solid;
        border-radius: 2%;
        border-width: 2px;
    }

    .card {
        width: 300px;
        height: 350px;
        overflow: hidden;
        text-align: center;
        float: left;
        margin: 10px;
    }

    .trip-photo {
        min-width: 100%;
        min-height: 250px;
        overflow: hidden;
    }

    .gallery_wrapper {
        width: 905px;
        margin: 0 auto;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-style: solid;
        border-radius: 2%;
        border-width: 2px;
    }

    .gallery-photo {
        max-width:100%;
        
    }
</style>