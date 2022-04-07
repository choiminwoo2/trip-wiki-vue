<template>
    <div class="gallery_list">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <div class="card">
                    <img src="@/assets/image/flower.jpg" class="card-img-top gallery-photo" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">Card title</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/image/flower.jpg" class="card-img-top gallery-photo" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">Card title</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/image/flower.jpg" class="card-img-top gallery-photo" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">Card title</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/image/flower.jpg" class="card-img-top gallery-photo" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">Card title</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/image/flower.jpg" class="card-img-top gallery-photo" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">Card title</h6>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/image/flower.jpg" class="card-img-top gallery-photo" alt="...">
                    <div class="card-body">
                        <h6 class="card-title">Card title</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .gallery_list {
        margin: 20px 250px 5px 250px;
    }

    .card {
        overflow: hidden;
        text-align: center;
        height: 450px;
    }

    img {
        min-height: 390px;
        min-width: 450px;
    }

    @media (max-width: 1600px) {
        .gallery_list {
            margin: 20px 150px 5px 150px;
        }
    }

    @media (max-width: 1199px) {
        .gallery_list {
            margin: 20px 100px 5px 100px;
        }
    }

    @media (max-width: 991px) {
        .gallery_list {
            margin: 20px 50px 5px 50px;
        }
    }
</style>