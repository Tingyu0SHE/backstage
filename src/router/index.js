import VueRouter from 'vue-router'

import Login from '../View/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../View/Welcom.vue'
import User from '../View/User.vue'
import Permission from '../View/Permission.vue'
import UserList from "../View/UserList.vue";
import ProductList from "../View/ProductList.vue";
import Parameters from "../View/Parameters.vue";
import Classification from "../View/Classification.vue";
import UserOrder from "../View/UserOrder.vue"
import DataDetails from "../View/DataDetails.vue"


import { List } from 'echarts'
// 创建实例对象
const router = new VueRouter({
  routes: [
    // 引入Login路由
    { path: '/', component: Login },
    { path: '/login', component: Login, meta: { title: '登录' } },
    {
      path: '/home',
      component: Home,
      meta: { isAout: true },
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/rights',
        component: Permission
      },
      {
        path: '/roles',
        component: UserList
      }, {
        path: '/power',
        component: ProductList
      }, {
        path: '/param',
        component: Parameters
      }, {
        path: '/sort',
        component: Classification
      }, {
        path: '/listes',
        component: UserOrder
      },
      {
        path: '/dates',
        component: DataDetails
      }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.isAout) {

    // 判断是否有token
    //  console.log(111);
    if (sessionStorage.getItem('token')) {
      // 判断有token是否和服务传的一致
      const key = window.atob(sessionStorage.getItem('key'))
      const token = sessionStorage.getItem('token')
      if (key !== token) {
        next('/login')
        return
      }
      next()
    } else {
      next('./login')
    }

  } else {
    next()
  }

})
router.afterEach((to) => {
  document.title = to.meta.title || "后台管理系统"
})

//向外暴露出去
export default router