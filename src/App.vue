<template>

<div>
  <t-layout>
    <t-header>
      <t-head-menu theme="light">
        <img src="https://files.ozline.icu/images/lazyfishLogo.png" width="32" height="32">
        <t-button theme="default" shape="square" variant="text" @click="changeCollapsed" style="margin-left:10px;">
          <t-icon class="collapsed-icon" name="view-list" />
        </t-button>
        <t-dropdown :min-column-width="135" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item class="operations-dropdown-container-item" @click="changePage('space?id='+this.$store.state.userData.id)">
                  <t-icon name="user-circle"></t-icon>个人中心
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="logout">
                  <t-icon name="poweroff"></t-icon>退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text" v-show="login">
              <template #icon>
                <t-icon class="header-user-avatar" name="user-circle" />
              </template>
              <div class="header-user-account">
                {{ username }}
                <t-icon name="chevron-down" />
              </div>
            </t-button>
          </t-dropdown>
        <template #operations>
          <div class="d-flex justify-content-start" style="margin-left:5px;margin-right:5px;">
            <t-input size="large" placeholder="商品名.." v-model="searchKey" />
            <t-button size="large" variant="outline" @click="search()"> 搜索 </t-button>
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
            <t-menu-item
              v-for="data in this.$store.state.categories_raw"
              v-bind:key="data.id"
              @click="changePage('category?type='+data.id)"
              v-bind:value="data.id"
            > {{ data.name }}</t-menu-item>
          </t-submenu>
          <t-divider />
          <t-menu-item value="item4" @click="changePage('login')" v-show="!login">
            <template #icon>
              <t-icon name="user-circle" />
            </template>
            登录账号
          </t-menu-item>
          <t-menu-item value="item1" @click="changePage('additem')" v-show="login">
            <template #icon>
              <t-icon name="caret-up" />
            </template>
            上闲置
          </t-menu-item>
          <t-submenu value="myaccount" title="我的账号" v-show="login">
            <template #icon>
              <t-icon name="view-list" />
            </template>
            <t-menu-item value="myaccount" @click="changePage('space?id='+this.$store.state.userData.id)">
              <t-icon name="user-circle"></t-icon>个人中心
            </t-menu-item>
            <t-menu-item value="address" @click="changePage('address')">
              <t-icon name="view-list"></t-icon>地址管理
            </t-menu-item>
            <t-menu-item value="mypurchase" @click="changePage('mypurchase')">
              <t-icon name="order-descending"></t-icon>我的购买
            </t-menu-item>
            <t-menu-item value="mysell" @click="changePage('mysell')">
              <t-icon name="order-ascending"></t-icon>我的出售
            </t-menu-item>
            <t-menu-item value="logout" @click="logout">
              <t-icon name="poweroff"></t-icon>退出登录
            </t-menu-item>
          </t-submenu>
          <t-submenu value="admin" title="管理员" v-show="status">
            <template #icon>
              <t-icon name="user" />
            </template>
            <t-menu-item value="reviewitem" @click="changePage('review')">
              <t-icon name="tools"></t-icon>商品审核
            </t-menu-item>
            <t-menu-item value="blocklist" @click="changePage('blocklist')">
              <t-icon name="usergroup"></t-icon>小黑屋管理
            </t-menu-item>
          </t-submenu>
          <t-divider />
          <!-- <t-menu-item value="item2" @click="changePage('about')">
            <template #icon>
              <t-icon name="help-circle" />
            </template>
            操作指引
          </t-menu-item> -->
          <t-menu-item value="item3" @click="changePage('about')">
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
      username : "-1",
      login : false,
      status: 0,
      searchKey: "",
    }
  },
  beforeCreate(){

    //获取分类列表
    var msg = MessagePlugin.loading(`正在读取数据`)
    this.axios.get("/api/commodity/type").then((res)=>{
      var dataReturn = JSON.parse(JSON.stringify(res.data))
      var i = 0
      this.$store.state.categories = new Map()
      this.$store.state.categories_raw = dataReturn['data']
      for(i in dataReturn['data']){
        this.$store.state.categories.set(dataReturn['data'][i].id,dataReturn['data'][i].name)

        var obj = {}
        obj.label = dataReturn['data'][i].name
        obj.value = dataReturn['data'][i].id
        this.$store.state.categories_upload.push(obj)
      }
      MessagePlugin.close(msg)
    })

    console.log(this.$store.state.categories_upload)
  },
  created(){
    var token = this.$cookies.get("token")
    if(token!=null && token!=''){
      this.axios.defaults.headers.common['token'] = token
      this.axios.get("/api/user/user").then((res)=>{
        var dataReturn = JSON.parse(JSON.stringify(res.data))
        if(dataReturn['code']==200){
            MessagePlugin.success("获取信息成功")
            this.$store.state.userData = dataReturn['data']
            this.$store.state.login = true
            this.$store.state.userStatus = dataReturn['data']['admin'] ? 1 : 0
        }else{
            this.$store.state.userData = []
            this.$store.state.login = false
        }
      })
      this.axios.defaults.headers.common['token'] = ''
    }
  },
  methods: {
    changePage(newpage){
      this.$router.push('/'+newpage)
    },
    changeCollapsed(){
      this.collapsed = !this.collapsed
      this.iconName = this.collapsed ? 'chevron-right' : 'chevron-left'
    },
    search(){
      if(this.searchKey.length>0){
        this.changePage('search?key='+this.searchKey)
      }else{
        MessagePlugin.error("请输入正确的关键词")
      }
    },
    logout(){
      const confirmDia = this.$dialog.confirm({
        header: '敏感操作提示',
        body: '你确定要退出账号吗?',
        theme: "warning",
        confirmBtn: '确认',
        cancelBtn: '取消',
        onConfirm: ({ e }) => {
          console.log('e: ', e);
          var msg = MessagePlugin.loading("正在退出")

          this.axios.defaults.headers.common['token'] = this.$cookies.get("token")
          this.axios.put("/api/user/logout").then((res)=>{
            var dataReturn = JSON.parse(JSON.stringify(res.data))
            if(dataReturn['code']==200){
              MessagePlugin.success(`退出登录成功，即将回到登录页`)
            }else{
              MessagePlugin.error(`退出登录失败:`+dataReturn['msg'])
            }

            MessagePlugin.close(msg)
            this.$cookies.set("token","")
            this.$store.state.login = false
            this.$store.state.userStatus = 0
            this.login = false
            this.status = 0
            this.changePage("login")
          })
          this.axios.defaults.headers.common['token'] = ''
          confirmDia.destroy();
        },
        onClose: ({ e, trigger }) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
          confirmDia.hide();
        },
      });
    },
  },
  watch:{
    $store:{
      immediate:true,
      deep:true,
      handler(){
          if(this.$store.state.userData){
            this.username = this.$store.state.userData.id
          }
          if(this.$store.state.login){
            this.login = this.$store.state.login
          }
          if(this.$store.state.userStatus){
            this.status = this.$store.state.userStatus
          }
      }
    }
  }
}
</script>

<style>
.t-layout{
  background-color: #fff;
}

:root{
  --td-bg-color-page:#fff !important;
}

:root{
  --td-brand-color-8:#fc7120 !important;
  --td-brand-color-7: #fc7120 !important;
  --td-brand-color-active: #f66300 !important;
}

.btn-primary{
  background-color: #fc7120 !important;
  border-color: #fc7120 !important;
}
</style>

