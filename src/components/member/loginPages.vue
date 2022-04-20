<template>
  <form class="login-Form" @submit.prevent="loginProcess">
      <ul>
        <li><i class='bx bx-user' ></i><input v-model="input_id" placeholder="아이디를 입력하세요"></li>
        <li><i class='bx bx-lock-open-alt' ></i><input v-model="input_pass"  type="password" placeholder="비밀번호를 입력하세요"></li>
      </ul>
      <input type="checkbox" v-model="remember"><span>아이디 기억하기</span>
      <div class="btn-group">
        <button type="submit" class="btn btn-info">로그인</button>
      </div>
       <div class="find-action">
        <a><router-link :to="{name:'IdSearch'}">아이디 찾기</router-link></a>
        <a><router-link :to="{name:'PwdSearch'}">비밀번호 찾기</router-link></a>
        <router-link :to="{name:'Join'}"  @click="join" class="join-temp">회원 가입</router-link>
      </div>
      <p>소셜 계정으로 로그인하기</p>
        <ul>
          <li><img src="@/assets/kakao_icon.png" @click="kakaologin" style="width:316px; margin-bottom:100px;"></li>
        </ul>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from '@/setting/axiossetting.js';
import cookies from 'vue-cookies';
import router from '@/router';
// import { useStore } from 'vuex';
export default {
  emits:["parent_getSession"],
  setup(props,context){
    context.emit("parent_getSession","");
    const input_id = ref('');
    const input_pass = ref('');
    const remember = ref(false);
    // const store= useStore();

    const getCookie = () =>{
      //이름이 save_id인 쿠키를 가져온다
      const cookie_value = cookies.get("save_id");
      if(cookie_value != null){
        remember.value=true;
        input_id.value = cookie_value;
      }else{
        remember.value = false;
      }
    }
    getCookie();


    const join = () => router.push({
      name:'Join'
    });

    const loginProcess = async() =>{
      try{
        const data = await(await axios.post("users",{
          user_id : input_id.value,
          user_password : input_pass.value
        })).data;
        console.log(data);
        if(data == -1){
          alert("아이디가 존재하지않습니다.");
        }else if(data == 0){
         alert("비밀번호가 일치하지 않습니다.");
        }else if(data == 1){
          if(remember.value){
            cookies.set("save_id",input_id.value,'0.5d');
        }else if(data == 2){
          router.push({
            name:'MailAuth',
            params: {id: input_id}
          })
        }
          else{
            cookies.remove("save_id");
          }
          // store.dispatch('navShow',true);
          router.push({
            name:'Home'
          });
        }
      }catch(err){
        console.log(err);
      }
    }
    const kakaologin = () =>{
      window.location.replace("https://kauth.kakao.com/oauth/authorize?client_id=7766f2940612dd165b60ff116edf4541&redirect_uri=http://localhost:8081/trip/auth&response_type=code");
    }
    
    return{
      input_id,input_pass,remember,loginProcess,join,kakaologin
    }//return end
  }//setup end
}//export end
</script>

<style lang="scss" scoped>
.kakao-logo{
  width: 25px;
}
  .login-Form{
    margin : 0 auto;
    transform: translate(-5%);
  }
  li{
    list-style: none;
  }
  ul{
    width:100%;
    margin:0px;
    padding:0px;
    border-radius: 5px;
    margin-bottom: 10px;

  }
  ul > li:nth-child(1){
    border-bottom: 0px;
  }
  
  ul > li > input{
    width:90%;
    height: 45px;
    border-left-width:0;
    border-right-width:0;
    border-top-width:0;
    border-bottom-width: 1;
  }
  ul > li > input:focus{
    width:90%;
    outline: none;
    border-bottom-width: 1;
     height: 45px;
    border:none;
    height: px;
    background-color: #cfffe5;

    
  }
  ul > li > input::placeholder{
   font-size:12px;
    
  }
  a{
    font-size: 0.1em;
  }
  input[type="checkbox"]{
    transform: translateX(-2px);
  }
  .find-action{
    display: grid;
    grid-template-columns: 70px 80px 150px;
    padding-right: 10px;
    .join-temp{
      justify-self: flex-end;
      transform: translateX(5px);
    }
  }
  .btn-group{
    display:grid;
    grid-template-columns: 320px;
    justify-content: space-between;
  }
  .btn-info{
    margin : 2px !important;
  }
  .btn-primary, .btn-info{
    padding: 5px;
    margin: 10px;
    font-size:15px;
  }
  .social-group{
    margin-top:10px;
    display: flex;
    width: 320px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #F7E600;
    color:#3A1D1D;
    height:30px;
  }
  p{
    margin-top:10px;
    margin-bottom: 2px;
  }
  .social-group > li > a{
    font-size:12px;
  }
  .mx{
    margin-right: 2px;
  }

</style>