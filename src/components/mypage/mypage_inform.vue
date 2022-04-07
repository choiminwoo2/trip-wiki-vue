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
  <tbody>
    <tr>
        <th scope="row">
          <div>아이디</div>
          </th>
          <td class="w100">dce235</td>
    </tr>
    <tr>
      <th scope="row">
        <div>메일주소</div>
        </th>
        <td>""</td>
    </tr>
      <tr>
      <th scope="row">
        <div>가입일</div>
        </th>
        <td>""</td>
      </tr>
  <tr>
      <th scope="row">
        <div>비밀번호</div>
        </th>
        <td>""</td>
    </tr>
  </tbody>
  </table>
  <div class="membersubmit">
 <router-link to="name:'updateinfo'" class="btn btn-primary">회원정보 수정</router-link>
 <router-link to="name:'checkoutinfo'" class="btn btn-primary">회원 탈퇴</router-link> 
    </div>
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
th{
  width:10%;
  background-color:#78c2ad;
  color:white;
  font-family : sans-serif;
    
}

.item{  display: flex;
  margin-top: 150px;
  text-align:left;
}

.btn_group{
    justify-content: left;
}

.col{
  text-align: center;
}

.table-hover{
  height:50%;
}

.container{
  float:left;
  padding-left:0px;
}

.membersubmit{
  float:right;
}
</style>