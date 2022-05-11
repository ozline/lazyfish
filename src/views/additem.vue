<template>
<div style="margin:30px;">
    <h1>上架物品</h1>
    <t-row  justify="center" style="margin-top:30px;">
        <t-col :span="5">
            <h4>实物图</h4>
            <div class="tdesign-upload-item">
                <t-upload
                    v-model="file1"
                    action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                    theme="image"
                    accept="image/*"
                    @fail="handleFail"
                ></t-upload>
            </div>
            <div class="tdesign-upload-item">
                <t-upload
                    v-model="file1"
                    action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                    theme="image"
                    accept="image/*"
                    @fail="handleFail"
                ></t-upload>
            </div>
            <div class="tdesign-upload-item">
                <t-upload
                    v-model="file1"
                    action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                    theme="image"
                    accept="image/*"
                    @fail="handleFail"
                ></t-upload>
            </div>
            <div class="tdesign-upload-item">
                <t-upload
                    v-model="file1"
                    action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                    theme="image"
                    accept="image/*"
                    @fail="handleFail"
                ></t-upload>
            </div>
        </t-col>
        <t-col :span="3">
            <h4>类别 & 描述</h4>
            <div style="margin-top:30px;">
                <t-select v-model="categoryChoose" :options="options" placeholder="请选择" multiple @click="changeCategory" />
            </div>
            <div style="margin-top:30px;">
                <t-textarea
                    placeholder="请输入商品描述"
                    name="description"
                    :autosize="{ minRows: 9, maxRows: 20 }"
                />
            </div>
        </t-col>
        <t-col :span="3" style="margin-left:20px;">
            <h4>价格 & 操作</h4>
            <div style="margin-top:30px;">
                <div style="margin-top:20px;">
                    <t-input-number v-model="value3" :min="0" placeholder="原价"/>
                </div>
                <div style="margin-top:20px;">
                    <t-input-number v-model="value3" :min="0" placeholder="现价"/>
                </div>
                <div style="margin-top:150px;">
                    <!-- <button type="button" class="btn btn-primary">登录</button> -->
                    <t-button theme="primary" size="large" variant="base">  提交管理审核  </t-button>
                </div>
            </div>
        </t-col>
    </t-row>
</div>
</template>

<style scoped>
.tdesign-upload-item {
    display: inline-block !important;
    margin-right: 40px !important;
    margin-top: 20px;
}

</style>

<script>

import { MessagePlugin } from 'tdesign-vue-next';

export default {
    name: 'ItemDetail',
    data(){
        return{
            files: [],
            options: [
                { label: '衣物', value: '1' },
                { label: '学习', value: '2' },
                { label: '饰品', value: '3' },
                { label: '其他', value: '4' },
            ],
            categoryChoose : [],
        }
    },
    methods:{
        changeCategory(){
            MessagePlugin.success(`更换类别`)
            console.log(this.categoryChoose)
        },
    }
}
</script>