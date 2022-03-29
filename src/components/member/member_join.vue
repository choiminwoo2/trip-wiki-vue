<template>
  <form class="join-form">
     <div class="join-box-inner">
         <h3>계정 생성</h3>
         <div>
         <label for="id">아이디</label>
         <input type="text" id="id" placeholder="ID 입력">
         </div>
     </div>
  </form>
</template>

<script>
export default {

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
        }
    }

    
  }
</style>