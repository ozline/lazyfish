<template>
<div style="margin:30px;">
    <h1>账号信息 - {{ id }} <span class="badge bg-secondary" id="num" style="float:right;">Star:{{ data.star }}</span></h1>
    <t-list :split="true" stripe>
        <t-list-item>
            <t-list-item-meta :image="avatar" :title="data.nickname" :description="'注册时间:' + data.createTime == null ? '1970-01-01' : data.createTime" />
        </t-list-item>
        <div style="margin-bottom: 16px" />
        <t-list-item>
            <t-list-item-meta title="姓名" :description="data.realName" />
            <template #action>
                <t-input size="large" v-model="data.realName" clearable placeholder="" v-show="modify"/>
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="昵称" :description="data.nickname==null ? 'null' : data.nickname" />
            <template #action>
                <t-input size="large" v-model="data.nickname" clearable placeholder="" v-show="modify"/>
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="电话" :description="data.phoneNum" />
            <template #action>
                <t-input size="large" v-model="data.phoneNum" clearable placeholder="" v-show="modify"/>
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="性别" :description="getSex(data.sex)" />
            <template #action>
                <t-select size="large" v-model="sex" :options="options" placeholder="请选择你的性别~" v-show="modify"/>
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="签名" :description="data.sig" />
            <template #action>
                <t-input size="large" v-model="data.sig" clearable placeholder="" v-show="modify"/>
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="邮箱" :description="data.email==null ? 'null' : data.email" />
            <template #action>
                <t-input size="large" v-model="data.email" clearable placeholder="" v-show="modify"/>
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="账号状态" :description="data.deleted==0 ? '正常' : '被禁用'" />
        </t-list-item>
        <t-list-item v-show="modify || this.$store.state.userStatus">
            <t-list-item-meta title="可用余额" :description="data.money==null ? '不可用' : data.money.toString()"/>
        </t-list-item>
    </t-list>
    <div style="margin-bottom: 16px" />
    <t-row :gutter="12">
        <t-col :span="3">
        </t-col>
        <t-col :span="3">
            <t-button size="large" theme="primary" v-show="this.$store.state.userStatus" style="float:right;" @click="visibleModalMoney = true"> 变更余额 </t-button>
        </t-col>
        <t-col :span="3">
            <t-button size="large" theme="danger" v-show="this.$store.state.userStatus" style="float:right;" @click="blockuser"> 封禁用户 </t-button>
        </t-col>
        <t-col :span="3">
            <t-button size="large" variant="outline" v-show="modify" style="float:right;" @click="updateInfo"> 更新我的资料 </t-button>
            <t-button size="large" variant="outline" v-show="!modify" style="float:right;" @click="staruser"> 给TA点赞 </t-button>
            <t-button size="large" variant="outline" v-show="!modify" style="float:right;" @click="unstaruser"> 踩一下TA </t-button>
        </t-col>
    </t-row>
    <t-dialog
    v-model:visible="visibleModalMoney"
    header="变更账户余额"
    mode="modal"
    draggable
    :on-confirm="updateMoney"
    >
    <template #body>
        <t-input-number
        v-model="newMoney"
        :max="9999999"
        :min="-99999999"
        :step="20"
        :decimal-places="2"
        :autoWidth="true"
        ></t-input-number>
    </template>
    </t-dialog>
</div>
</template>

<script>
import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'AccountSpace',
    data(){
        return{
            id: -1,
            data : [],
            avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
            modify: this.id==this.$store.state.userData.id,
            options: [
                { label: '男孩子', value: '0' },
                { label: '女孩子', value: '1' },
                { label: '还不知道呢', value: '2' },
            ],
            sex: 0,
            newMoney: 100.00,
            visibleModalMoney: false,

        }
    },
    methods:{
        refreshInfo(){
            var msg = MessagePlugin.loading("正在获取资料")
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            var data = new FormData()
            data.append("userId",this.id)
            this.axios.post("/api/user/getUserById",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    // MessagePlugin.success("获取信息成功")
                    this.data = dataReturn['data']
                    console.log(this.data)
                    this.sex = this.getSex(this.data.sex)
                }else{
                    MessagePlugin.error("获取信息失败:"+dataReturn['msg'])
                }
            })
            MessagePlugin.close(msg)
            this.axios.defaults.headers.common['token'] = ''
        },
        getSex(sex){
            if(sex==0) return '男孩子'
            if(sex==1) return '女孩子'
            if(sex==2) return '还不知道呢'
        },
        returnSex(sex){
            if(sex=='男孩子') return 0
            if(sex=='女孩子') return 1
            if(sex=='还不知道呢') return 2
        },
        updateInfo(){
            if(this.data.sig==null || this.data.phoneNum==null || this.data.nickname==null || this.data.email==null || this.data.realName==null){
                MessagePlugin.error("信息不完整，请补充")
                return
            }
            var data = new FormData()
            data.append("email",this.data.email)
            data.append("nickName",this.data.nickname)
            data.append("phoneNum",this.data.phoneNum)
            data.append("sex",this.returnSex(this.sex))
            data.append("sig",this.data.sig)
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            this.axios.post("/api/user/completeInfo",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("更新信息成功")
                }else{
                    MessagePlugin.error("更新信息失败:" + dataReturn['msg'])
                }
                this.axios.defaults.headers.common['token'] = ''
            })
        },
        blockuser(){
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            var data = new FormData()
            data.append("id",this.id)
            this.axios.post("/api/admin/pauseAccount",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("停用账号成功")
                }else{
                    MessagePlugin.error("停用账号失败:"+dataReturn['msg'])
                }
                this.axios.defaults.headers.common['token'] = ''
            })
        },
        staruser(){
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            var data = new FormData()
            data.append("id",this.id)
            data.append("type",1)
            this.axios.post("/api/user/changeStar",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("给TA点赞成功")
                }else{
                    MessagePlugin.error("给TA点赞失败:"+dataReturn['msg'])
                }
                this.axios.defaults.headers.common['token'] = ''
                this.refreshInfo()
            })
        },
        unstaruser(){
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            var data = new FormData()
            data.append("id",this.id)
            data.append("type",-1)
            this.axios.post("/api/user/changeStar",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("给TA踩一脚成功")
                }else{
                    MessagePlugin.error("给TA踩一脚失败:"+dataReturn['msg'])
                }
                this.axios.defaults.headers.common['token'] = ''
                this.refreshInfo()
            })
        },
        updateMoney(){
            this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
            var data = new FormData()
            data.append("ids",this.id)
            data.append("changes",this.newMoney)
            this.axios.post("/api/admin/changeMoney",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if(dataReturn['code']==200){
                    MessagePlugin.success("账户余额变更成功")
                }else{
                    MessagePlugin.error("账户余额变更失败:"+dataReturn['msg'])
                }
                this.axios.defaults.headers.common['token'] = ''
                this.refreshInfo()
                this.visibleModalMoney = false
            })
        }
    },
    watch:{
        $route:{
            immediate:true,
            handler(){
                if(this.$route.query.id){
                    this.id = this.$route.query.id
                    this.modify= this.id==this.$store.state.userData.id
                    this.refreshInfo()
                }
            }
        }
    },
}
</script>