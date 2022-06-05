<template>
<div style="margin:30px;">
    <h1>我的出售</h1>
    <t-collapse expand-mutex style="margin-top:26px">
        <t-collapse-panel
            v-for="(item,index) in data"
            v-bind:key="index"
            :value="index"
            :description="item.createTime"
            :header="item.createTime">
        订单ID: {{ item.id }}<br>
        商品ID: {{ item.commodityId }}<br>
        创建时间: {{ item.createTime }}<br>
        买方学号: {{ item.buyerId }}<br>
        卖方学号: {{ item.sellerId }}<br>
        买方是否已查阅: {{ item.buyerVis ? '已查阅' : '未查阅' }}<br>
        卖方是否已查阅: {{ item.sellerVis ? '已查阅' : '未查阅' }}<br>
        </t-collapse-panel>
    </t-collapse>
    <div style="margin-bottom: 16px" />
    <t-button size="large" variant="outline" style="float:right;" @click="refresh"> 刷新 </t-button>
</div>
</template>

<script>
import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'MySell',
    created(){
        this.refresh()
    },
    data(){
        return {
            data : [],
        }
    },
    methods: {
        refresh(){
            var msg = MessagePlugin.loading("正在获取")
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.get("/api/deal/sellInfo").then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                console.log(dataReturn)
                if(dataReturn['code']==200){
                    this.data = dataReturn['data']
                }else{
                    MessagePlugin.error("获取信息失败:"+dataReturn['msg'])
                }
            })
            MessagePlugin.close(msg)
            this.axios.defaults.headers.common['token'] = ''
        }
    }
}

</script>