<template>
    <div class="gallery_list">
        <div v-show="listcount > 0">
            <div class="row row-cols-1 row-cols-md-3 g-4" id="card_wrapper">
                <div class="col" v-for="(item, index) in list" :key="index">
                    <router-link :to="{name:'GalleryDetail', params:{num:`${item.gallery_id}`}}">
                        <div class="card">
                            <div class="card_image">
                                <img :src="src[index]" class="card-img-top gallery-photo">
                            </div>
                            <div class="card-body">
                                <span class="card-title">{{ item.title }}</span>
                            </div>
                        </div>
                    </router-link>
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
        let src=ref([]);
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
                list.value.forEach((item, index) => {
                    //console.log(item.photo)
                    getImage(item.photo, index)
                })

                listcount.value = res.data.listcount;
                maxpage = res.data.maxpage;
                currentpage = res.data.page;
                startnum.value = listcount.value - (currentpage - 1) * limit;
                //console.log(res.data.gallerylist);

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

        const getImage= async(filename, index) => {
            const res=await axios.get('gallery/display',
                { 
                    params: { filename : filename , },
                    responseType:'blob'
                }
            );
            let bb = new Blob([res.data]);
            let url=window.URL.createObjectURL(bb);
            src.value[index] = url;
        }
        return {
            limit, startnum, list, listcount, src
        }
    }
}
</script>

<style scoped>
    #card_wrapper {
        width: 1330px;
        height: 910px;
        margin: 0 auto;
    }

    .card {
        overflow: hidden;
        text-align: center;
        height: 430px;
        width: 420px;
        transition-duration: 0.6s;
        transition-timing-function: ease-out;   
    }

    .card:hover {
        transition: transform 0.5s;
        transform: scale(1.1);
    }

    span {
        color: rgb(83, 79, 79);
        font-weight: bold;
        font-size: 17px;
    }

    a {
        text-decoration: none;
    }

    .card_image {
        position: relative;
        width: 100%;
        height: 430px;
        overflow: hidden;
    }

    img {
        width: auto;
        height: 100%;
    }

    @media (max-width: 1335px) {
        
    }

    @media (max-width: 1199px) {
        
    }

    @media (max-width: 991px) {
        
    }
</style>