<template>
<Header :parent_id="parent_id" />
<div class="container">
  <div class="title">
      <h1>{{list.title}}</h1>
      <hr style="border:solid 2px black;" class="line">
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
        <p style="font-size:17px;">주 &nbsp; 소 |&nbsp; {{list.addr1}}</p>
        <br>
        <p style="font-size:17px;">관광지 |&nbsp; {{list.title}}</p>
     </div>
     <div class="bot_right">
      <div class="weather">
        <div v-for="(item,index) in result" :key="index">
            &nbsp;&nbsp;<span style="font-size:17px;">{{days[index]}}</span><br>
            <img :src="require(`@/assets/${item}`)" style="width:40px;height:40px;margin-top:10px;margin-bottom:10px;"/><br>
            <img src="@/assets/temperature.png" style="width:30px;height:30px;margin-bottom:10px;"/>
            {{temphigh[index].max}}°C/
            {{temphigh[index].min}}°C<br>
            <img src="@/assets/rainy.png" style="width:30px;height:30px;margin-bottom:7px;"/>&nbsp;{{rainyday[index].rain}}%
         </div> 
       </div>
      </div>
     </div>
    <div class="bot_bot">
      <br><br><hr style="border:solid 2px black;">
      <p style="font-size:21px;">관광지 정보</p>
      <br>
      <p v-html="list.overview"></p>
     </div>
  </div>
