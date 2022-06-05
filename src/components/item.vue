<template>
    <div class="col-sm-6" style="margin-top:10px;">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title" v-html="data.title"></h5>
            <p class="card-text" >{{ data.description }}(发布ID:{{ data.userId }})</p>
            <a href="#" class="btn btn-primary" @click="changePage('detail?id='+id)">查看详情</a>
        </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ItemInfo',
    props: ["id","data"],
    methods: {
        changePage(newpage){
            this.$store.state.Itemdata = this.data
            this.$router.push('/'+newpage)
        },
    },
}
</script>