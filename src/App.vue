<template>

<div>
  <t-layout>
    <t-header>
      <t-head-menu theme="light">
        <tempalte>
          /此处预留/
        </tempalte>
        <t-button theme="default" shape="square" variant="text" @click="changeCollapsed">
          <t-icon class="collapsed-icon" name="view-list" />
        </t-button>
        <template #operations>
          <div class="d-flex justify-content-start" style="margin-left:5px;margin-right:5px;">
            <!-- <input class="form-control me-2" placeholder="商品名.." v-model="msgSearch"> -->
            <input class="form-control me-2" placeholder="商品名..">
            <!-- <button class="btn btn-outline-primary btn-sm" @click="search()">Search</button> -->
            <t-button size="large" variant="outline"> 搜索 </t-button>
          </div>
        </template>
      </t-head-menu>
    </t-header>
    <t-layout>
      <t-aside>
        <t-menu theme="light" :collapsed="collapsed" height="550px">
          <t-menu-item vaule="item0" @click="changePage('')">
            <template #icon>
              <t-icon name="app" />
            </template>
            首页
          </t-menu-item>
          <t-submenu value="category" title="分类">
            <template #icon>
              <t-icon name="server" />
            </template>
            <t-menu-item value="category-1" @click="changePage('category')"> 衣物 </t-menu-item>
            <t-menu-item value="category-2"> 学习 </t-menu-item>
            <t-menu-item value="category-3"> 饰品 </t-menu-item>
            <t-menu-item value="category-4"> 其他 </t-menu-item>
          </t-submenu>
          <t-divider />
          <t-menu-item value="item0" @click="changePage('detail')">
            <template #icon>
              <t-icon name="check-circle" />
            </template>
            [临时] 商品详情
          </t-menu-item>
          <t-menu-item value="item4" @click="changePage('login')">
            <template #icon>
              <t-icon name="user-circle" />
            </template>
            用户中心
          </t-menu-item>
          <t-menu-item value="item1">
            <template #icon>
              <t-icon name="caret-up" />
            </template>
            上闲置
          </t-menu-item>
          <t-menu-item value="item2">
            <template #icon>
              <t-icon name="help-circle" />
            </template>
            操作指引
          </t-menu-item>
          <t-menu-item value="item3">
            <template #icon>
              <t-icon name="call" />
            </template>
            联系我们
          </t-menu-item>
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

import { MessagePlugin } from 'tdesign-vue-next';

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
      MessagePlugin.success(`切换页面成功`)
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

