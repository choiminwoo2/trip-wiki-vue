<template>
  <form class="update-form" @submit.prevent="updateProcess">
     <div class="update-box-inner">
         <h3>회원 정보 변경</h3>
        <div>
                <label for="id">아이디</label>
            <div style=" border:1px solid; padding:4px;">
            <tr>
        <th scope="row">
          </th>
          <td class="w100">{{parent_id}}</td>
    </tr>
            <!--<p :class="id_color">{{id_message}}</p>-->
                </div>
            <!-- <label for="nickname">닉네임</label>
            <input type="text" id="nickname" placeholder="닉네임 입력" @input="input_nickname" required>
            <p :class="nickname_color">{{nickname_message}}</p> -->
            <label for="pass">비밀번호</label>
            <input type="password" id="pass" placeholder="암호 입력" v-model.lazy="join.user_password" required>
            <label for="pass">비밀번호 확인</label>
            <input type="password" placeholder="암호 재 확인" v-model="password_chk" required>
            <p :class="password_color">{{password_message}}</p>
            <div class="btn-group">
                <button class="btn btn-primary">확인</button>
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
    props:{
		parent_id:{
			type:String,
			required:true
		}
	},
    setup(props){
        //확인 시 보낼 객체.
        const join = ref({
            user_password : '',
        });

        //메세지 처리할 메세지 모음.
        const password_chk = ref('');
        const password_message = ref('');
        const password_color = ref('');
        // const id_message = ref('');
        // const id_color = ref('');
        // const nickname_message = ref('');
        // const nickname_color=ref('');
        // const email_message = ref('');
        // const email_color = ref('');

        watch(password_chk,()=>{
            if(password_chk.value != join.value.user_password && join.value.user_password != ''){
                password_message.value="비밀번호를 다시 확인해주세요.";
                password_color.value = "red";
            }else if(password_chk.value == join.value.user_password){
                password_message.value="비밀번호가 일치합니다.";
                password_color.value="green";
            }
        })//패스워드 창 체크 end

        const updateProcess = async() =>{
                try{
                    const res = await axios.post('users/add',join.value);
                    if(res.data==1){
                        alert('회원정보가 변경되었습니다.')
                         router.push({
                            name:'MailAuth',
                            params: {id: props.parent_id}
                        })
                    }
                }catch(err){
                    console.log(err)
                }
            }
       
        watch(()=>join.value.user_password,()=>{
            const pattern = /^[0-9a-zA-Z]{8,20}$/;
            if(!pattern.test(join.value.user_password)){
                password_message.value="패스워드는 5~20자로 숫자,영어만 사용해주세요";
                password_color.value = "red";
            }
        })//패스워드 정규식 끝
        
        // const m = ref([]);
        // //const route = useRoute();
        // const info = async () =>{
        //     try{
        //        // console.log("파라미터로 넘어온 값 = " + route.params.id)

        //        // const res = await axios.get(`members/${route.params.id}`);
        //        const res = await axios.get(`members/testman1234`);
        //         console.log(res.data)
        //         if(res.data != null){
        //             m.value=res.data;
        //         }
        //     } catch(err){
        //         console.log(err)
        //     }
        // }

        // info();

        return{
            join,password_chk,password_message,password_color
            ,updateProcess,
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
  .update-form{
    margin : 0 auto;
    max-width: 400px;
    .update-box-inner{
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