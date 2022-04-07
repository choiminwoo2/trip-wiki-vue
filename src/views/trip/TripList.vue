<template>
<Header />

<div class="container">

  <div class="search_box">

  <div class="btn-group mt-3" role="group" aria-label="Button group with nested dropdown">
    
      <button type="button" class="btn btn-primary" style="width:100px">지역</button>
      <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="">
        <a class="dropdown-item" href="#">서울</a>
        <a class="dropdown-item" href="#">경기</a>
      </div>
      <input type="text" class="form-control" placeholder="지역 검색" aria-label="Recipient's username" aria-describedby="button-addon2" style="margin-left:10px;width:800px;" >
      <button class="btn btn-primary" type="button" id="button-addon2" style="width:100px">검색</button>
</div>


  </div>

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
                  <div class="trip-text">
                    <div>
                      <button type="button" class="btn btn-outline-primary">관광지</button>
                    </div>
                  <div>
                    {{item.title}}
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
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#">&laquo;</a>
    </li>
    <li class="page-item active">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">3</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">4</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">5</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">&raquo;</a>
    </li>
  </ul>
</div>
</div>
<Footer/>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import { ref } from '@vue/reactivity';
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';

export default { 
   components: {
        Header,Footer
    },
  setup(){
    const keyword = ref('서울');
    let pages = 1;
    const list = ref([]);
    const getTripList = async() =>{
      // ,{
      //   params:{
      //     keyword : keyword.value,
      //     page : pages
      //   }
      // }
      const res = await axios.get('apitest');
      console.log(res.data.response.body.items.item);
      list.value=res.data.response.body.items.item;
      //console.log(res.data.response.body.pageNo);
    }
    getTripList();

    return{
      getTripList,keyword,pages,list
    }
  }
}
</script>

<style scope>
.search_box{
   margin-top: 50px;
  transform: translateX(130px);
 
} 

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
</style>