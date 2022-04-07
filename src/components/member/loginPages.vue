<template>
  <form class="login-Form" @submit.prevent="loginProcess">
      <ul>
        <li><i class='bx bx-user' ></i><input v-model="input_id" placeholder="아이디를 입력하세요"></li>
        <li><i class='bx bx-lock-open-alt' ></i><input v-model="input_pass"  type="password" placeholder="비밀번호를 입력하세요"></li>
      </ul>
      <input type="checkbox" v-model="remember"><span>아이디 기억하기</span>
      <div class="find-action">
         <a >아이디 찾기</a>
         <a >비밀 번호 찾기</a>
      </div>
      <div class="btn-group">
        <router-link :to="{name:'Join'}" class="btn btn-primary" @click="join">회원 가입</router-link>
        <button type="submit" class="btn btn-info" >로그인</button>
      </div>
      <p>소셜 계정으로 로그인하기</p>
        <ul class="social-group">
          <li><a><img src="@/assets/kakao_icon.png" class="kakao-logo">카카오 로그인</a></li>
        </ul>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from '@/setting/axiossetting.js';
import cookies from 'vue-cookies';
import router from '@/router';
import { useStore } from 'vuex';
export default {
  emits:["parent_getSession"],
  setup(props,context){
    context.emit("parent_getSession","");
    const input_id = ref('');
    const input_pass = ref('');
    const remember = ref(false);
    const store= useStore();

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
          console.log("아이디가 존재하지않습니다.");
        }else if(data == 0){
          console.log("비밀번호가 일치하지 않습니다.");
        }else if(data == 1){
          console.log("login data = " + data);
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
          store.dispatch('navShow',true);
          router.push({
            name:'Home'
          });
        }
      }catch(err){
        console.log(err);
      }
    }
    try{
        const json = axios.get('apitest');
        console.log(json);
    }
    catch(err){
      console.log(err)
    }
    return{
      input_id,input_pass,remember,loginProcess,join
    }
  }
}
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
    display: flex;
    justify-content: space-between;
    margin-top:10px;
    padding-right: 10px;
  }
  .btn-group{
    display:grid;
    grid-template-columns: 150px 150px;
    justify-content: space-between;
    transform: translateX(-2.5%);
  }
  .btn-primary, .btn-info{
    padding: 5px;
    margin: 10px;
    font-size:15px;
  }
  .social-group{
    margin-top:10px;
    display: flex;
    width: 280px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #F7E600;
    color:#3A1D1D;
    height:30px;
  }
  .social-group > li > a{
    font-size:12px;
  }
  .mx{
    margin-right: 2px;
  }
 div.login-Container > form > ul.social-group > li > a > img{
   transform: translate(-10px,-1px);
 }
</style>