<template>
<div>
    <div class="row">
        <item
            v-for="index in pageSize"
            v-bind:key="index"
        ></item>
    </div>
    <t-pagination
        style="margin-top:20px"
        :total="36"
        :default-current="2"
        :default-page-size="10"
        show-first-and-last-page-btn
        @current-change="onCurrentChange"
        @page-size-change="onPageSizeChange"
        @change="onChange"
    />
</div>
</template>

<script>

import item from '../components/item.vue'
import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'ItemCategory',
    data(){
        return{
            current: 1,
            pageSize: 10,
        }
    },
    components:{
        item,
    },
    methods:{
        onPageSizeChange(size){
            this.pageSize = size
            MessagePlugin.success(`pageSize变化为${size}`)
        },
        onCurrentChange(index,pageInfo){
            MessagePlugin.success(`转到第${index}页 pageInfo:${pageInfo}`);
        },
        onChange(pageInfo){
            console.log(pageInfo)
        },
    },
}
</script>