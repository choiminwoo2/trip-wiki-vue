<template>
  <form class="join-form" @submit.prevent="join">
     <div class="join-box-inner">
         <h3>계정 생성</h3>
         <div>
         <label for="id">아이디</label>
         <input type="text" id="id" placeholder="ID 입력" v-model="id">
         <label for="pass">비밀번호</label>
         <input type="password" id="pass" placeholder="암호 입력">
          <label for="pass">비밀번호 확인</label>
         <input type="password" id="pass" placeholder="암호 재 확인">
         <label for="nickname">닉네임</label>
         <input type="text" v-model.lazy="nickname" id="nickname" placeholder="닉네임 입력">
         <label for="email">이메일 주소</label>
         <input type="text" v-model.lazy="email" id="email" placeholder="이메일 주소 입력">
         <div class="btn-group">
             <button class="btn btn-primary">계정 생성</button>
         </div>
         <input type="file" v-show="false">

         </div>
     </div>
  </form>
</template>

<script>
export default {
    
    setup(){

        return{

        }
    }
}
</script>

<style lang="scss" scoped>


  .join-form{
    margin : 0 auto;
    max-width: 400px;
    .join-box-inner{
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