<template>

<Header :parent_id="parent_id" />

<div class="container">
  <div class="search_box">
    <div class="btn-group mt-3" role="group" aria-label="Button group with nested dropdown">
      <button type="button" class="btn btn-primary" style="width:100px">{{message}}</button>
      <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="">
       <a class="dropdown-item" v-for="(item, index) in location" :key=index @click="search">{{location[index]}}</a>
      </div>
      <input type="text" class="form-control" placeholder="지역 검색" aria-label="Recipient's username" aria-describedby="button-addon2" style="margin-left:10px;width:800px;" v-model.trim="input_data">
      <button class="btn btn-primary" type="submit" id="button-addon2" style="width:100px" @click="search2">검색</button>
    </div>
  </div>
  <div class="main">
    <div class="row">
      <div class="col-3" v-for="(item, index) in list" :key="index">
        <div class="card" @click="detail(item.contentid,item.areacode)">
           <div class="card-header">
              &nbsp;
            </div>
           <img src="@/assets/default1.jpg" v-if="!item.firstimage" />
           <img :src="item.firstimage" v-else/>
            <div class="card-body">
                <h5 class="card-title">
                  <div class="flex">
                    <div class="trip-text">
                    <div class="flex-icon">
                      <button type="button" class="btn btn-outline-primary">관광지</button>
                    </div>
                    <div class="flex-name">
                      {{item.title}}
                    </div>
                    </div>
                  </div>
                </h5>
                <div class="location-text"> 
                  <div class="card-location">
                    <img src="@/assets/location.png"/>
                  </div>
                <div>
              </div>
              <p class="card-text">
               {{item.addr1}}
              </p>
                </div>
            </div>
          </div>
          <br v-if="index == 3">
          <br v-if="index == 3">
        </div>
      </div>
    </div>
      <div>
        <paging/>
      </div>
</div>
<Footer />
</template>

<script>
import axios from '@/setting/axiossetting.js';
import { ref,watch } from 'vue';
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import paging from '@/components/trip/trip_paging.vue';
import {useRoute,useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default { 

    components: {
        Header,Footer,paging
    },
    props:{
    parent_id:{
      type:String,
      required:true     
    }
  },
	emits:['parent_getSession'],
  setup(props,context){
     context.emit("parent_getSession");
     const store = useStore(); 
     const location=ref(['서울', '경기', '인천','강원','경상', '충청', '광주', '전라', '대전', '울산', '부산', '대구','제주']);
     const message = ref('지역');
     const route = useRoute();
     const list = ref([]);
     let currentpage = 1;
     let maxpage = 1;
     const router=useRouter();
     const input_data = ref('');
     const getTripList = async(page,keyword) =>{
      
       try{    //&areaCode=${areaCode}
        const res = await axios.get(`apitest?page=${page}&keyword=${keyword}`);
        //console.log(res.data.boardlist);
        list.value = JSON.parse(res.data.boardlist).response.body.items.item;
        maxpage=res.data.maxpage;
        currentpage=res.data.page;
        //search_word.value = res.data.search_word;
        
        const pagelist=ref([]);      
        for(let i=res.data.startpage; i<=res.data.endpage;i++){
          pagelist.value.push(i);
        }
        const obj = {maxpage, currentpage,pagelist};
        store.dispatch('store_obj', obj);
        
      } catch (err) {
        console.log(err);
      }    

    };

   if(route.query.keyword){
      getTripList(1,route.query.keyword);
      store.dispatch('store_keyword',route.query.keyword)
   }

      watch(()=>store.state.page, ()=>{ 
      console.log(store.state.page);
      getTripList(store.state.page,store.state.keyword);
   })

   watch(()=>store.state.keyword, ()=>{ 
      console.log(store.state.page);
      getTripList(store.state.page,store.state.keyword);
   })
      const search = async (event) =>{
      message.value=event.target.text;
    };
    
    watch(message, () => {

        getTripList(1,message.value);
        watch(()=>store.state.page, ()=>{
        store.state.keyword=message.value;
        getTripList(store.state.page,store.state.keyword);
    })
  });

    //검색
     const search2 = async () => {
        console.log(input_data.value);
        getTripList(1,input_data.value);
        watch(()=>store.state.page, ()=>{
        store.state.keyword=input_data.value;
      
        getTripList(store.state.page,store.state.keyword);
    })
  }

   
    const detail =(contentid,areacode) =>{
      console.log(contentid,areacode);
      router.push({
                    name:'TripDetail',
                    params:{contentId:contentid, areacode:areacode}
             })
     }
    return{
      list,location,message,search,search2,input_data,detail
    }
  }


}
</script>

<style scoped>

.search_box{
  position: relative;
}
  .main{
    position: relative;
  }
  
  .row {
    margin-top: 70px;
   }

  .search_box:hover{
     z-index: 10 !important;
  }

  #btnGroupDrop1:hover{
     z-index: 10 !important;
  }

  .pagination{
    margin-top: 100px;
    justify-content: center;
  }

  .col-3 > .card > img {
   
    height: 203px;
    cursor: pointer;
    
  }
  .col-3 > .card > .card-body > .location-text {
    max-height: 48px;
    min-height: 48px;
    margin-top: 10px;
    display: flex;
  }

  .col-3 > .card > .card-body > .location-text > .card-location > img {
    width: 29px;
    height: 29px;
   
  }

  .col-3 > .card > .card-text {
    display: flex;
  }

.col-3 > .card > .card-body {
  height: 212px;
}

.col-3 > .card > .card-body > .card-title > .flex > .trip-text > .flex-icon {
  margin-top: 10px;
  margin-bottom: 10px;
}

.search_box{
   margin-top: 50px;
  transform: translateX(130px);
} 

</style>