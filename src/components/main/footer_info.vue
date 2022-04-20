<template>
    <footer>
        <div id="logo">
            <img src="@/assets/logo.png">
        </div>
        <div id="author">
            <div id="author_img">
                <img src="@/assets/우수영재일세.png" id="img2">
            </div>
            <h4>우수영재일세</h4>
        </div>
        <div class="copyright">         
            <a href="https://www.data.go.kr/index.do">
                <img src="@/assets/img_opentype.png" alt="공공데이터포털 바로가기">
            </a>          
            <a href="https://api.visitkorea.or.kr/main.do">
                <img src="@/assets/tour_api.png" alt="한국관광공사 바로가기">
            </a>
            &nbsp;&nbsp;&nbsp;
            <div class="img3">  
                <a href="https://data.kma.go.kr/cmmn/main.do">
                    <img src="@/assets/weather_api.png" alt="기상자료개방포털 바로가기">
                </a>
            </div>
           
        </div>
          
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
    footer {
        width: 100%;
        height: 150px;
        bottom: 0;
        left: 0;
        margin-top: 100px;
        background-color: rgb(187, 190, 188);
        
    }

    footer >#logo {
        text-align: right;
    }

    div {
        float: left;
        width: 33%;
        padding: 10px;
    }
    #logo, #author  {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
    }

    #author_img {
        width: 150px;
        height: 150px;
        overflow: hidden;
    }

    #img2 {
        width: auto;
        height: 100%;
    }

    h4, span {
        color: black;
        font-family: "Gungsuh";
    }

    .copyright {
        text-align: center;
        display: flex;
        
    }

    .copyright > a > img {
        margin-top: 50px;
        margin-right: 1.5rem;
        
    }

    .copyright > .img3 {
        margin-left: -8%;
        margin-top: 20px;
    }

</style>