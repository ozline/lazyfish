<template>
      <div>
        <t-layout>
            <t-header>
                <t-head-menu theme="light">
                    <tempalte>
                      图标预留
                    </tempalte>
                    <template #operations>
                        <div class="d-flex justify-content-start" style="margin-left:5px;margin-right:5px;">
                          <input class="form-control me-2" placeholder="商品名.." v-model="msgSearch">
                          <button class="btn btn-outline-primary btn-sm" @click="search()">Search</button>
                        </div>
                    </template>
                </t-head-menu>
            </t-header>
            <t-layout>
                <t-aside width="150px">
                    <t-menu theme="light" :collapsed="collapsed" height="550px" width="150px">
                        <t-menu-item vaule="item0" @click="changePage('')"> 首页 </t-menu-item>
                        <t-submenu value="category" title="分类">
                            <t-menu-item value="category-1" @click="changePage('category')"> 衣物 </t-menu-item>
                            <t-menu-item value="category-2"> 学习 </t-menu-item>
                            <t-menu-item value="category-3"> 饰品 </t-menu-item>
                            <t-menu-item value="category-4"> 其他 </t-menu-item>
                        </t-submenu>
                        <t-divider />
                        <t-menu-item value="item0" @click="changePage('detail')"> [临时] 商品详情</t-menu-item>
                        <t-menu-item value="item4" @click="changePage('login')"> 用户中心 </t-menu-item>
                        <t-menu-item value="item1"> 上闲置 </t-menu-item>
                        <t-menu-item value="item2"> 操作指引 </t-menu-item>
                        <t-menu-item value="item3"> 联系我们 </t-menu-item>
                        <template #operations>
                          <t-icon class="t-menu__operations-icon" :name="iconName" @click="changeCollapsed" />
                        </template>
                    </t-menu>
                </t-aside>
                <t-layout>
                    <t-content>
                        <div style="margin:30px;">
                          <router-view></router-view>
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

<script>
export default {
  name: 'App',
  data(){
    return{
      collapsed : false,
      iconName : 'chevron-left',
    }
  },
  methods: {
    changePage(newpage){
      this.$router.push('/'+newpage)
    },
    changeCollapsed(){
      this.collapsed = !this.collapsed
      this.iconName = this.collapsed ? 'chevron-right' : 'chevron-left'
    }
  }
}
</script>

<style>
.t-layout{
  background-color: #fff;
}

/* .t-head-menu{
  background-color: #fc7120 !important;
} */

:root{
  --td-bg-color-page:#fff !important;
}
</style>

