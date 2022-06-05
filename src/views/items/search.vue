<template>
<div style="margin:30px;">
    <h1>搜索 - {{ key }}</h1>
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

import { MessagePlugin } from 'tdesign-vue-next';
import item from '../../components/item.vue'

export default {
    name: 'ItemSearch',
    data(){
        return{
            key: '',
            current: 1,
            pageSize: 10,
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
                if(this.$route.query.key){
                    this.key = this.$route.query.key
                    this.search()
                }
            }
        }
    },
    methods:{
        search(){
            var msg = MessagePlugin.loading("正在搜索:"+this.key)
            var data = new FormData()
            data.append("page",this.current)
            data.append("size",this.pageSize)
            data.append("searchKey",this.key) //这个参必须有
            data.append("sortType","-1")
            data.append("sortBy","price")

            this.axios.post("/api/commodity/search",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("读取成功")
                    MessagePlugin.close(msg)
                    console.log(this.datas)
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
            this.search()
        },
        onCurrentChange(index){
            this.current = index
            this.search()
        },
        onChange(pageInfo){
            console.log(pageInfo)
        },
    }
}

</script>