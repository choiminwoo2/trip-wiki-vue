<template>
    <!-- 포토갤러리 -->
    <div class="gallery_list ">
        <span>사진 속 나들이</span>
        <router-link :to="{name:'GalleryMain'}">
            <button type="button" id="move-btn" class="btn btn-primary">포토갤러리 >> </button>
        </router-link>
        <div class="gallery_wrapper">
            <div v-for="(item, index) in list" :key="index">
                <router-link :to="{name:'GalleryDetail', params:{num:`${item.gallery_id}`}}">
                    <img :src="src[index]" class="gallery-photo">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import axios from '@/setting/axiossetting.js';
export default {
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    setup(props, context) {
        context.emit("parent_getSession");
        const list = ref([]);
        let src=ref([]);

        const getList = async () => {
            try {
                const res = await axios.get('main/photos');

                list.value = res.data.gallerylist;
                list.value.forEach((item, index) => {
                    //console.log(item.photo)
                    getImage(item.photo, index)
                })
                //console.log(res.data.gallerylist);
            } catch (err) {
                console.log(err);
            }
        };

        getList();

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
            list, src
        }
    }

}
</script>

<style scoped>
    .gallery_list {
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

    .gallery_wrapper {
        width: 1054px;
        margin: 0 auto;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-style: double;
        border-radius: 5%;
        border-width: 2px;
        overflow: hidden;
        box-shadow: 0px 0px 3px rgb(75, 72, 72);
    }

    .gallery_wrapper > div {
        width: 350px;
        height: 350px;
        float: left;
        overflow: hidden;
        
    }

    .gallery-photo {
        width: auto;
        height: 100%;
        transition-duration: 1s;
        transition-timing-function: ease-out;
        
    }
    
    .gallery-photo:hover {
        transition: transform 1s;
        filter: brightness(70%);
    }

</style>