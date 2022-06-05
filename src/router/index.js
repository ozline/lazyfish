import { createWebHistory,createRouter } from 'vue-router'
import Login from '../views/users/login.vue'
import MainShow from '../views/items/mainshow.vue'
import Detail from '../views/items/detail.vue'
import Category from '../views/items/category.vue'
import AddItem from '../views/items/additem.vue'
import AboutUs from '../views/about.vue'
import NotFound from '../views/404.vue'
import Space from '../views/users/space.vue'
import Address from '../views/users/address.vue'
import Mypurchase from '../views/users/mypurchase.vue'
import Mysell from '../views/users/mysell.vue'
import Review from '../views/admin/review.vue'
import Search from '../views/items/search.vue'
import BlockList from '../views/admin/blocklist.vue'

const routes=[
    { path:'/', component:MainShow, meta:{ title: '首页' }},
    { path:'/login', component:Login, meta:{ title: '登录' }},
    { path:'/detail', component:Detail, meta:{ title: '商品详情' }},
    { path:'/category', component:Category, meta:{ title: '商品分类' }},
    { path:'/additem', component:AddItem, meta:{ title: '添加商品' }},
    { path:'/space', component:Space, meta:{ title: '账号信息' }},
    { path:'/about', component:AboutUs, meta:{ title: '关于我们' }},
    { path:'/address', component:Address, meta:{ title: '收货地址管理' }},
    { path:'/mypurchase', component:Mypurchase, meta:{ title: '我的购买' }},
    { path:'/mysell', component:Mysell, meta:{ title: '我的出售' }},
    { path:'/review', component:Review, meta:{ title: '商品审核' }},
    { path:'/search', component:Search, meta:{ title: '搜索物品' }},
    { path:'/blocklist', component:BlockList, meta:{ title: '封禁名单' }},
    { path:'/404', component: NotFound, meta:{ title:"404" }},
    { path:'/:pathMatch(.*)', component: NotFound, redirect:'/404'},
]

const router = createRouter({
    base: '/',
    history: createWebHistory(),
    mode: 'history',
    routes
})

router.beforeEach((to,from,next)=>{
    // console.log('组件跳转 从'+from.path+" 至"+to.name)
    if(to.meta.title){
        document.title = to.meta.title
    }
    next()
})

export default router