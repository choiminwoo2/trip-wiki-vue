<template>
    <div class="gallery_list">
        <div v-show="listcount > 0">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="(item, index) in list" :key="index">
                    <router-link :to="{name:'GalleryDetail', params:{num:`${item.gallery_id}`}}">
                        <div class="card">
                            <!--<img :src="require('C:/upload/2022-4-7/bbs20224766417959.jpg')" class="card-img-top gallery-photo">-->
                            <img :src="item.photo" class="card-img-top gallery-photo">
                            <div class="card-body">
                                <h6 class="card-title">{{ item.title }}</h6>
                            </div>
                        </div>
                    </router-link>
                    {{item.photo}}
                </div>
            </div>
        </div>
        <div v-show="listcount == 0" class="center">
            등록된 글이 없습니다.
        </div>
    </div>
</template>

<script>
import {ref, watch} from 'vue';
import {useStore} from 'vuex';
import axios from '@/setting/axiossetting.js';
export default {
    setup() {
        const store = useStore();
        const limit = 6;
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
                const res = await axios.get(`photos?page=${page}&limit=6`);

                list.value = res.data.gallerylist;
                //let src2 = require('C:/upload/2022-4-4/bbs20224463918059.png');

                //list.value[0].photo = require(`${list.value[0].photo}`)
                console.log(list.value[0].photo)

                listcount.value = res.data.listcount;
                maxpage = res.data.maxpage;
                currentpage = res.data.page;
                startnum.value = listcount.value - (currentpage - 1) * limit;
                console.log("page의 startnum.value = " + startnum.value);
                console.log(res.data.gallerylist);

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
    .gallery_list {
        margin: 20px 250px 30px 250px;
    }

    .card {
        overflow: hidden;
        text-align: center;
        height: 450px; 
    }

    h6 {
        color: rgb(83, 79, 79);
    }

    a {
        text-decoration: none;
    }

    img {
        min-height: 390px;
        min-width: 450px;
    }

    @media (max-width: 1600px) {
        .gallery_list {
            margin: 20px 150px 5px 150px;
        }
    }

    @media (max-width: 1199px) {
        .gallery_list {
            margin: 20px 100px 5px 100px;
        }
    }

    @media (max-width: 991px) {
        .gallery_list {
            margin: 20px 50px 5px 50px;
        }
    }
</style>