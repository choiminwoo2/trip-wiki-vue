<template>
    <div class="gallery">
        <Header :parent_id="parent_id"/>
        <div >
                <div class="flex-column">
                    <h3>포토갤러리</h3>
                    <h6>사진 속 함께하는 나들이 여행</h6>
                    <button type="button" class="btn btn-success" @click="goWrite">사진 올리기</button>
                </div>

        </div>
        <Gallery_List />
        <Paging />
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Gallery_List from '@/components/gallery/gallery_list.vue';
import Paging from '@/components/gallery/gallery_pagination.vue';
import {useRouter} from 'vue-router';
export default {
    components: {
        Header, Gallery_List, Paging
    },
    props: {
        parent_id: {
            type: String,
            required: true
        }
    },
    emits:['parent_getSession'],
    setup(props, context) {
        context.emit("parent_getSession");

        const router = useRouter();
        const goWrite = () => {
            if (!props.parent_id == '') {
                router.push({
                    name : 'GalleryWrite',
                });
            } else {
                alert('로그인이 필요한 서비스입니다')
            }
        }

        return {
            goWrite
        }
    }
}
</script>

<style lang="scss" scoped>

 
 


    @media  (max-width:508px){ 
        .flex-column{
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            
            margin-top:50px;
            margin-left: 1rem;
            button{

                align-self: flex-end;
                margin-right: 3.3rem;
                
            }
            .btn{
                width: 120px !important;
            }
        }
    }


    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1351px) {
                .flex-column{
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            margin-top:50px;
            margin-left: 1rem;
            padding: 0px 15.8% 0 15%;
            h3{
                transform: translateX(28px);
            }
            button{
                
                align-self: flex-end;
                
            }
            .btn{
                width: 120px !important;
            }
        }
     }
     
</style>