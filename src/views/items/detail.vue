<template>
<div style="margin:30px;">
    <h1 v-html="'商品详情 - ' + data.title"></h1>
    <t-row style="margin-top:30px;" justify="center">
        <t-col :span="5">
            <h3>实物图(共{{ pictures.length }}张)</h3>
            <div style="margin-right:26px; height:400px" v-if="pictures.length>1">
                <div id="slider" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
                    <div class="carousel-inner">
                        <div
                        v-for="(item,index) in pictures"
                        v-bind:key="index"
                        :class="index==1 ? 'carousel-item active' : 'carousel-item'">
                        <img :src="'/img/'+item" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div style="margin-right:26px; height:400px" v-else-if="pictures.length>0">
                <img :src="'/img/'+pictures[0]" class="d-block w-100" alt="...">
            </div>
            <div style="margin-right:26px; height:400px" v-else>
                这个卖家很懒，没有一张图片...
            </div>
        </t-col>
        <t-col :span="6">
            <h3>详细信息</h3>
            <div style="margin-top:30px">
                <h4>类别 - {{ data.type }}</h4>
            </div>
            <div style="margin-top:30px">
                <t-row>
                    <t-col :flex="4">
                        <h2 style="color:#FC7120;">现价 {{ data.price }}元</h2>
                    </t-col>
                    <t-col :flex="3">
                        <h4 style="color:#E4E4E4;">原价 {{ data.oldPrice }}元</h4>
                    </t-col>
                </t-row>
            </div>
            <div style="margin-top:30px">
                <h4>商品描述</h4>
                <h5 style="margin-top:26px;">{{ data.description }}</h5>
            </div>
            <t-collapse expand-mutex style="margin-top:26px">
                <t-collapse-panel
                    :description="data.title"
                    header="完整信息">
                商品编号: {{ data.id }}<br>
                卖家学号: {{ data.userId }}<br>
                发布时间: {{ data.createTime }}<br>
                最后更新: {{ data.updateTime }}<br>
                名称: {{ data.title }}<br>
                类型: {{ data.type }}<br>
                简介: {{ data.description }}<br>
                原价: {{ data.oldPrice }}<br>
                现价: {{ data.price }}<br>
                </t-collapse-panel>
            </t-collapse>
            <div style="margin-top:200px;" v-show="this.$store.state.login">
                <t-row :gutter="12">
                    <t-col :span="3">
                        <t-button theme="primary" size="large" variant="outline" @click="changePage('additem')">  我也要卖  </t-button>
                    </t-col>
                    <t-col :span="3">
                        <div></div>
                    </t-col>
                    <t-col :span="3">
                        <t-button theme="success" size="large" variant="outline" @click="changePage('space?id='+data.userId)">  查看卖家  </t-button>
                    </t-col>
                    <t-col :span="3">
                        <t-button theme="primary" size="large" variant="base" @click="payment(id)" v-show="data.userId!=this.$store.state.userData.id">  立即下单  </t-button>
                    </t-col>
                </t-row>
            </div>
        </t-col>
    </t-row>
</div>
</template>

<script>
import { MessagePlugin } from 'tdesign-vue-next'

export default {
    name: 'ItemAdd',
    data(){
        return {
            id : -1,
            data : [],
            pictures : [],
        }
    },
    watch:{
        $route:{
            immediate:true,
            handler(){
                if(this.$route.query.id){
                    if(this.id != this.$route.query.id && this.$route.query.id > 999999999){
                        this.id = this.$route.query.id
                        this.getItemInfo()
                    }
                }
            }
        }
    },
    methods:{
        getItemInfo(){
            var msg = MessagePlugin.loading("正在获取")
            var data = new FormData()
            data.append("id",Number(this.id))
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/commodity/getCommodityById",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                MessagePlugin.close(msg)
                if(dataReturn['code']==200){
                    this.data = dataReturn['data']
                }else{
                    this.data = this.$store.state.Itemdata //从全局变量获取
                }
                if(this.data.pictures != null){
                    this.pictures = this.data.pictures.split(";") //分割字符串
                }
                console.log(this.pictures)
                this.axios.defaults.headers.common['token'] = ''
            })
        },
        payment(id){
            var data = new FormData()
            data.append("id",Number(id))
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/deal/purchase",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                MessagePlugin.success("下单完毕，若成功可在[我的账号->我的购买]里查看 代码:"+dataReturn['code']+" 结果:"+dataReturn['msg'])
                this.axios.defaults.headers.common['token'] = ''
            })
        },
        changePage(newpage){
            this.$router.push('/'+newpage)
        },
    }
}
</script>

<style>
/* .t-swiper__content{
    height: 200px
} */

</style>