</div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import {key} from '@/views/trip/kakao_api.js'
import axios from '@/setting/axiossetting.js';
import dayjs from 'dayjs' //npm install dayjs --save
import {useRoute} from 'vue-router';
import {ref} from 'vue';
import {useStore} from 'vuex';
export default {
    components: {
        Header
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
     const list = ref([]);
     const temperature = ref([]);
     const weather = ref([]);
     const contentId = useRoute().params.contentId;
     const areacode = useRoute().params.areacode;
     const store = useStore();
     const YYYYMMDD = dayjs().format("YYYYMMDD")+"0600";
     //console.log(YYYYMMDD);
     let today =dayjs().format("YYYYMMDD");
     let yesterday='';
     let oneday= dayjs().format("MM/DD");
     let twoday='';
     let threeday='';
     let fourday='';
     let fiveday='';

     //한국관광공사_국문 공통정보 조회 API
    const getDetail = async(contentId) =>{

      try{    
        const res = await axios.get(`apitest2?contentId=${contentId}`);
        //console.log(res.data);
        list.value = res.data.response.body.items.item;
        //store.dispatch('store_obj', obj);
        } 
        catch (err) {
        console.log(err);
      }    
    };

      getDetail(contentId);

        const temphigh = [];

      //기상청 중기 기온 조회 API
     const getTemperature = async(regId,tmFc) =>{
     
       try{
        const res = await axios.get(`apitest3?regId=${regId}&tmFc=${tmFc}`);
        //console.log(res.data);
        temperature.value = res.data.response.body.items.item;
        temphigh.push({max:temperature.value.taMax3, min:temperature.value.taMin3});
        temphigh.push({max:temperature.value.taMax4, min:temperature.value.taMin4});
        temphigh.push({max:temperature.value.taMax5, min:temperature.value.taMin5});
        temphigh.push({max:temperature.value.taMax6, min:temperature.value.taMin6});
        temphigh.push({max:temperature.value.taMax7, min:temperature.value.taMin7});
        
        } 
        catch (err) {
        console.log(err);
      }    
    };
      //areacode=지역코드.YYYYMMDD=오늘날짜
      if(areacode=='1'){
       getTemperature('11B10101',YYYYMMDD);
     }
      else if(areacode=='2'){
        getTemperature('11B20201',YYYYMMDD);
     } 
      else if(areacode=='3'){
        getTemperature('11C20401',YYYYMMDD);
      }
       else if(areacode=='4'){
        getTemperature('11H10701',YYYYMMDD);
      }
       else if(areacode=='5'){
        getTemperature('11F20501',YYYYMMDD);
      }
       else if(areacode=='6'){
        getTemperature('11H20201',YYYYMMDD);
      }
       else if(areacode=='7'){
        getTemperature('11H20101',YYYYMMDD);
      }
       else if(areacode=='31'){
        getTemperature('11B20305',YYYYMMDD);
      }
       else if(areacode=='32'){
        getTemperature('11D10301',YYYYMMDD);
      }
       else if(areacode=='34'){
        getTemperature('11C20101',YYYYMMDD);
      }
       else if(areacode=='39'){
        getTemperature('11G00201',YYYYMMDD);
      }
      else if(areacode=='35'){
        getTemperature('11D10401',YYYYMMDD);
      }
      else{
        getTemperature(store.state.regId2,YYYYMMDD);
      }

    const skystate = ['맑음','구름많음', '구름많고 비', '구름많고 눈', '구름많고 비/눈', '구름많고 소나기',
                     '흐림', '흐리고 비', '흐리고 눈', '흐리고 비/눈', '흐리고 소나기','소나기'];

    const imgsrc = ['sunny.png','cloud.png','sunny_rain.png','sunny_snow.png','sunny_snow.png','sunny_rain.png',
                    'cloud_many.png','cloud_rain.png','cloud_snow.png','cloud_snow.png','cloud_rain.png','cloud_rain.png'];
     
    const result = ref([]);

    const rainyday = [];

     //기상청 날씨 강수량 조회 API 
    const getWeather = async(regId,tmFc) =>{
      
       try{   
       const res = await axios.get(`apitest4?regId=${regId}&tmFc=${tmFc}`);
       //console.log(res.data);
       weather.value = res.data.response.body.items.item;
       const skyinfo = [weather.value.wf3Am, weather.value.wf4Am, weather.value.wf5Am, weather.value.wf6Am, weather.value.wf7Am];
     
        rainyday.push({rain:weather.value.rnSt3Am});
        rainyday.push({rain:weather.value.rnSt4Am});
        rainyday.push({rain:weather.value.rnSt5Am});
        rainyday.push({rain:weather.value.rnSt6Am});
        rainyday.push({rain:weather.value.rnSt7Am});
       
       for(var j=0; j<skyinfo.length; j++){
         const imsi = skyinfo[j];
        for(var i=0; i<skystate.length; i++){
            if(imsi==skystate[i]){
              result.value[j]=imgsrc[i];
              //console.log(result.value[j]);
              break;
            }
          }
       }
      } catch (err) {
        console.log(err);
      }  
    };  
      if(areacode=='1' || areacode=='2'){
       getWeather('11B00000',YYYYMMDD);
     }
      else if(areacode=='31' || areacode=='32'){
        getWeather('11D10000',YYYYMMDD);
     }
      else if(areacode=='6' || areacode=='7'){
        getWeather('11H20000',YYYYMMDD);
      }
        else if(areacode=='4'){
        getWeather('11H10000',YYYYMMDD);
      }
        else if(areacode=='34'){
        getWeather('11C10000',YYYYMMDD);
      }
        else if(areacode=='5'){
        getWeather('11F20000',YYYYMMDD);
      }
        else if(areacode=='3'){
        getWeather('11C20000',YYYYMMDD);
      }
        else if(areacode=='38'){
        getWeather('11F10000',YYYYMMDD);
      }
        else if(areacode=='39'){
        getWeather('11G00000',YYYYMMDD);
      } 
        else if(areacode=='35'){
        getWeather('11H20000',YYYYMMDD);
      }
        else{
         getWeather(store.state.regId,YYYYMMDD);
      }
      
  const calcDate= () =>
       { 
         yesterday = dayjs(today).subtract(1, 'day').format('YYYYMMDD'); 
         twoday    = dayjs(today).add(1, 'day').format('MM/DD'); 
         threeday  = dayjs(today).add(2, 'day').format('MM/DD'); 
         fourday   = dayjs(today).add(3, 'day').format('MM/DD'); 
         fiveday   = dayjs(today).add(4, 'day').format('MM/DD'); 
         }

      calcDate();

      console.log(yesterday);

      const days = [oneday,twoday,threeday,fourday,fiveday];
     
      return{
       list,weather,days,result,imgsrc,temphigh,rainyday
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
     //카카오맵 API
      initMap() { 
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
  margin-top: 20px;
 }

 .bot_right > .weather > *{
  width: 100%;
  height: 100%;
  margin-left: 25px;
 }
 .bot_right > .weather > img{
 width: 100%;
 height: 100%;
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
  border-width: 3px;
  width: 100%;
  height: 900px;
  
  
}

.bot_top{
  display: flex;
}

.bot_left{
  margin-top: 20px;
  padding-top: 70px;
  padding-left: 50px;
  width: 40%;
  height: 150px;
}

.bot_right{
  padding-top: 30px;
  text-align: center;
  width: 55%;
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