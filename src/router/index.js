import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import (/*webpackChunkName: "HomePage"*/'../views/home/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter(to, from, next) {
            const { isLogin } = localStorage;
            isLogin ? next({name:'Home'}):next()
        },
        component: () => import (/*webpackChunkName:"LoginPage"*/'../views/login/Login.vue')
    },

    {
        path: '/register',
        name: 'Register',
        beforeEnter(_1, _2, next) {
            const { isLogin } = localStorage;
            isLogin ? next({ name: 'Home' }) : next()
        },
        component: () => import (/*webpackChunkName:"RegisterPage"*/'../views/register/Register.vue')
    },
    {
        path:'/shop/:shopId',
        name:'Shop',
        component: () => import (/*webpackChunkName:"ShopPage"*/'../views/shop/Shop.vue')
    },

    {
        path:'/cartList',
        name:'CartList',
        component: () => import(/*webpackChunkName:"CartListPage"*/'../views/cart/CartList.vue')
    },

    {
        path:'/orderConfirmation/:shopId',
        name:'OrderConfirmation',
        component: () => import(/*webpackChunkName:"OrderConfirmationPage"*/'../views/orderConfirmation/OrderConfirmation.vue')
    },
    {
        path:'/orderList',
        name:'OrderList',
        component: () => import(/*webpackChunkName:"OrderListPage"*/'../views/orderList/OrderList.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, _, next) => {
    const isLogin = localStorage.isLogin;
    if (isLogin || to.name === 'Login' || to.name === 'Register') {
        next()
    } else {
        next({ name: 'Login' })
    }
    next()
})

export default router
