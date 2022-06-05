<template>
<div style="margin:30px;">
    <h1>商品审核</h1>
    <t-collapse expand-mutex style="margin-top:26px" v-if="datas.length>0">
        <t-collapse-panel
            v-for="(item,index) in datas"
            v-bind:key="index"
            :value="index"
            :description="item.title"
            :header="'来自  '+item.userId+'  的'+item.title">
        商品编号: {{ item.id }}<br>
        卖家学号: {{ item.userId }}<br>
        发布时间: {{ item.createTime }}<br>
        最后更新: {{ item.updateTime }}<br>
        名称: {{ item.title }}<br>
        类型: {{ item.type }}<br>
        简介: {{ item.description }}<br>
        原价: {{ item.oldPrice }}<br>
        现价: {{ item.price }}<br>
            <t-row :gutter="12">
                <t-col :span="3">
                </t-col>
                <t-col :span="3">
                </t-col>
                <t-col :span="3">
                    <t-button theme="danger" size="large" @click="currentID=item.id;visibleModal=true">  拒绝  </t-button>
                </t-col>
                <t-col :span="3">
                    <t-button theme="primary" size="large" variant="base" @click="accept(item.id)">  同意  </t-button>
                </t-col>
            </t-row>
        </t-collapse-panel>
    </t-collapse>
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
    <t-dialog
        v-model:visible="visibleModal"
        header="拒绝原因"
        mode="modal"
        draggable
        :on-confirm="refuse"
        >
        <template #body>
            <t-textarea
                v-model="reason"
                :placeholder="reason"
                name="description"
                :autosize="{ minRows: 5, maxRows: 3 }"
            />
        </template>
    </t-dialog>
</div>
</template>

<script>
import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'AdminReview',
    created(){
        this.refresh()
    },
    data(){
        return {
            datas : [],
            current: 1,
            pageSize: 10,
            total: 0,
            reason: "",
            currentID: 0,
            visibleModal: false,
        }
    },
    methods: {
        refresh(){
            var msg = MessagePlugin.loading("正在获取")
            var data = new FormData()
            data.append("currentPage",Number(this.current))
            data.append("pageSize",Number(this.pageSize))

            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/admin/showNotChecked",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                console.log(dataReturn)
                if(dataReturn['code']==200){
                    this.datas = dataReturn['data']['records']
                    this.total = dataReturn['data']['total']
                }else{
                    MessagePlugin.error("获取信息失败:"+dataReturn['msg'])
                }
            })
            MessagePlugin.close(msg)
            this.axios.defaults.headers.common['token'] = ''
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
        refuse(){
            var data = new FormData()
            data.append("ids",Number(this.currentID))
            data.append("reasons",this.reason)

            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/admin/refuseCommodityByIds",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                MessagePlugin.success("商品ID:"+this.currentID+" 已拒绝 返回代码:"+dataReturn['code'])
                this.axios.defaults.headers.common['token'] = ''
                this.visibleModal = false
                this.refresh()
            })
        },
        accept(id){
            var data = new FormData()
            data.append("ids",Number(id))

            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/admin/passCommodityByIds",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                MessagePlugin.success("商品ID:"+id+" 已过审 返回代码:"+dataReturn['code'])
                this.axios.defaults.headers.common['token'] = ''
                this.refresh()
            })
        }
    }
}

</script>