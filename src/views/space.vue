<template>
<div style="margin:30px;">
    <h1>账号信息 - {{ id }} <span class="badge bg-secondary" id="num" style="float:right;">Star:{{ data.star }}</span></h1>
    <t-list :split="true" stripe>
        <t-list-item>
            <t-list-item-meta :image="avatar" :title="data.nickname" description="注册时间:1970-01-01" />
        </t-list-item>
        <div style="margin-bottom: 16px" />
        <t-list-item title="111">
            <t-list-item-meta title="姓名" :description="data.realName" />
            <template #action>
                <t-input size="large" v-model="data.realName" clearable placeholder="" v-show="modify"/>
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
                <t-select size="large" v-model="sex" :options="options" placeholder="请选择你的性别~" />
            </template>
        </t-list-item>
        <t-list-item>
            <t-list-item-meta title="签名" :description="data.sig" />
            <template #action>
                <t-input size="large" v-model="data.sig" clearable placeholder="" v-show="modify"/>
            </template>
        </t-list-item>
    </t-list>
    <div style="margin-bottom: 16px" />
    <t-button size="large" variant="outline" v-show="modify" style="float:right;"> 更新我的资料 </t-button>
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
                    MessagePlugin.success("获取信息成功")
                    this.data = dataReturn['data']
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
            var data = new FormData()
            data.append("")
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