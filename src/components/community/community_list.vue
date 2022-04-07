<template>
<form @submit.prevent="search">
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
          <button class="btn btn-primary" type="submit">검색</button>
        </div>
  </form>
  <div  v-if="listcount>0">
     <div class="rows">
      <span>줄보기</span>
      <select class="form-control" v-model="limit" >
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="10" selected>10</option>
      </select>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th colspan="3">MVC 게시판 - list</th>
            <th colspan="2">
            <span>글 개수 : {{listcount}}</span>
            </th>
          </tr>
          <tr>
            <th><div>번호</div></th>
            <th><div>제목</div></th>
            <th><div>아이디</div></th>
            <th><div>날짜</div></th>
            <th><div>조회수</div></th>
            <th><div>추천수</div></th>
          </tr>	
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{startnum-index}}</td>
            <td><router-link :to="{name:'Board_Detail', params:{num:`${item.board_NUM}`}}">
                  <span v-for="num in item.board_RE_LEV*2" :key="num">&nbsp;&nbsp;</span>
                  <img v-if="item.board_RE_LEV>0" src="../../assets/line.gif">
                  <span>{{item.board_SUBJECT}}</span>
                </router-link>
            </td>
            <td>{{item.board_NAME}}</td>
            <td>{{item.board_DATE}}</td>
            <td>{{item.board_READCOUNT}}</td>
          </tr>
        </tbody>
      </table>      
  </div>	 
  <div v-else class="center">
    등록된 글이 없습니다
  </div>   
 
</template>

<script>
import {ref, watch} from 'vue';
import {useStore} from 'vuex';
import axios from '../../axios/axiossetting.js';
export default {
  
  setup(){  
    const store = useStore();  
    const limit=ref(10);
    let currentpage = 1;
    let maxpage = 1;
    const listcount = ref(0);  
    const list = ref([]);
    const startnum = ref(0) 
    let option_data = ref([]);
    option_data.value = [
      {value:'I', label:'아이디'},
      {value:'S', label:'제목'},
      {value:'L', label:'지역'},
      {value:'LS', label:'지역 또는 제목'},
      {value:'LI', label:'지역 또는 아이디'},
      {value:'IS', label:'아이디 또는 제목'}  
    ];
    const search_field = ref('L');    
    const placeholder_message = ref('지역을 입력하세요');
    console.log("search_field2="+search_field.value)
    const search_word = ref('');
    const f2=ref(null);
    const search=()=>{
      console.log("search하러 가요");
      if(search_word.value==''){
          alert('검색어를 입력하세요');
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
    
    watch(limit, ()=>{
      console.log("(limit)board_list_vue - store.state.page] " + store.state.page)
      getList(store.state.page);
    })
    
    watch(()=>store.state.page, ()=>{
      console.log("store.state.page board_list_vue - store.state.page] " + store.state.page)
      getList(store.state.page);
    })
 
const getList = async (page) => {
     
      try {
        const res = await axios.get(`boards?page=${page}&limit=${limit.value}`);
        
        list.value = res.data.boardlist;
        listcount.value=res.data.listcount;
        maxpage=res.data.maxpage;
        currentpage=res.data.page;
        startnum.value=listcount.value-(currentpage-1)*limit.value;
        console.log("page의 startnum.value = " + startnum.value);
        
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
    //getList(1);
    return{
        limit,  search_field, search_word,search,listcount, list,startnum,
       placeholder_message, change_placeholder, option_data
    }
  }
}
</script>

<style scoped>
select.form-control{
  width:auto;margin-bottom:2em;display:inline-block;
}
.rows{text-align:right;}
.center{text-align:center}
</style>