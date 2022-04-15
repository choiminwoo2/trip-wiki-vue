<template>
    <Header :parent_id="parent_id"/>
    <div class="write">
        <form @submit.prevent="add">
            <h1>Trip-Community-Write</h1>
            <div class="rows">
      <span>지역</span>
      <select class="form-control" v-model="board.location" >
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

            <br>


            <div id="app">
                <tiptap  @parent_message="getMessage"/>
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
      <Footer />
</template>
 
<script>
import Header from '@/components/main/header_nav.vue';
import Footer from '@/components/main/footer_info.vue';
import { ref } from "vue";
import axios from '../../axios/axiossetting.js';
import { useRouter } from 'vue-router';
import Tiptap from '../../components/community/community_tiptap.vue'

export default {
       name: 'App',
        components: {
        Header, Footer,Tiptap
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
            location:'',
            name:'',
            pass:'',
            editor:'',
            subject:'',
            fileName:''
        })
        let file='';
        const router = useRouter();

        const change = event =>{
            file=event.target.files[0];
            board.value.fileName = file.name;
        }
        let getMessage_value = '';
        const getMessage = (value)=>{
          console.log("p = " + value);
          getMessage_value = value;
      }

        const add =async()=>{
            console.log('하하');
            let frm = new FormData();
            if(file!=''){
             frm.append("uploadfile", file);  
            }
            frm.append("BOARD_LOCATION", board.value.location)
            frm.append("BOARD_SUBJECT", board.value.subject);
            frm.append("BOARD_CONTENT", getMessage_value);
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
                    name : 'Community'
                });

            }catch(err){
                console.log('여기는 오류')
                console.log(err)
            }
        }

        return{
            board,
            change, add,  getMessage
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

.write{
    border-radius: .25rem;
    margin-left: 10%;
    margin-right: 10%;
}

#app{
    border-style: solid;
}
</style>