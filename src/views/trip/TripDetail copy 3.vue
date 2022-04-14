<template>
<Header :parent_id="parent_id" />
<div class="container">
  <div class="title">
      <h1>{{list.title}}</h1>
      <hr class="line">
  </div>
  <div class="main_top">
   
    <div class="main_left">
     
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="@/assets/default1.jpg" class="d-block w-100" height="400px" alt="..." v-if="!list.firstimage"/>
      <img :src="list.firstimage" v-else/>
    </div>

    <div class="carousel-item">
      <img src="@/assets/default2.jpg" class="d-block w-100" height="400px" alt="..." v-if="!list.firstimage2"/>
      <img :src="list.firstimage" v-else/>
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    </div>  

    <div class="main_right">
     
 
      <div id="map" class="map"></div>
      <input type="hidden" id="mapx" :value="list.mapx">
      <input type="hidden" id="mapy" :value="list.mapy">
    

  </div>

  </div>

  <div class="main_bot"> 

    <div class="bot_top">

      <div class="bot_left">
        <p>주소 | {{list.addr1}}</p>
        <br>
        <p>관광지 | {{list.title}}</p>
       
        지역코드 테스트 <input type="hidden" id="areacode" :value="list.areacode">
      </div>
      <div class="bot_right">
         <div class="weather">
          <div class="one">
            {{oneday}}<br>
          {{weather.wf3Am}}<br>
          {{temperature.taMax3}}°C/
          {{temperature.taMin3}}°C<br>
         강수량: {{weather.rnSt3Am}}%
         </div>
          <div class="two">
             {{twoday}}<br>
        {{weather.wf4Am}}<br>
        {{temperature.taMax4}}°C/
        {{temperature.taMin4}}°C<br>
         강수량: {{weather.rnSt4Am}}%
         </div>
          <div class="three">
             {{threeday}}<br>
        {{weather.wf5Am}}<br>
        {{temperature.taMax5}}°C/
        {{temperature.taMin5}}°C<br>
         강수량: {{weather.rnSt5Am}}%
         </div>
          <div class="four">
             {{fourday}}<br>
        {{weather.wf6Am}}<br>
        {{temperature.taMax6}}°C/
        {{temperature.taMin6}}°C<br>
         강수량: {{weather.rnSt6Am}}%
         </div>
          <div class="five">
             {{fiveday}}<br>
        {{weather.wf7Am}}<br>
        {{temperature.taMax7}}°C/
        {{temperature.taMin7}}°C<br>
         강수량: {{weather.rnSt7Am}}%
         </div>
         </div>
       </div>
    </div>
    <div class="bot_bot">
      <hr><br>
     {{list.overview}}
       
    </div>
  </div>

</div>

