<template>
<div class="container">
     <div class="search_box">

  <div class="btn-group mt-3" role="group" aria-label="Button group with nested dropdown">
    
      <button type="button" class="btn btn-primary" style="width:100px">지역</button>
      <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="">
        <a class="dropdown-item" >서울</a>
        <a class="dropdown-item" href="#">경기</a>
      </div>
      <input type="text" class="form-control" placeholder="지역 검색" aria-label="Recipient's username" aria-describedby="button-addon2" style="margin-left:10px;width:800px;" >
      <button class="btn btn-primary" type="button" id="button-addon2" style="width:100px">검색</button>
</div>


  </div>
</div>
</template>

<script>
export default {
    setup() {
     //store.dispatch('store_keyword', obj);
     
    }
}
</script>
<style scoped>
.search_box{
   margin-top: 50px;
  transform: translateX(130px);
 
} 
</style>