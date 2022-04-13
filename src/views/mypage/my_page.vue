<template>
<div>
  <Header />
  <!--Store 사용-->
  <MypageInform />
  <!-- store 사용 -->
  <SelectContent />
  <Footer /> 

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
.item{  display: flex;
  margin-top: 150px;
  text-align:left;
}
.btn_group{
    justify-content: left;
}
.col{text-align: center;}

</style>