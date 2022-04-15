<template>
    <!-- 여행지 살펴보기 -->
    <div class="trip_card_list ">
        <span>어디로 가면 좋을까?</span>
        <button type="button" id="move-btn" class="btn btn-primary" @click="go('서울')">여행지 살펴보기 >> </button>
        <div class="card_wrapper">
            <div class="card" v-for="(item, index) in list" :key="index" @click="detail(item.contentid,item.areacode)">
                <img src="@/assets/default1.jpg" class="card-img-top trip-photo" v-if="!item.firstimage" />
                <img :src="item.firstimage" class="card-img-top trip-photo" v-else>
                <div class="card-body">
                    <h6 class="card-title">{{item.title}}</h6>
                    <p class="card-text" style="font-size: 13px">{{item.addr1}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/setting/axiossetting.js';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    emits:['parent_getSession'],
    setup(props, context) {
        context.emit("parent_getSession");
        const router=useRouter();
        const store =useStore();
        const list = ref([]);
        const keyword = ref('');

        const getTripList = async() =>{
            try { 
                const res = await axios.get('apiMain');
                //console.log("boardlist=" + res.data.boardlist);
                list.value = JSON.parse(res.data.boardlist).response.body.items.item;
            } catch (err) {
                console.log(err);
            }    
        };

        getTripList();

        const detail =(contentid,areacode) =>{
      console.log(contentid,areacode);
      router.push({
                    name:'TripDetail',
                    params:{contentId:contentid, areacode:areacode}
             })
     }

        const go = (location) =>{
            router.push({
                    name:'TripList',
                    query: {
                        keyword: location
                    }
                })
            store.dispatch('store_keyword', location)
        } 

        return {
            list, detail, go, keyword
        }
    }
}
</script>

<style scoped>
    .trip_card_list {
        overflow: hidden;
        margin: 40px 0 30px 0;
        text-align: center;
    }
    
    span {
        margin-left: 10px;
        margin-right: 500px;
        font-size: 20px;
        font-weight: bold;
        color: rgb(68, 56, 56);
    }

    #move-btn {
        margin-bottom: 10px;
        font-weight: bold;
        width: 200px;
    }

    .card_wrapper {
        width: 964px;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;
        border-style: solid;
        border-radius: 2%;
        border-width: 2px;
        box-shadow: 0px 0px 3px rgb(75, 72, 72);
    }

    .card {
        width: 300px;
        height: 350px;
        overflow: hidden;
        text-align: center;
        float: left;
        margin: 10px;
        transition-duration: 1s;
        transition-timing-function: ease-out;
    }

    .card:hover {
        transition: transform 1s;
        transform: scale(1.05);
    }

    img {
        height: 250px;
    }

</style>