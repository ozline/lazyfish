<template>
<div>
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" height="300px">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="https://files.ozline.icu/images/BannerImg.jpeg" class="d-block w-100" alt="...">
        <!-- <div class="carousel-caption d-none d-md-block">
            <h5>第一张图</h5>
            <p>image1的简介</p>
        </div> -->
        </div>
        <div class="carousel-item">
        <img src="https://files.ozline.icu/images/BannerImg.jpeg" class="d-block w-100" alt="...">
        <!-- <div class="carousel-caption d-none d-md-block">
            <h5>第二张图</h5>
            <p>image2的简介</p>
        </div> -->
        </div>
        <div class="carousel-item">
        <img src="https://files.ozline.icu/images/BannerImg.jpeg" class="d-block w-100" alt="...">
        <!-- <div class="carousel-caption d-none d-md-block">
            <h5>第三张图</h5>
            <p>image3的简介</p>
        </div> -->
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
<div class="row">
        <item
            v-for="data in datas"
            v-bind:key="data.id"
            v-bind:data=data
            v-bind:id="data.id"
        ></item>
</div>
<t-pagination
        style="margin-top:20px"
        :total="total"
        :default-current="1"
        :default-page-size="10"
        show-first-and-last-page-btn
        @current-change="onCurrentChange"
        @page-size-change="onPageSizeChange"
        @change="onChange"
    />
</div>

</template>

<script>
import item from '../../components/item.vue'
// import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'MainShow',
    data(){
        return{
            current: 1,
            pageSize: 10,
            datas : [],
            total : 0,
        }
    },
    components:{
        item,
    },
    methods:{
        refresh(){
            var data = new FormData()
            data.append("page",this.current)
            data.append("pageSize",this.pageSize)

            this.axios.post("/api/commodity/list",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                console.log(dataReturn)
                if(dataReturn['code']==200){
                    this.datas = dataReturn['data']['records']
                    this.total = dataReturn['data']['total']
                }
            })
        },
        onPageSizeChange(size){
            this.pageSize = size
            this.refresh()
        },
        onCurrentChange(index){
            this.current = index
            this.refresh()
        },
        onChange(pageInfo){
            console.log(pageInfo)
        },
    },
    created(){
        this.refresh()
    }
}

</script>

<style>



</style>