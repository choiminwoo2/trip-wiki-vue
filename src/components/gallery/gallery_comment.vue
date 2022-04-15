<template>
    <div class="container">
        <div id="textTitle">
            <span id="textHeader">댓글</span> <span> ({{listcount}}) </span>
        </div>
        <div class="comment_write">
            <div id="comm_content">
                <textarea class="form-control"  rows="3" v-model.lazy="content" maxlength="100" placeholder="댓글을 등록해보세요."></textarea>
            </div>
            <div class="btns">
                <button type="button" class="btn btn-success" v-if="parent_id" @click="add">등록</button>
                <button type="button" class="btn btn-info" v-else>로그인</button>
            </div>
        </div>

        <table class="table table-striped" v-if="listcount > 0">
            <tr v-for="(item, index) in list" :key="index">
                <td><i class='bx bxs-user' />{{ item.user_id }}</td>
                <td>{{ item.content }}</td>
                <td v-if="item.user_id == parent_id">{{ item.reg_date }}
                    <i class='bx bxs-edit' @click="update(item.content, item.comment_id)" />
                    <i class='bx bxs-message-square-x' @click="del(item.comment_id)"/>
                </td>
                <td v-else>{{ item.reg_date }}</td>
            </tr>
        </table>
        <div id="message" @click="more">{{ message }}</div>

    </div>
</template>

<script>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import axios from '@/setting/axiossetting.js';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const gallery_id = useRoute().params.num;
        let page = 1;
        const listcount = ref(0);
        const list = ref([]);
        const content = ref('');
        const message = ref("등록된 댓글이 없습니다.");
        const button_message = ref('등록');
        let comment_id = 0;

        const getList = async(page) => {
            try {
                const res = await axios.get("g_comments", { params: { gallery_id:gallery_id, page:page } });
                listcount.value = res.data.listcount;
                list.value = res.data.list;
                console.log(res.data);

                if (listcount.value == 0) {
                    message.value = "등록된 댓글이 없습니다."
                } else {
                    if (listcount.value > list.value.length) {
                        message.value = "더보기";
                    } else if (listcount.value > 0) {
                        message.value = "";
                    }
                }
                // store에 저장
                store.dispatch('count', listcount.value);
            } catch (err) {
                console.log(err);
            }
        }

        getList(1);

        const add = async () => {
            let res;
            try {
                if (button_message.value == "등록") {
                    res = await axios.post("g_comments/new", {
                        gallery_id:gallery_id,
                        content:content.value,
                        user_id:props.parent_id
                    });
                    console.log(res.data);
                } else {
                    res = await axios.patch("g_comments", { // 수정
                        comment_id:comment_id,
                        content:content.value
                    });
                    button_message.value = "등록";
                    console.log(res.data);
                }
                content.value = "";
                if (res.data == 1)
                    getList(1);
            } catch (err) {
                console.log(err);
            }
        } // add end

        const del = async (num) => {
            console.log("삭제 num = " + num)
            if (!confirm("정말 삭제하시겠습니까?")) {
                return;
            }
            try {
                const res = await axios.delete(`g_comments/${num}`);
                if (res.data == 1)
                    getList(1);
            } catch (err) {
                console.log(err)
            }
        } // del end

        const update = (con, num) => {
            button_message.value = "수정";
            content.value = con;
            comment_id = num;
        }

        const more = () => {
            getList(++page);
        }

        return {
            message, listcount, list, content, button_message,
            add, update, del, more
        }
    }


}
</script>

<style scoped>
    .container {
        margin-top: 15px;
    }
    #textTitle {
        width: 1100px;
        margin: 0 auto;
    }

    .comment_write {
        background-color: rgb(222, 226, 220);
        border-style: solid;
        border-width: 0.1px;
        border-color: rgb(216, 212, 212);
        width: 1100px;
        margin: 0 auto;
    }

    #comm_content {
        padding: 15px 20px 8px 20px;
    }

    textarea {
        resize: none;
    }

    .btns {
        text-align: right;
        padding-bottom: 15px;
        padding-right: 20px;
       
    }

    table {
        margin: 0 auto;
    }

    #msssage {
        text-align: center;
    }

    #textHeader {
        font-weight: bold;
        font-size: 25px;
    }
</style>