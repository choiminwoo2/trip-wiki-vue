<template>
    <footer>
        <div id="logo">
            <img src="@/assets/logo.png">
        </div>
        <div id="author">
            <h4> 우수영재일세 </h4>
            <span>(최민우, 이진수, 지태영, 김선재, 박세은)</span>
        </div>
        <div class="copyright">
            <a href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15057787">
                <img src="@/assets/img_opentype.png" alt="공공데이터포털 바로가기">
            </a>
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

    h4, span {
        color: black;
        font-family: "Gungsuh";
    }

    .copyright {
        text-align: center;
    }
    
</style>