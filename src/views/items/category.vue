<template>
<div style="margin:30px;">
    <h1>商品分类 - {{ category }}</h1>
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
            total : 0,
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
            var msg = MessagePlugin.loading("正在读取分类:"+this.category)
            var data = new FormData()
            data.append("page",this.current)
            data.append("size",this.pageSize)
            data.append("searchKey","") //这个参必须有
            data.append("sortType","-1")
            data.append("sortBy","price")
            data.append("type",this.category)

            this.axios.post("/api/commodity/search",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("获取成功",500)
                    MessagePlugin.close(msg)
                    this.datas = dataReturn['data']['docList']
                    this.total = dataReturn['data']['total']
                }else{
                    MessagePlugin.error("读取失败:"+dataReturn['msg'])
                    MessagePlugin.close(msg)
                }
            })
        },
        onPageSizeChange(size){
            this.pageSize = size
            this.initcategory()
        },
        onCurrentChange(index){
            this.current = index
            this.initcategory()
        },
        onChange(pageInfo){
            console.log(pageInfo)
        },
    },
}
</script>