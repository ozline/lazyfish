<template>
<div style="margin:30px;">
    <h1>收货地址</h1>
    <t-list :split="true" style="margin-top:30px;">
        <t-list-item
            v-for="(addr,index) in data"
            v-bind:key="addr"
        >
            <t-list-item-meta :image="avatar" :title="'收货地址 - '+(index+1)" :description="addr.address" />
            <template #action>
            <span>
                <span class="badge bg-secondary" v-show="addr.isDefault" >默认收货地址</span>
                <t-button variant="text" v-show="!addr.isDefault" @click="setDefaultAddress(addr.id,addr.address)">设为默认地址</t-button>
                <t-button variant="text" @click="visibleModal=true;current=addr.id;newAddress=addr.address">更新地址</t-button>
                <t-button variant="text" @click="deleteAddress(addr.id)" v-show="false">删除</t-button>
            </span>
            </template>
        </t-list-item>
    </t-list>
    <div style="margin-bottom: 16px" />
    <t-button size="large" variant="outline" style="float:right;" @click="visibleModal=true;newAddress=''"> 新增收货地址 </t-button>
    <t-dialog
        v-model:visible="visibleModal"
        header="修改地址"
        mode="modal"
        draggable
        :on-confirm="updateAddress"
        >
        <template #body>
            <t-textarea
                v-model="newAddress"
                :placeholder="newAddress"
                name="description"
                :autosize="{ minRows: 5, maxRows: 3 }"
            />
        </template>
    </t-dialog>
    <t-dialog
        v-model:visible="visibleModal"
        header="新增收货地址"
        mode="modal"
        draggable
        :on-confirm="addAddress"
        >
        <template #body>
            <t-textarea
                v-model="newAddress"
                :placeholder="newAddress"
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
    name: 'AccountAddress',
    data(){
        return{
            id: -1,
            data : [],
            avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
            modify: this.id==this.$store.state.userData.id,
            visibleModal : false,
            current : -1,
            newAddress : ""
        }
    },
    created(){
        this.refreshAddress()
    },
    methods:{
        refreshAddress(){
            var msg = MessagePlugin.loading("正在获取收货地址")
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.get("/api/user/showAddr").then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("获取信息成功")
                    this.data = dataReturn['data']
                }else{
                    MessagePlugin.error("获取信息失败:"+dataReturn['msg'])
                }
            })
            MessagePlugin.close(msg)
            this.axios.defaults.headers.common['token'] = ''
        },
        updateAddress(){
            var data = new FormData()
            data.append("address",this.newAddress)
            data.append("id",this.current)
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.put("/api/user/updateAddr",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("修改地址成功")
                    this.refreshAddress()
                }else{
                    MessagePlugin.error("修改失败:"+dataReturn['msg'])
                }
            })
            this.visibleModal=false
            this.axios.defaults.headers.common['token'] = ''
        },
        deleteAddress(id){
            const confirmDia = this.$dialog.confirm({
                header: '敏感操作提示',
                body: '确定要删除吗?',
                theme: "warning",
                confirmBtn: '确认',
                cancelBtn: '取消',
                onConfirm: ({ e }) => {
                    console.log('e: ', e);
                    console.log('e: ', id);
                    this.axios.delete("/api/user/deleteAddr")
                    confirmDia.destroy();
                },
                onClose: ({ e, trigger }) => {
                console.log('e: ', e);
                console.log('trigger: ', trigger);
                confirmDia.hide();
                },
            });
        },
        addAddress(){
            if(this.newAddress==''){
                MessagePlugin.error("请输入正确地址")
                return
            }
            var data = new FormData()
            data.append("address",this.newAddress)
            data.append("isDefault",false)
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/user/addAddr",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("新增收货地址成功")
                    this.refreshAddress()
                }else{
                    MessagePlugin.error("新增失败:"+dataReturn['msg'])
                }
            })
            this.visibleModal=false
            this.axios.defaults.headers.common['token'] = ''
        },
        setDefaultAddress(id,addr){
            var data = new FormData()
            data.append("address",addr)
            data.append("id",Number(id))
            data.append("isDefault",true)
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.put("/api/user/updateAddr",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("设为默认收货地址成功")
                    this.refreshAddress()
                }else{
                    MessagePlugin.error("设置失败:"+dataReturn['msg'])
                }
            })
            this.visibleModal=false
            this.axios.defaults.headers.common['token'] = ''
        }
    },
}
</script>