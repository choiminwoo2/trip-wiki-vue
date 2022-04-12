<template>
    <div>
        <form @submit.prevent="add">
            <h1>Trip-Community-Write</h1>
            <div class="rows">
      <span>지역</span>
      <select class="form-control" v-model="limit" >
        <option value="1" selected>서울</option>
        <option value="2">경기</option>
        <option value="3">부산</option>
        <option value="4">대구</option>
        <option value="5">제주</option>
      </select>
      </div>
            <div class="form-group">
                <label for="board_name">글쓴이</label>
                <input
                readonly
                :value="parent_id"
                type="text"
                maxlength="30"
                class="form-control"
                placeholder="Enter board_name"
                />
            </div>
            <div class="form-group">
                <label for="board_pass">비밀번호</label>
                <input
                type="password"
                v-model.lazy="board.pass"
                maxlenth="30"
                required
                class="form-control"
                placeholder="Enter board_pass"
                />
            </div>
            <div class="form-group">
                <label for="board_subject">제목</label>
                <input
                v-model.lazy="board.subject"
                type="text"
                class="form-control"
                placeholder="Enter board_subject"
                />
            </div>


  <div id="app">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>


            <div class="form-group">
                <label>파일 첨부</label>
                <label>
                    <img src="../../assets/attach.png" alt="파일첨부"/>
                    <input type="file" v-show="false" @change="change"/>
                </label>
                <span>{{board.fileName}}</span>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">등록</button>
                <button type="reset" class="btn btn-danger">취소</button>
            </div>
        </form>
    </div>
</template>
 
<script>
import { ref } from "vue";
import axios from '../../axios/axiossetting.js';
import { useRouter } from 'vue-router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
        name: 'app',
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        },
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    emits:['parent_getSession'],

    setup(props, context){

        context.emit("parent_getSession");
        const board = ref({
            name:'',
            pass:'',
            content:'',
            subject:'',
            fileName:''
        })
        let file='';
        const router = useRouter();

        const change = event =>{
            file=event.target.files[0];
            board.value.fileName = file.name;
        }

        const add =async()=>{
            console.log('하하');
            let frm = new FormData();
            if(file!=''){
             frm.append("uploadfile", file);  
            }
            frm.append("BOARD_SUBJECT", board.value.subject);
            frm.append("BOARD_CONTENT", board.value.content);
            frm.append("BOARD_PASS", board.value.pass);
            frm.append("BOARD_NAME", props.parent_id);

            try{
                const res = await axios.post('boards/new',
                frm
                ,
                {headers:
                {'Content-Type': 'mulipart/form-data;charset=UTF-8'}
                }
                )
                console.log(res.data);

                router.push({
                    name : 'Board_List'
                });

            }catch(err){
                console.log('여기는 오류')
                console.log(err)
            }
        }

        return{
            board,
            change, add
        };
    }
    
};
</script>

<style scoped>
img{
    width:  20px;
}

button{
    margin-right: 1em;
}
</style>