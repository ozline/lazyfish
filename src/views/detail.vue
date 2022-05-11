<template>
<div style="margin:30px;">
    <h1>商品详情 - 七成新的小熊饼干</h1>
    <t-row style="margin-top:30px;" justify="center">
        <t-col :span="5">
            <h3>实物图</h3>
        </t-col>
        <t-col :span="4">
            <h3>详细信息</h3>
            <div style="margin-top:30px">
                <h4>类别 - 其他</h4>
            </div>
            <div style="margin-top:30px">
                <h2 style="color:#FC7120;">当前价格 - 999元</h2>
            </div>
            <div style="margin-top:30px">
                <h4>商品描述</h4>
                <h5>草莓味的,只吃过一块,还有1小时过期</h5>
            </div>
            <div style="margin-top:200px;">
                <t-button theme="primary" size="large" variant="outline" style="width:100px">  卖同款  </t-button>
                <t-button theme="primary" size="large" variant="base" style="margin-left:100px;">  立即下单  </t-button>
            </div>
        </t-col>
    </t-row>
</div>
</template>

<script>

export default {
    name: 'ItemAdd',
}
</script>