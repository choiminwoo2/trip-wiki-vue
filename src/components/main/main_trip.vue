<template>
    <!-- 여행지 살펴보기 -->
    <div class="trip_card_list ">
        <span>어디로 가면 좋을까?</span>
        <button type="button" id="move-btn" class="btn btn-primary">여행지 살펴보기 >> </button>
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
</template>

<script>
export default {

}
</script>

<style scoped>
    .trip_card_list {
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

    .card_wrapper {
        width: 964px;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        border-style: solid;
        border-radius: 2%;
        border-width: 2px;
        box-shadow: 0px 0px 3px rgb(75, 72, 72);
    }

    .card {
        width: 300px;
        height: 350px;
        overflow: hidden;
        text-align: center;
        float: left;
        margin: 10px;
    }

    img {
        height: 250px;
    }
</style>