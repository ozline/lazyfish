<template>
    <div>
        <t-layout>
            <t-header>
                <t-head-menu theme="dark">
                    <t-menu-item value="item1">菜单1</t-menu-item>
                    <template #operations>
                        <div class="demo-box">test</div>
                    </template>
                </t-head-menu>
            </t-header>
            <t-layout>
                <t-aside>
                    <t-menu theme="light" expand-mutex :expanded="category" default-value="category-2" height="550px">
                        <t-submenu value="category" title="分类">
                            <t-menu-item value="category-1"> 衣物 </t-menu-item>
                            <t-menu-item value="category-2"> 学习 </t-menu-item>
                            <t-menu-item value="category-3"> 饰品 </t-menu-item>
                            <t-menu-item value="category-3"> 其他 </t-menu-item>
                        </t-submenu>
                        <t-divider />
                        <t-menu-item value="item1"> 上闲置 </t-menu-item>
                        <t-menu-item value="item2"> 操作指引 </t-menu-item>
                        <t-menu-item value="item3"> 联系我们 </t-menu-item>
                        <t-menu-item value="item4" :disabled="true"> 调度平台 </t-menu-item>
                        <t-menu-item value="item5"> 精准监控 </t-menu-item>
                        <t-menu-item value="item6"> 消息区 </t-menu-item>
                        <t-menu-item value="item7"> 个人中心 </t-menu-item>
                        <t-menu-item value="item8"> 视频区 </t-menu-item>
                        <t-menu-item value="item9"> 资源编辑 </t-menu-item>
                        <t-menu-item value="item9"> 资源编辑 </t-menu-item>
                    </t-menu>
                </t-aside>
                <t-layout>
                    <t-content>
                        <div>
                            content
                        </div>
                    </t-content>
                    <t-footer>
                        Copyright @ 2022-{{ new Date().getFullYear() }} Lazyfish. All Rights Reserved
                    </t-footer>
                </t-layout>
            </t-layout>
        </t-layout>
    </div>

</template>

<style>
.demo-box {
    width: 200px;
    height: 40px;
    line-height: 40px;
    background: rgba(255, 255, 255, 0.3);
    color: #fff;
    text-align: center;
}
</style>

<script>
export default {
    name:"NavBar",
}
</script>