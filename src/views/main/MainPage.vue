<template>
    <div>
        <Header :parent_id="parent_id"/>
        <Main_Slide />
        <Main_Trip />
        <Main_Gallery />
    </div>
</template>

<script>
import Header from '@/components/main/header_nav.vue';
import Main_Slide from '@/components/main/main_slide.vue';
import Main_Trip from '@/components/main/main_trip.vue';
import Main_Gallery from '@/components/main/main_gallery.vue';
export default {
    components: {
        Header, Main_Slide, Main_Trip, Main_Gallery
    },
    props:{
        parent_id:{
            type:String,
            required:true
        }
    },
    emits: ['parent_getSession'],
    setup(props,context){
        context.emit("parent_getSession");
        console.log("main_page" + props.parent_id);
    }
}
</script>

<style>

</style>