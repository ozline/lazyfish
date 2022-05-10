import { createWebHistory,createRouter } from 'vue-router'
import Login from '../views/login.vue'
import MainShow from '../views/mainshow.vue'
import Detail from '../views/detail.vue'
import Category from '../views/category.vue'

const routes=[
    { path:'/', component:MainShow },
    { path:'/login', component:Login },
    { path:'/detail', component:Detail },
    { path:'/category', component:Category },
]

const router= createRouter({
    history: createWebHistory(),
    routes
})

export default router