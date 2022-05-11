import { createWebHistory,createRouter } from 'vue-router'
import Login from '../views/login.vue'
import MainShow from '../views/mainshow.vue'
import Detail from '../views/detail.vue'
import Category from '../views/category.vue'
import AddItem from '../views/additem.vue'
import AboutUs from '../views/about.vue'

const routes=[
    { path:'/', component:MainShow, meta:{ title: '首页' }},
    { path:'/login', component:Login, meta:{ title: '登录' }},
    { path:'/detail', component:Detail, meta:{ title: '商品详情' }},
    { path:'/category', component:Category, meta:{ title: '商品分类' }},
    { path:'/additem', component:AddItem, meta:{ title: '添加商品' }},
    { path:'/about', component:AboutUs, meta:{ title: '关于我们' }},
]

const router= createRouter({
    history: createWebHistory(),
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