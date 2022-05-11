<template>
    <div class="col-sm-6" style="margin-top:10px;">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ title }} 七成新的小熊饼干</h5>
            <p class="card-text">{{ description }} 草莓味的,只吃过一块,还有1小时过期</p>
            <a href="#" class="btn btn-primary" @click="changePage('detail')">查看详情</a>
        </div>
        </div>
    </div>
</template>

<script>

import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'ItemInfo',
    props: ["title","description","id"],
    methods: {
        changePage(newpage){
            this.$router.push('/'+newpage)
            MessagePlugin.success(`加载页面成功`)
        },
    },
}
</script>