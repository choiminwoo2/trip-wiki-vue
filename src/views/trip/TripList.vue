<template>

<Header :parent_id="parent_id" />

<search_box />

<div class="container">

  <div class="main">

  <div class="row">
      <div class="col-3" v-for="(item, index) in list" :key="index">
        
          <div class="card">
            <div class="card-header">
              &nbsp;
            </div>
            <img src="./1234.jpg" v-if="!item.firstimage"/>
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
<Footer/>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import { ref,watch } from 'vue';
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import search_box from '@/components/trip/search_box.vue';
import paging from '@/components/trip/trip_paging.vue';
import {useStore} from 'vuex';
export default { 
   components: {
        Header,Footer,search_box,paging
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
    const keyword ='서울';
    
    const list = ref([]);
    let currentpage = 1;
    let maxpage = 1;
    const getTripList = async(page) =>{
     
      try{    //&areaCode=${areaCode}
      const res = await axios.get(`apitest?page=${page}&keyword=${keyword}`);


        console.log(res.data.boardlist);
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
    getTripList(1);
 
  
     watch(()=>store.state.page, ()=>{
      getTripList(store.state.page);
    })

    



    return{
      list
    }
  }
}
</script>

<style scoped>


  .row {
    margin-top: 70px;
  
  }

  .row>*{
    z-index: -1;
  }

  .pagination{
    margin-top: 100px;
    justify-content: center;
  }

  .col-3 > .card > img {
    height: 203px;
  }

  .col-3 > .card > .card-body > .card-text {
  
    height: 60px;
  }

  .col-3 > .card > .card-body > .location-text {

    display: flex;
  }

  .col-3 > .card > .card-body > .location-text > .card-location > img {
    width: 29px;
    height: 29px;
   
  }

  .col-3 > .card > .card-text {
    display: flex;
  }

.col-3 > .card > .card-body > .card-title > .flex{
  display: flex;
}
 
</style>