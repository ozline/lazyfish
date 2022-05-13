<template>
<div>
    <div style="margin:30px;">
        <h1>登录</h1>
        <div class="form-floating g-2" style="margin-top:26px;">
            <input class="form-control" placeholder="学号" v-model="username">
            <label for="username">用户名</label>
        </div>
        <div class="form-text">注册时使用的用户名</div>
        <div class="form-floating" style="margin-top:26px;">
            <input type="password" class="form-control" placeholder="passwd" v-model="password">
            <label for="passwd">密码</label>
        </div>
        <div class="form-text">用作登录的密码</div>
        <div class="row g-2 align-items-center" style="margin-top:26px;">
            <div class="col">
                <div class="form-floating">
                    <input class="form-control" placeholder="验证码" v-model="verifycode">
                    <label for="passwd">验证码</label>
                </div>
            </div>
            <div class="col-auto">
                <div style="float:right;">
                    <img v-bind:src="'/cors/plus/verifycode.asp?n='+num" style="width:200px;height:58px;" @click="this.num=Math.random();">
                </div>
            </div>
            <div class="form-text">点击图片刷新</div>
        </div>
        <!-- <div class="form-text">{{ localcookie }}</div> -->
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" @click="login" style="margin-top:36px;height:48px;">登录</button>
        </div>
        <!-- <button type="submit" class="btn btn-outline-danger btn-lg" @click="getCookie" style="margin-left:20px;margin-top:48px;">刷新Cookie</button> -->
    </div>
</div>
</template>


<script>

import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'UserLogin',
    data(){
        return {
            username: '',
            password: '',
            verifycode: '',
            msg: "NULL",
            msgTitle: "NULL",
            num:0,
            localcookie: document.cookie,
        }
    },
    methods: {
        getCookie(){
            this.localcookie=document.cookie
        },
        login(){
            var data = new FormData()
            data.append("username",this.username) //学号
            data.append("muser",this.username) //学号
            data.append("passwd",this.password) //密码
            data.append("verifyCode",this.verifycode) //验证码
            data.append("asp",document.cookie) //ASPSESSIONID 用于登录验证
            // var data = "muser="+this.username+"&passwd="+this.password+"&Verifycode="+this.verifycode

            //TODO:一共需要请求3次。。感觉可以优化一下？
            var msg = MessagePlugin.loading("正在登录中")
            this.axios.put("/api/user/activate",data).then((res)=>{
                var dataReturn = JSON.parse(JSON.stringify(res.data))
                if((dataReturn['msg']=="该学号已经激活过" && dataReturn['code']==401) || dataReturn['code']==200){
                    this.axios.post('/api/toLogin',data).then((res)=>{
                        dataReturn = JSON.parse(JSON.stringify(res.data))
                        if(dataReturn['code']==200){
                            MessagePlugin.close(msg)
                            var token = dataReturn['data']['token']
                            if(token!=null && token!=''){
                                this.$cookies.set("token",token)
                                this.axios.get("/api/user/user",{
                                    headers:{
                                        "token" : token,
                                    }
                                }).then((res)=>{
                                    dataReturn = JSON.parse(JSON.stringify(res.data))
                                    this.$store.state.userData = dataReturn['data']
                                    console.log(this.$store.state.userData)
                                })
                            }
                            this.$store.state.login = true
                            MessagePlugin.success("登录成功，即将跳转页面")
                            this.$router.push("/")
                        }else{
                            MessagePlugin.close(msg)
                            MessagePlugin.error("登录失败："+dataReturn['msg'])
                        }
                    })
                }else{
                    MessagePlugin.close(msg)
                    MessagePlugin.error("登录失败："+dataReturn['msg'])
                }
            })
        }
    }
}
</script>