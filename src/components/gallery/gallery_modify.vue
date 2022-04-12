<template>
    <form @submit.prevent="update">
        <h3> 포토갤러리 사진 수정</h3>
        <div class="form-group">
            <label for="galleryTitle" class="form-label mt-4">사진 제목</label>
            <input type="text" class="form-control" id="galleryTitle" v-model.lazy="gallery.title" placeholder="사진에 대한 짧은 글을 작성해주세요" maxlength="30">
            <label for="galleryArea" class="form-label mt-4">사진 장소</label>
            <input type="text" class="form-control" id="galleryArea" v-model.lazy="gallery.area" placeholder="사진 속 장소를 입력해주세요" maxlength="30">
        </div>
        <div class="original_ok" v-if="originalOk">
            <div class="showImage">
                <button type="button" class="btn btn-outline-dark showBtn" @click="onClickBtn">
                    사진 변경하기 <i class='bx bxs-message-alt-x'/>
                </button>
            </div>
            <div class="original">
                <img :src="preview" id="photo_original">
            </div>
        </div>
        <div class="form-group formFile_image" v-else>
            <label for="formFile" class="form-label mt-4">사진 업로드</label>
            <input class="form-control" type="file" id="formFile" @change="change">
            <div class="preview">
                <img :src="imageUrl" id="photo_preview">
            </div>
        </div>
        <div class="submit-btn">
            <button type="submit" class="btn btn-primary">등록</button>
        </div>
    </form>
</template>

<script>
import {ref, watch} from "vue";
import axios from '@/setting/axiossetting.js';
import {useRoute, useRouter} from 'vue-router';
export default {
    props:{
        parent_id:{
        type:String,
        required:false
        }
    },
    emits:['parent_getSession'],
    setup(props, context) {
        context.emit("parent_getSession");

        const fileName = ref("");
        const gallery = ref({});
        const preview = ref(''); // 기존 사진 출력
        let imageFile = ref("");
        let imageUrl = ref("");
        const router = useRouter();
        const num = useRoute().params.num;
        let check = 0;
        let originalOk = ref(true);
        
        const getDetail = async () => {
            try{
                console.log("num="+num);
                const res = await axios.get('gallery/'+ num);
                console.log(res.data);
                gallery.value = res.data.gallery;
                display(gallery.value.photo);
                fileName.value = gallery.value.photo;
                console.log("파일이름 = " + fileName.value);
            } catch (error) {
                console.log(error);
            }
        }

        getDetail();

        const onClickBtn = (event) =>  {
            event.preventDefault();
            originalOk.value = false;

        }

        const change = event => {
            if (event.target.files.length === 0) {
                return;
            }
            imageFile.value = event.target.files[0];
            fileName.value = imageFile.value.name;
            check++;
        }

        // 기존 사진 출력
        const display = async(filename) => {
            try {
                // Blob(Binary Large Object)객체는 파일을 text나 2진 데이터 형태로 읽을 수 있음)
                const res = await axios.get ('gallery/display', {
                    params: { filename: filename },
                    responseType: 'blob'
                });
    
                let bb = new Blob([res.data]);
                let url = window.URL.createObjectURL(bb);
                preview.value = url;
    
            } catch (err) {
                console.log(err)
            }
        }

        // 이미지 미리보기
        watch(imageFile, (imageFile) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);

            fileReader.addEventListener("load", () => {
                imageUrl.value = fileReader.result;
            })
        });

        const update = async() => {
            let frm = new FormData();
            if (!gallery.value.title) {
                alert("사진 제목을 입력해주세요");
                //this.$refs.input_title.focus();
                return false;
            }
            if (!gallery.value.area) {
                alert("사진 장소를 입력해주세요");
                return false;
            }
            if (imageFile.value != '') { // let file=''; 초기 값 상태가 아닌지 확인. 즉 파일을 선택하면 파일 업로드
                frm.append("uploadfile", imageFile.value);
            }
            frm.append("title", gallery.value.title);
            frm.append("area", gallery.value.area);
            frm.append("user_id", props.parent_id);
            frm.append("gallery_id", num);
                
            if(check == 0 && fileName.value != null) { //기존파일 그대로인 경우
                frm.append("check", fileName.value);  
                frm.append("photo",gallery.value.photo);
            }
                
            try{
                const res= await axios.patch('gallery/update', 
                    frm,
                        { headers:
                            { 'Content-Type': 'multipart/form-data;charset=UTF-8' } 
                        }
                ); 
                console.log(res.data);
                console.log("modifyAction");
                alert('수정되었습니다')
                router.push({name:'GalleryDetail', params:{num:`${num}`}})
                    
            }catch(err){
                    console.log('여기는 오류')
                    console.log(err);
            }
        }//update

        const remove = () =>{
            fileName.value='';
        }

        const goDetail=()=>{
            router.push({name:'GalleryDetail', params:{num:`${num}`}})
        }

        return {
            fileName, gallery, imageUrl, preview, originalOk,
            change, update, remove, goDetail,  display, onClickBtn
        };
    }
};
</script>

<style scoped>
    form {
        margin: 20px 200px 20px 200px;
    }

    .form-group {
        width: 750px;
        margin: 0 auto;
    }

    .formFile_image {
        margin-bottom: 20px;
    }

    #formFile {
        margin-bottom: 20px;
    }

    .preview {
        margin: 0 auto;
        border-style: dotted;
        border-width: 0.5px;
        border-radius: 2%;
        width: 750px;
        height: 422px;
        overflow: hidden;      
        text-align: center;
    }

    .showImage {
        width: 750px;
        margin: 0 auto;
    }

    .showBtn {
        margin-top: 30px;
    }

    .original {
        margin: 0 auto;
        border-style: dotted;
        border-width: 0.5px;
        border-radius: 2%;
        width: 750px;
        height: 422px;
        overflow: hidden;      
        text-align: center;
    }

    #photo_preview, #photo_original {
        width: auto;
        height: 100%;
    }

    .submit-btn {
        text-align: center;
        margin-top: 25px;
    }

    h3 {
        margin-top: 50px;
        margin-left: 80px;
    }
</style>