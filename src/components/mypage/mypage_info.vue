<template>
  <table class="table table-hover" v-show="!flag">
  <tbody>
    <tr>
        <th scope="row">
          <div>아이디</div>
          </th>
          <td class="w100">{{m.user_id}}</td>
    </tr>
    <tr>
      <th scope="row">
        <div>메일주소</div>
        </th>
        <td>{{m.user_email}}</td>
    </tr>
      <tr>
      <th scope="row">
        <div>가입일</div>
        </th>
        <td>{{m.user_reg_date}}</td>
      </tr>
  </tbody>
  </table>

  <button class="btn btn-primary" @click="flag=true" v-show="!flag">회원정보 수정</button>
  <update v-show="flag" :parent_id="parent_id" />
</template>

<script>

import {ref} from 'vue';
//import {useRoute} from 'vue-router';
import axios from '../../axios/axiossetting.js';
import update from '@/components/mypage/member_Update.vue';
export default {
  components:{
    update
  },
  props:{
		parent_id:{
			type:String,
			required:true
		}
	},
  setup(props){
    const m = ref([]);
    const flag = ref(false);
        //const route = useRoute();
        const info = async () =>{
            try{
               console.log("파라미터로 넘어온 값 = " + props.parent_id)

               const res = await axios.get(`members/${props.parent_id}`);
               //const res = await axios.get(`members/testman1234`);
                console.log(res.data)
                if(res.data != null){
                    m.value=res.data;
                }
            } catch(err){
                console.log(err)
            }
        }

        info();

        return {m,flag};
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
  padding-left:500px;
  padding-top:120px;
}

.membersubmit{
  float:right;
}
</style>