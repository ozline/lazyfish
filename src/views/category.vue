<template>
<div style="margin:30px;">
    <h1>商品分类 - {{ category }}</h1>
    <div class="row">
        <!-- <item
            v-for="data in datas"
            v-bind:key="data.id"
        ></item> -->
        <item
            v-for="index in pageSize"
            v-bind:key="index"
            v-bind:id="1523897667586244609"
        ></item>
    </div>
    <t-pagination
        style="margin-top:20px"
        :total="36"
        :default-current="2"
        :default-page-size="10"
        show-first-and-last-page-btn
        @current-change="onCurrentChange"
        @page-size-change="onPageSizeChange"
        @change="onChange"
    />
</div>
</template>

<script>

import item from '../components/item.vue'
import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'ItemCategory',
    data(){
        return{
            current: 1,
            pageSize: 10,
            category: this.$store.state.categories.get(Number(this.$route.query.type)),
            type : -1,
            datas : [],
            num : -1,
        }
    },
    components:{
        item,
    },
    watch:{
        $route:{
            immediate:true,
            handler(){
                if(this.$route.query.type){
                    this.type = this.$route.query.type
                    this.category = this.$store.state.categories.get(Number(this.$route.query.type))
                    this.initcategory()
                }
            }
        }
    },
    methods:{
        initcategory(){
            // var msg = MessagePlugin.loading("正在读取分类:"+this.category)
            var data = new FormData()
            data.append("page",this.current)
            data.append("size",this.pageSize)
            // data.append("searchKey","")
            data.append("sortType","-1")
            data.append("sortBy","price")
            data.append("type",this.category)
            // this.axios.get("/api/commodity/search",{data}).then((res)=>{
            //     MessagePlugin.success("读取数据完毕")
            //     MessagePlugin.close(msg)
            //     var dataReturn = JSON.parse(JSON.stringify(res.data))
            //     console.log(dataReturn)
            //     this.num = dataReturn['data']['total']
            //     this.datas = dataReturn['data']['docList']
            // })
            // var request = require('request');
            // request({
            //     url: "/api/commodity/search",
            //     method: "GET",
            //     headers: {
            //         "content-type": "multipart/form-data",
            //     },
            //     body: data
            // }, function(error, response, body) {
            //     //判断是否请求成功
            //     if (!error && response.statusCode == 200) {
            //         console.log(body)
            //     }
            // })
        },
        onPageSizeChange(size){
            this.pageSize = size
            MessagePlugin.success(`pageSize变化为${size}`)
        },
        onCurrentChange(index,pageInfo){
            MessagePlugin.success(`转到第${index}页 pageInfo:${pageInfo}`);
        },
        onChange(pageInfo){
            console.log(pageInfo)
        },
    },
}
</script>