<template>
    <div class="container">
        <div class="buttons">
            <button type="button" class="btn btn-info" @click="goModify">수정</button>&nbsp;
            <button type="button" class="btn btn-danger">삭제</button>
        </div>
        <table>
            <tr>
                <td><h3>{{gallery.title}}</h3></td>
            </tr>
            <tr>
                <h5>{{gallery.area}}</h5>
            </tr>
            <tr>
                <div class="photo_wapper">
                    <img :src="preview" id="photo">
                </div>
            </tr>
            <tr id="date">
                {{gallery.user_id}} {{gallery.reg_date}} 작성
            </tr>

        </table>
        <img v-bind:src="preview">
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import axios from '@/setting/axiossetting.js';
import {useStore} from 'vuex';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    setup() {
        const router = useRouter();
       
        const goModify = () => {
            router.push({
                name : 'GalleryModify',
            });
        }
        const num = useRoute().params.num; // 리스트 페이지에서 넘어 온 파라미터 num 가져오기
        const gallery = ref({});

        const getDetail = async () => {
            try {
                const res = await axios.get(`gallery/${num}`);
                console.log(res.data);
                gallery.value = res.data.gallery;
            } catch (error) {
                console.log(error);
            }
        }

        getDetail();

        const store = useStore();
        const count = computed(() => {
            return store.state.count;
        })

        const preview = ref('');
        const display = async() => {
            console.log(gallery.value.photo);
            try {
                // Blob(Binary Large Object)객체는 파일을 text나 2진 데이터 형태로 읽을 수 있음)
                const res = await axios.get ('gallery/display', {
                    params: {
                        filename: gallery.value.photo,
                    },
                    responseType: 'blob'
                });

                let bb = new Blob([res.data]);
                let url = window.URL.createObjectURL(bb);
                preview.value = url;
                console.log("url = " + url);
                // window.URL.revokeObjectURL(a.href);
            } catch (err) {
                console.log(err)
            }
        }
        

        return {
            gallery, count, goModify, display, preview
        }

    }
}
</script>

<style scoped>
    .container {
        margin-top: 50px;
    }

    .buttons {
        text-align: right;
    }

    table {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    tr {
        margin: 10px;
    }
    #date {
        text-align: right;
    }

    .photo_wapper {
        margin: 0 auto;
        border-style: dotted;
        border-width: 0.5px;
        border-radius: 2%;
        width: 1100px;
        height: 619px;
        overflow: hidden;      
        text-align: center;
    }

    #photo {
        width: auto;
        height: 100%;
    }



</style>