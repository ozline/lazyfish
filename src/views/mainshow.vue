<template>
<div>
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="https://files.ozline.icu/images/BannerImg.jpeg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>第一张图</h5>
            <p>image1的简介</p>
        </div>
        </div>
        <div class="carousel-item">
        <img src="https://files.ozline.icu/images/BannerImg.jpeg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>第二张图</h5>
            <p>image2的简介</p>
        </div>
        </div>
        <div class="carousel-item">
        <img src="https://files.ozline.icu/images/BannerImg.jpeg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>第三张图</h5>
            <p>image3的简介</p>
        </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>

<h4 style="margin-top:20px;">随便看看</h4>
</div>

</template>

<script>
export default {
    name: 'MainShow',
}

</script>

<style>



</style>