<template>
<div style="margin:30px;">
    <h1>404 Not Found <br><br>你要找的东西不存在</h1>
    <br>
    <button type="button" class="btn btn-outline-primary" @click="back()">点此返回上一页</button>
</div>
</template>

<script>
export default {
    name: 'NotFound',
    methods:{
        back(){
            if(window.history.length >1){
                this.$router.go(-1)
            }else{
                this.$router.push({
                path: '/'
                })
            }
        },
    }
}
</script>