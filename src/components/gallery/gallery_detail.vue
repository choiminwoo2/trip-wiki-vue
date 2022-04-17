<template>
    <div class="container">
        <div class="buttons">
            <button type="button" class="btn btn-info" v-if="gallery.user_id == parent_id" @click="goModify">수정</button>&nbsp;
            <button type="button" class="btn btn-danger" v-if="gallery.user_id == parent_id || parent_id == 'admin'" @click.prevent="deleteProcess">삭제</button>
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
                <span><b>{{gallery.user_id}}</b> | {{gallery.reg_date}} 작성</span>
            </tr>
        </table>
    </div>
</template>

<script>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import axios from '@/setting/axiossetting.js';
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
                //console.log(res.data);
                gallery.value = res.data.gallery;
                display(gallery.value.photo);

            } catch (error) {
                console.log(error);
            }
        }

        getDetail();

        const preview = ref('');
        const display = async(filename) => {
            try {
                // Blob(Binary Large Object)객체는 파일을 text나 2진 데이터 형태로 읽을 수 있음)
                const res = await axios.get ('gallery/display', {
                    params: {
                        filename: filename,
                    },
                    responseType: 'blob'
                });

                let bb = new Blob([res.data]);
                let url = window.URL.createObjectURL(bb);
                preview.value = url;
                //console.log("url = " + url);
                //window.URL.revokeObjectURL();
            } catch (err) {
                console.log(err)
            }
        }

        const deleteProcess = async () => {
            const res = await axios.delete(`gallery/${num}`)
            if (!confirm('정말 해당 게시물을 삭제하시겠습니까?')) {
                return;
            } else {
                if (res.data == -1) {
                    alert('삭제 실패입니다');
                } else {
                    alert('삭제되었습니다');
                    router.push({
                        name: 'GalleryMain',
                    });
                }
            }
        }
        
        return {
            gallery, goModify, display, preview, deleteProcess
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
        width: 1100px;
        height: 619px;
        overflow: hidden;      
        text-align: center;
    }

    #photo {
        width: auto;
        height: 100%;
    }

    span {
        margin: 20px;
        font-size: 17px;
    }

    h3 {
        font-weight: bold;
    }



</style>