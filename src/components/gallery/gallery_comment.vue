<template>
    <div class="container">
        <h3>댓글</h3>
        <div class="comment_write">
            <textarea class="form-control" rows="3" v-model="content" @input="change" maxlength="50" style="resize:none"></textarea>
            <button type="button" class="btn btn-info">Info</button>
            <button type="button" class="btn btn-success">Success</button>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>