<Footer/>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import {key} from '@/views/trip/kakao_api.js'
import axios from '@/setting/axiossetting.js';
import dayjs from 'dayjs' //npm install dayjs --save
import {useRoute} from 'vue-router';
//import {useStore} from 'vuex';
import { ref} from 'vue';
//import { kakao} from '@/views/trip/kakao.js';
export default {
    components: {
        Header,Footer
    },
    props:{
    parent_id:{
      type:String,
      required:true     
    }
  },
	emits:['parent_getSession'],
  component: { 
      dayjs 
    },
  
      
 setup(props,context){
     context.emit("parent_getSession");
     //const store = useStore(); 
     const list = ref([]);
     const temperature = ref([]);
     const weather = ref([]);
     const contentId = useRoute().params.contentId;
     var areacode = document.getElementById("areacode");
    
     const YYYYMMDD = dayjs().format("YYYYMMDD")+"0600";
    console.log(YYYYMMDD);

    
    let today =dayjs().format("YYYYMMDD");
    let  yesterday='';
    let  oneday= dayjs().format("MM/DD");
    let  twoday='';
    let threeday='';
    let  fourday='';
    let  fiveday='';


    //한국관광공사_국문 공통정보 조회 API
    const getDetail = async(contentId) =>{
     
       try{    

        const res = await axios.get(`apitest2?contentId=${contentId}`);
        console.log(res.data);
        list.value = res.data.response.body.items.item;
        //store.dispatch('store_obj', obj);
        
      } catch (err) {
        console.log(err);
      }    
    };
   
     
      getDetail(contentId);

      
    
    //기상청 중기 기온 조회 API
 
    const getTemperature = async(tmFc) =>{
     
       try{   
        const res = await axios.get(`apitest3?tmFc=${tmFc}`);
        console.log(res.data);
        temperature.value = res.data.response.body.items.item;

       } catch (err) {
        console.log(err);
      }    
    };

     getTemperature(YYYYMMDD);

       //기상청 날씨 강수량 조회 API
 
    const getWeather = async(tmFc) =>{
     
       try{   
        const res = await axios.get(`apitest4?tmFc=${tmFc}`);
        console.log(res.data);
        weather.value = res.data.response.body.items.item;

       } catch (err) {
        console.log(err);
      }    
    };
    
    getWeather(YYYYMMDD);
    console.log(yesterday);
     const calcDate= () =>
       { 
         yesterday = dayjs(today).subtract(1, 'day').format('YYYYMMDD'); 
         twoday = dayjs(today).add(1, 'day').format('MM/DD'); 
         threeday = dayjs(today).add(2, 'day').format('MM/DD'); 
         fourday = dayjs(today).add(3, 'day').format('MM/DD'); 
         fiveday = dayjs(today).add(4, 'day').format('MM/DD'); 
         }
    calcDate();


     return{
       list,temperature,weather,areacode,oneday,twoday,threeday,fourday,fiveday
     } 
    },mounted() { 
     this.calcDate(); 
     window.kakao && window.kakao.maps ? this.initMap() : this.addScript(); 
  
    },
    
    
    methods : { 
      calcDate: function() 
       { 
         this.yesterday = dayjs(this.today).subtract(1, 'day').format('YYYYMMDD'); 
         this.twoday = dayjs(this.today).add(1, 'day').format('MM/DD'); 
         this.threeday = dayjs(this.today).add(2, 'day').format('MM/DD'); 
         this.fourday = dayjs(this.today).add(3, 'day').format('MM/DD'); 
         this.fiveday = dayjs(this.today).add(4, 'day').format('MM/DD'); 
         } ,
      initMap() { 
        
        console.log("맵");
        var container = document.getElementById('map'); 
        var mapx = document.getElementById('mapx'); 
        var mapy = document.getElementById('mapy'); 
        var options = { 
          center: new kakao.maps.LatLng(mapy.value, mapx.value), 
          level: 2
          }; 
          var map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다. 
          var marker = new kakao.maps.Marker({ 
            position: map.getCenter() 
            }); 
            marker.setMap(map); 
           
          },
            addScript() { 
              console.log("스크립트");
              const script = document.createElement('script'); /* global kakao */
               script.onload = () => kakao.maps.load(this.initMap); 
               script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${key}`; 
               document.head.appendChild(script); 
              
               }
             
            }

        
}

</script>

<style scoped>



.bot_right > .weather {
  display: flex;
 }

 .bot_right > .weather > *{
  margin-left: 30px;
 }

#map {
  
  height:400px;
  border: 1px #a8a8a8 solid;
}




.title{
  margin-top: 100px;
  text-align: center;
  justify-content: center;
}

.line {
  margin-left:  30%;
  margin-right: 30%;
}


.main_top {
  margin-top: 50px;
 display: flex;
 height: 400px;
}

.main_left{
  margin-right: 10px;
  width: 55%;
  height: 100%;
 
}

.main_top > .main_left > #carouselExampleControls > .carousel-inner > .carousel-item > img {
  width: 100%;
  height: 400px;
}

.main_right {
  width:45%;
}

.main_right > img {
  width:100%;
  height: 100%;
  
}

.main_bot{
  margin-top: 30px;
  border-style: solid;
  border-width: 1px;
  width: 100%;
  height: 550px;
  
}

.bot_top{
  display: flex;
}

.bot_left{
  padding-top: 30px;
  padding-left: 50px;
  width: 100%;
  height: 150px;
}

.bot_right{
  padding-top: 30px;
  text-align: center;
  width: 100%;
  height: 150px;
}

.bot_bot{
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 50px;

  width: 100%;
  height: 100px;
}



</style>