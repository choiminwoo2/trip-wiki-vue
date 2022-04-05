<template>
  <form class="join-form" @submit.prevent="joinProcess">
     <div class="join-box-inner">
         <h3>계정 생성</h3>
            <div>
            <label for="id">아이디</label>
            <input type="text" id="id" placeholder="ID 입력" v-model="join.user_id" required>
            <p :class="id_color">{{id_message}}</p>
            <label for="nickname">닉네임</label>
            <input type="text" id="nickname" placeholder="닉네임 입력" @input="input_nickname" required>
            <p :class="nickname_color">{{nickname_message}}</p>
            <label for="pass">비밀번호</label>
            <input type="password" id="pass" placeholder="암호 입력" v-model.lazy="join.user_password" required>
            <label for="pass">비밀번호 확인</label>
            <input type="password" id="pass" placeholder="암호 재 확인" v-model.lazy="password_chk" @change="chkPass" required>
            <p :class="password_color">{{password_message}}</p>
            <label for="email">이메일 주소</label>
            <input type="text" v-model.lazy="join.user_email" id="email" placeholder="이메일 주소 입력" required>
            <p :class="email_color">{{email_message}}</p>
            <div class="btn-group">
                <button class="btn btn-primary">계정 생성</button>
            </div>
         </div>
     </div>
  </form>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import {watch,ref} from 'vue';
import router from '@/router';
export default {
    setup(){
        //회원가입시 보낼 객체.
        const join = ref({
            user_id : '',
            user_password : '',
            user_nickname:'',
            user_email:''
        });

        //메세지 처리할 메세지 모음.
        const password_chk = ref('');
        const password_message = ref('');
        const password_color = ref('');
        const id_message = ref('');
        const id_color = ref('');
        const nickname_message = ref('');
        const nickname_color=ref('');
        const email_message = ref('');
        const email_color = ref('');

        const chkPass= (e)=>{
            if(e.target.value != join.value.user_password && join.value.user_password != ''){
                password_message.value="비밀번호를 다시 확인해주세요.";
                password_color.value = "red";
            }else if(e.target.value == join.value.user_password){
                password_message.value="사용 가능한 패스워드입니다.";
                password_color.value="green";
            }
        }//패스워드 창 체크 end

        const idcheck = async() =>{
            try{
                console.log("id check=" + join.value.user_id);

                const data = await( await axios.get("users/idcheck",{
                    params:{
                        user_id : join.value.user_id
                    }
                })).data;
                if(data){
                    id_message.value="아이디 사용이 가능합니다.";
                    id_color.value ="green";

                }else{
                    id_message.value="아이디가 중복됩니다. 다른 아이디를 사용해주세요.";
                    id_color.value="red";
                }
            }catch(err){
               id_message.value="알 수 없는 오류입니다. 다시 시도해보세요. 관리자에게 문의하세요.";
            }
        };//아이디 체크 끝
        const input_nickname = (e) =>{
            join.value.user_nickname = e.target.value;
        }//닉네임 @input 한글 처리

        const nicknamecheck = async() =>{

            try{
            const data = await( await axios.get("users/nickname",{
                            params:{
                                user_nickname : join.value.user_nickname
                            }
                        })).data;
                        if(data){
                            nickname_message.value = "사용 가능한 닉네임입니다.";
                            nickname_color.value = "green";
                        }else{
                                nickname_message.value = "중복된 닉네임입니다. 다른 닉네임을 사용해주세요.";
                                nickname_color.value = "red";
                        }
            }catch(err){
                 nickname_message.value="알 수 없는 오류입니다. 다시 시도해보세요. 관리자에게 문의하세요.";
            }
              
        }//nicknamecheck 중복체크 끝

        const joinProcess = async() =>{
            if(id_color.value=="red"){
                alert("아이디를 확인하세요");
            }
            else if(email_color.value=="red"){
                alert("email을 확인하세요");
            }else{
                try{
                    const res = await axios.post('users/add',join.value);
                    if(res.data==1){
                        alert('회원가입을 축하합니다.')
                        router.push({
                            name : 'Login'
                        });
                    }
                }catch(err){
                    console.log(err)
                }
            }
        }
        //watch 처리할 정규식 모음
         watch(
           ()=>join.value.user_id,(next,prev) =>{
               console.log('watch(user_id)' + prev + "=>" + next)
               const pattern = /^\w{5,30}$/;
               if(!pattern.test(join.value.user_id)){
                   id_message.value ='영문자 숫자 _로 5~30자 가능합니다.';
                   id_color.value='red';
               }else{
                   idcheck();
               }
           });//아이디 정규식 끝
        watch(()=>join.value.user_nickname,()=>{
            const pattern = /^\w{5,10}$/;
            if(!pattern.test(join.value.user_nickname)){
                nickname_message.value ="영문자 한글 숫자로 5~10자 가능합니다.";
                nickname_color.value="red";
            }else{
                nicknamecheck();
            }
        })//닉네임 정규식 끝
        watch(()=>join.value.user_password,()=>{
            const pattern = /^[0-9a-zA-Z]{8,20}$/;
            if(!pattern.test(join.value.user_password)){
                password_message.value="패스워드는 5~20자로 숫자,영어만 사용해주세요";
                password_color.value = "red";
            }
        })//패스워드 정규식 끝
        watch(()=>join.value.user_nickname,()=>{
            const pattern = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{5,10}$/;
            if(!pattern.test(join.value.user_nickname)){
                nickname_message.value="닉네임은 한글,영어,숫자 5~10글자 사이로 가능합니다.";
                nickname_color.value ="green";
            }
        })//닉네임 정규식 끝

        watch(()=> join.value.user_email,()=>{
            const pattern = /^\w+@\w+[.]\w{3}$/;
            console.log(join.value.user_email);
            if(!pattern.test(join.value.user_email)){
                email_message.value ="이메일 형식이 맞지 않습니다.";
                email_color.value='red';
            }else{
                email_message.value="이메일 형식이 일치합니다."
                email_color.value="green";
            }
        })//이메일 정규식 끝
        return{
            chkPass,join,password_chk,id_message,id_color,input_nickname,nickname_message,nickname_color,password_message,password_color
            ,email_message,email_color,joinProcess
        }
    }
}
</script>

<style lang="scss" scoped>
.red{
    color:red;
}
.green{
    color:green;
}

  .join-form{
    margin : 0 auto;
    max-width: 400px;
    .join-box-inner{
        p{
            margin:0px;
            font-weight: bold;

        }
        width: 350px;
        padding: 15px 20px;
        border-radius: 5px;
        border : 1px solid rgba(0,0,0,0.2);
        input{ 
            min-width:100%;
            padding: 3px 7px;
            border-radius: 2px;
            height:31px;
            font-size:12px;
            border : 1px solid rgba(0,0,0,0.4);
            margin-bottom: 5px;
        }
        input:focus{
            font-size:15px;
            
        }
        input::placeholder{
            font-size:12px
        }
        input::-moz-placeholder{
            font-size:12px;
        }
        label{
            padding: 0 0 2px 2px;
            margin-bottom: 5px;
        }
        .btn-group{
            margin-top:10px;
            width:100%;
            button{
                width:50px;
                float: right;
            }
        }
    }

    
  }
</style>