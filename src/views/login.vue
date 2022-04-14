<template>
<div>
    <div style="margin:30px;">
        <h2>登录</h2>
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
        <!-- <router-link to="/user/register" class="btn btn-outline-danger btn-lg" style="margin-left:20px;">注册</router-link> -->
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">{{ msgTitle }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {{ msg }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">我知道了</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
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
            var data = "muser="+this.username+"&passwd="+this.password+"&Verifycode="+this.verifycode
            this.axios.post("/cors/logincheck.asp",data).then((res)=>{
                console.log(res.data)
                console.log(res.status)
                console.log(res.headers)
            })
        }
    }
}
</script>

<style>
    /* ::placeholder{
        font-size:14px;
        line-height: 30px;
    } */
</style>