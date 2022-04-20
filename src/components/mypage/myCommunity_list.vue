<template>
    <div>
        <div class="myGalleryList">
            <table class="table table-hover" v-show="listcount > 0">
                <tr class="table-light">
                    <th scope="row">번호</th>
                    <th scope="row">제목</th>
                    <th scope="row">날짜</th>
                    <th scope="row">상세보기</th>
                </tr>
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{ startnum - index }}</td>
                    <td>{{ item.board_SUBJECT }}</td>
                    <td>{{ item.board_DATE}}</td>
                    <td>
                         <router-link :to="{name:'Community_Detail', params:{num:`${item.board_NUM}`}}">
                            <button type="button" class="btn btn-secondary"> 상세 보기 >> </button>
                        </router-link> 
                    </td>
                </tr>
            </table>
            <div v-show="listcount == 0" class="center">
                등록된 글이 없습니다.
            </div>
            <Paging />
        </div>
    </div>
</template>

<script>
import Paging from '@/components/gallery/gallery_pagination.vue';
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import axios from '@/setting/axiossetting.js';
export default {
    components: {
        Paging
    },
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const user_id = route.params.id;
        const limit = 10;
        let currentpage = 1;
        let maxpage = 1;
        const listcount = ref(0);
        const list = ref([]);
        const startnum = ref(0);
        
        // 페이지네이션의 페이지 번호를 클릭한 경우
        watch(() => store.state.page, () => {
            getList(store.state.page);
        })

        const getList = async (page) => {
            try {
                const res = await axios.get("mycomm", { params: { id:user_id, page:page, limit:10 } });
                console.log("파라미터로 넘어온 값 = " + route.params.id)

                list.value = res.data.boardlist;
                console.log(res.data.boardlist);
                listcount.value = res.data.listcount;

                maxpage = res.data.maxpage;
                currentpage = res.data.page;
                startnum.value = listcount.value - (currentpage - 1) * limit;

                const pagelist = ref([]);
                for (let i = res.data.startpage; i <= res.data.endpage; i++) {
                    pagelist.value.push(i);
                }

                // pageDo.vue에서 사용하기 위해 store에 저장
                const obj = {maxpage, currentpage, pagelist};
                store.dispatch('store_obj', obj);
            } catch (err) {
                console.log(err);
            }
        };

        getList(1);

        return {
            limit, startnum, list, listcount
        }
    }
}
</script>

<style scoped>
    table {
        text-align: center;
    }

</style>