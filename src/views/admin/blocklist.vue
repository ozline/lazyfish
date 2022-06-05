<template>
<div style="margin:30px;">
    <h1>封禁名单</h1>
    <t-collapse expand-mutex style="margin-top:26px" v-if="datas.length>0">
        <t-collapse-panel
            v-for="item in datas"
            v-bind:key="item.id"
            :value="item.id"
            :description="item.id"
            :header="item.id">
        学号: {{ item.id }} <br>
        姓名: {{ item.realName }} <br>
        创建时间: {{ item.createTime }} <br>
        手机号: {{ item.phoneNum==null ? "null" : item.phoneNum }} <br>
        </t-collapse-panel>
    </t-collapse>
</div>
</template>

<script>
import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'BlockList',
    created(){
        this.refresh()
    },
    data(){
        return {
            datas : [],
        }
    },
    methods: {
        refresh(){
            var msg = MessagePlugin.loading("正在获取")

            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.get("/api/admin/paused").then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                MessagePlugin.close(msg)
                if(dataReturn['code']==200){
                    if(dataReturn['data'] != null && dataReturn['data'].length>0){
                        this.datas = dataReturn['data']
                        console.log(this.datas)
                        console.log(dataReturn['data'])
                        MessagePlugin.success("获取成功")
                    }else{
                        MessagePlugin.success("获取失败:无被封禁用户")
                    }
                }else{
                    MessagePlugin.error("获取信息失败:"+dataReturn['msg'])
                }
            })
            this.axios.defaults.headers.common['token'] = ''
        },
    }
}

</script>