<template>
    <Header :parent_id="parent_id"/>
  <div class="update">
    <form @submit.prevent="update" >
      <h1>Trip-Community-Write_Update</h1>

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
          :value="board.board_NAME"
          type="text"
          maxlength="30"
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
        <ckeditor :editor="editor" v-model="board.board_CONTENT" :config="editorConfig"></ckeditor>
    </div>

      <div class="form-group" v-if="board.board_RE_LEV==0">
        <label for="board_file">파일 첨부</label>
        <label>
          <img src="../../assets/attach.png" alt="파일첨부" >
          <input type="file" name="uploadfile" v-show="false" @change="change" >
        </label>
        <span>{{fileName}}</span>
        <img src="../../assets/remove.png" alt="파일삭제"  class="remove" v-if="fileName" 
        @click="remove">
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
        <button type="submit" class="btn btn-primary">수정</button>
        <button type="reset" class="btn btn-danger" @click="goDetail">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import { ref } from "vue";
import axios from '../../axios/axiossetting.js';
import {useRoute, useRouter} from 'vue-router';
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
      required:false
    }
  },
  emits:['parent_getSession'],
  setup(props, context) {
     context.emit("parent_getSession");
    const fileName = ref("");
    const board = ref({});
    let file='';
    const router = useRouter();
    const num = useRoute().params.num;
    let check=0;
    const getDetail = async ()=>{
			try{
            console.log("num="+num);
            //const res=await axios.get(`boards/${num}`);
            const res=await axios.get('communitys/'+ num);
            console.log(res.data);
            board.value = res.data.board;
            //"board_ORIGINAL":null 로 전송된 경우 fileName.value=null입니다.
            fileName.value=board.value.board_ORIGINAL;
            console.log("파일이름 = " + fileName.value);
            board.value.board_PASS="";
			}catch(error){
            console.log(error);
			}
		}
		getDetail();
    const change = event => {
      file=event.target.files[0]; 
      fileName.value = file.name;
      check++;
      }
     
    const update = async()=>{
      let frm=new FormData();
      if(file!=''){//let file=''; 초기값 상태가 아닌지 확인합니다.
         frm.append("uploadfile", file);  
      }
      frm.append("BOARD_LOCATION", board.value.board_LOCATION); 
      frm.append("BOARD_SUBJECT", board.value.board_SUBJECT); 
      frm.append("BOARD_CONTENT", board.value.board_CONTENT); 
      frm.append("BOARD_PASS", board.value.board_PASS); 
      frm.append("BOARD_NAME", board.value.board_NAME); 
      frm.append("BOARD_NUM", num);
        
      
      if(check==0 && fileName.value != null){ //기존파일 그대로인 경우
        frm.append("check", fileName.value);  
        frm.append("BOARD_FILE",board.value.board_FILE);
      }
        
      try{
            const res= await axios.patch('boards', 
              frm             
                ,
                { headers:
                    { 'Content-Type': 'multipart/form-data;charset=UTF-8' } 
                }
              ); 
            console.log(res.data);
            console.log("modifyAction");
            if(res.data=="Nopass"){
              alert("비밀번호를 확인하세요");
            }else if(res.data=="success"){
              router.push({name : 'Community'});
            }else if(res.data=="fail"){
              console.log('수정 실패입니다.');
            }
      }catch(err){
            console.log('여기는 오류')
            console.log(err);
      }
    }//update
    const remove=()=>{
      fileName.value='';
    }
    const goDetail=()=>{
      router.push({name:'Community'})
    }
    return {
      fileName, board,
      change, update, remove,goDetail
    };
  }
};
</script>

<style scoped>
.remove{
  width:10px;
  position:relative;
  top:-10px;
}
img {
  width: 20px;
}
button {
  margin-right: 1em;
}
textarea{
  resize: none;
}

.update{
      margin-left: 10%;
    margin-right: 10%;
}
</style>