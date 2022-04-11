<template>
    <div class="btn-group">
        <input  class="form-control" placeholder="메일 주소 입력" @input="ChangeEmail">
        <button class="btn btn-info btn-xs" @click="handleEmailSender">메일 인증</button>
        <span :class="email_color">{{email_message}}</span>
    </div>
</template>
<script>
import {ref, watch} from 'vue';
import {useStore} from 'vuex';
import axios from '@/setting/axiossetting.js';
export default {
    setup(){
        const sendId = ref('');
        const store = useStore();
        const email_message = ref('');
        const email_color = ref('');
        const sendMessage = ref('');

        watch(()=> store.state.sendMail.id,()=>{
            sendId.value = store.state.sendMail.id;
            });
        const input_email = ref('');
        const ChangeEmail = (e) =>{
            store.dispatch('sendMail', e.target.value);
            input_email.value = e.target.value;
        }
        const handleEmailSender = async() =>{
            if(sendId.value != ''){
                const data = await (await axios.post('emailChk',{
                        user_id : sendId.value,
                        user_email : input_email.value
                    })).data; 
                    console.log(data);
                    if(data.result == -1){
                        email_message.value ="ID가 존재하지 않습니다."
                    }else if(data.result == 1){
                        email_message.value ="이메일을 확인해주세요."
                    }else if(data.result == 2){
                        email_message.value = "메일을 확인해주세요.";
                        sendMessage.value = "비밀번호";
                        sendEmailToUser(email_message);
                    }
            }else if(sendId.value == '' && input_email.value != ''){
                const data = await (await axios.post('idFinder',{
                        user_email : input_email.value
                    })).data; 
                    console.log(data);
            }
        }
        const sendEmailToUser = async() =>{
            const data = await( await axios.post('keySender',{
                email : input_email.value,
                message : sendMessage.value
            })).data;
            console.log(data)
        }
        return{
            input_email,ChangeEmail,sendId,handleEmailSender,email_color,email_message
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-group{
    display: grid;
    grid-template-columns: 65% 35%;
    column-gap: 20px;
    .btn{
        border-radius: 5px !important;
        font-size: 12px !important;
    }
    .btn-xs{
        width: 85px !important;
        height:30px !important;
        
    }

}
input{
    padding : 2px 5px;
}

</style>