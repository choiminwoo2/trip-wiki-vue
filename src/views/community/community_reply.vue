<template>
<Header :parent_id="parent_id"/>
  <div class="reply">
    <form @submit.prevent="reply" >
      <h1>Trip-Community-Write</h1>

          <div class="rows">
      <span>지역</span>
      <select class="form-control" v-model="board.board_LOCATION" >
        <option value="서울" selected>서울</option>
        <option value="경기/인천">경기/인천</option>
        <option value="대전/충청/강원">대전/충청/강원</option>
        <option value="부산/대구/경상">부산/대구/경상</option>
        <option value="광주/전라/제주">광주/전라/제주</option>
      </select>
    </div>
    
      <div class="form-group">
        <label for="board_name">글쓴이</label>
        <input
          readonly
          :value="parent_id"
          type="text"
          class="form-control"
        >
      </div>
      
      <div class="form-group">
        <label for="board_subject">제목</label>
        <input
          type="text"
          v-model.lazy="board.board_SUBJECT"
          maxlength="100"
          required
          class="form-control"
          placeholder="Enter board_subject"
        >
      </div>

      <div id="app">
        <ckeditor :editor="editor" v-model="board.content" :config="editorConfig"></ckeditor>
    </div>

      <div class="form-group">
        <label for="board_pass">비밀번호</label>
        <input          
          type="password"
          v-model.lazy="board.board_PASS"
          maxlength="30"
          required
          class="form-control"
          placeholder="Enter board_pass"
        >
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" >답변</button>
        <button type="reset" class="btn btn-danger" @click="goDetail">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from '../../axios/axiossetting.js';
import {useRoute, useRouter} from 'vue-router';
import Header from '@/components/main/header_nav.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  name: 'App',
        components: {
        Header
        },
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        },
  props:{
    parent_id:{
      type:String,
      required:true
    }
  },
  emits:['parent_getSession'],
  setup(props, context) {
    //부모 컴포넌트 App.vue에 있는 getSession을 호출합니다.
    //<router-view @parent_getSession="getSession" :parent_id="id" />
    context.emit("parent_getSession");
    const board = ref({});
    const router = useRouter();
    const num = useRoute().params.num;
    const getDetail = async ()=>{
			try{
          console.log("num="+num);
          //const res=await axios.get(`boards/${num}`);
          const res=await axios.get('communitys/'+ num);
          console.log(res.data);
          board.value = res.data.board;      
          board.value.board_PASS="";
          board.value.content="";
          board.value.board_SUBJECT='Re:' + board.value.board_SUBJECT;
			}catch(error){
          console.log(error);
			}
		}
		getDetail();
     
    const reply = async()=>{
      let frm=new FormData();
      frm.append("BOARD_LOCATION", board.value.board_LOCATION);
      frm.append("BOARD_SUBJECT", board.value.board_SUBJECT); 
      frm.append("BOARD_CONTENT", board.value.content); 
      frm.append("BOARD_PASS", board.value.board_PASS); 
      frm.append("BOARD_NAME", props.parent_id); 
      frm.append("BOARD_NUM", num);
      frm.append("BOARD_RE_REF", board.value.board_RE_REF);
      frm.append("BOARD_RE_LEV",board.value.board_RE_LEV);
      frm.append("BOARD_RE_SEQ", board.value.board_RE_SEQ);
        
      try{
          const res= await axios.post('boards/reply/new',  frm) 
          if(res.data=="fail"){
            console.log("답변 달기 실패 입니다.");
          }else if(res.data=="success"){
            router.push({name : 'Community'});
          }
      }catch(err){
        console.log('여기는 오류')
        console.log(err)
      }
    }//reply
    
    const goDetail=()=>{
      router.push({name:'Community_Detail'})
    }
    return {
      board,
      goDetail, reply
    };
  }
};
</script>

<style scoped>
textarea{
  resize: none;
}

.reply{
        margin-left: 10%;
    margin-right: 10%;
}
</style>