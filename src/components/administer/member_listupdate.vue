<template>
<div class="container">
  <div  v-show="listcount>0">
     <div class="rows">
      <span>정렬</span>
      <select class="form-control" v-model="limit">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="10" selected>10</option>
      </select>
    </div>

      <!-- <form @submit.prevent="search">
        <div class="input-group">
          <select id="viewcount" 
                  v-model.lazy="search_field"  
                  @change="change_placeholder()">
                <option v-for="(item, index) in option_data" 
                        :key="index" 
                        :value="item.value" >{{item.label}}</option>
        
          </select>
          <input  
                  type="text" 
                  class="form-control" 
                  :placeholder="placeholder_message" 
                  v-model.lazy="search_word"
                  ref="f2"
                  >
          <button class="btn btn-primary" type="submit" >검색</button>
        
        </div>
  </form> -->

      <table class="table table-striped">
        <thead>
          <tr>
            <th colspan="3">회원정보</th>
            <th colspan="2">
            <span>회원수 : {{listcount}}</span>
            </th>
          </tr>
          <tr>
            <th><div>번호</div></th>
            <th><div>아이디</div></th>
            <th><div>삭제</div></th>
          </tr>	
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{startnum-index}}</td>
            <td><router-link :to="{name:'Memberlist', params:{id:`${item.user_id}`}}">
              {{item.user_id}}
            </router-link></td>
            <td><button class="btn btn-danger btn-sm" @click="member_delete(item.user_id)">삭제</button></td>
          </tr>
        </tbody>
      </table>      
  </div>	 
  <div v-show="listcount==0" class="center">
    회원이 존재하지 않습니다.
  </div>   
 </div> 
</template>

<script>
import {ref, watch} from 'vue';
import axios from '@/setting/axiossetting.js';
import {useStore} from 'vuex';
export default {
  
  setup(){
    const store = useStore(); 
    let option_data = ref([]);
    option_data.value = [
      {value:'I', label:'아이디'},
    ];
    const limit=ref(10);
    let currentpage = 1;
    let maxpage = 1;
    const list = ref([]);
    const startnum = ref(0);
    const listcount = ref(0);
    const search_field = ref('I');    
    const placeholder_message = ref('아이디를 입력하세요');
    console.log("search_field2="+search_field.value)
    const search_word = ref('');
    const f2=ref(null);

    const search=()=>{
      console.log("search하러 가요");
      if(search_word.value==''){
          alert('아이디를 입력하세요');
          f2.value.focus();
          return;
      }
      getList(currentpage);
    }
    const change_placeholder=()=>{
     option_data.value.filter(item =>{
        if(item.value===search_field.value){           
            placeholder_message.value=item.label + '(를)을 입력하세요';
            return;
        }
      });
    }
    
    const member_delete = async (id)=>{
      const answer = confirm("정말 삭제하시겠습니까?");
      if(answer){
        try{
          console.log(id)
            const res = await axios.delete(`users/${id}`)
            console.log(res.data)
            if(res.data==0){
              alert('삭제 실패 입니다.')
            }else{
              alert('삭제 성공');
              getList(1);
            }
          }catch(err){
            console.log(err)
          }
      }
    }
    const getList = async (page) => {
      try {
        const res = await axios.get(`users?page=${page}&limit=${limit.value}&search_field=${search_field.value}&search_word=${search_word.value}`);
        console.log("memberlist="+res.data)
        list.value = res.data.memberlist;
        listcount.value=res.data.listcount;
        maxpage=res.data.maxpage;
        currentpage=res.data.page;
        search_field.value=res.data.search_field;
        search_word.value = res.data.search_word;
        startnum.value=listcount.value-(currentpage-1)*limit.value;
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
    getList(1);
 
    watch(limit, ()=>{
      store.dispatch('store_limit', limit.value);
      console.log("(limit)member_list_vue - store.state.page] " + store.state.page)
      getList(store.state.page);
    })
//store.state.page에 해당하는 목록을 가져옵니다.
     watch(()=>store.state.page, ()=>{
      getList(store.state.page);
    })
    return{
      limit,  search_field, search_word,search,listcount, list,startnum,
       placeholder_message, change_placeholder, member_delete, option_data
    }
  }
}
</script>

<style scoped>
select.form-control{ width:auto;margin-bottom:2em;display:inline-block}
.rows{text-align:right;}
.center{text-align:center}
form{margin:0 auto;width:80%; text-align:center}
select{
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
 } 
.container{width:70%}
td:nth-child(1){width:10%}
.input-group{margin-bottom:3em}
</style>