import vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopFoods from '../pages/Shop/ShopFoods/ShopFoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// 组件懒加载
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: Msite, // 返回路由组件的函数,只有执行此函数才会加载路由组件,这个函数在请求对应的路由路径时才会执行
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: 'msite'
    }, {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/foods',
          component: ShopFoods
        }, {
          path: '/shop/ratings',
          component: ShopRatings
        }, {
          path: '/shop/info',
          component: ShopInfo
        }, {
          path: '',
          redirect: '/shop/foods'
        }]
    }
  ]
})
