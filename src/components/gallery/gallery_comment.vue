<template>
    <div class="container">
        <h5>댓글</h5>
        <div class="comment_write">
            <div class="container">
            {{parent_id}}
            <textarea class="form-control" id="comm_content" rows="3" v-model="content" maxlength="100" placeholder="댓글을 등록해보세요."></textarea>
            </div>
            <div class="btns">
                <button type="button" class="btn btn-info" >로그인</button>
                <button type="button" class="btn btn-success">등록</button>
            </div>
        </div>

    </div>
</template>

<script>
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
        console.log("comment=" + props.parent_id);
    }

}
</script>

<style scoped>
    .comment_write {
        background-color: gray;
    }

    #comm_content {
        resize: none;
        padding: 15px 20px 15px 20px;
        
    }

    .btns {
        text-align: right;
    }

</style>