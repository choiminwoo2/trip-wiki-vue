<template>
<div>
    <Header />
</div>
<div class="container">
 <router-link :to="{name:'Myinfo'}" class="btn btn-primary">내 정보</router-link>
 <router-link :to="{name:'Myboardlist'}" class="btn btn-primary">내 게시물</router-link> 
 <router-link to="name:'myheart'" class="btn btn-primary">좋아요 한 게시물 확인</router-link> 
 <router-link to="name:'mycomment'" class="btn btn-primary">내 댓글</router-link> 
    </div>
    
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col" id="num">번호</th>
      <th scope="col" id="title">제목</th>
      <th scope="col" id="read">조회</th>
      <th scope="col" id="int">관심</th>
      <th scope="col" id="date">날짜</th>
    </tr>
  </thead>
</table>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
export default {
  components: {
    Header
  }

}
</script>

<style scoped>
.container{
  float:left;
  padding-left:0px;
}
#title{
    width:70%;
}
</style>