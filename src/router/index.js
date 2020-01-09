import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Frame from "../views/Frame.vue"
import Mine from "../views/mine/Mine"

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        redirect: "/"
    },
    //首页
    {
        path: "/",
        component: Frame,
        children: [{
            path: "/",
            name: "home",
            component: Home,
            meta: {
                title: "首页"
            }
        }]
    },
    {
        path: "/",
        component: Frame,
        children: [{
            path: "allGoods",
            name: "allGoods",
            component: () =>
                import ("../views/allGoods/AllGoods"),
        }]
    },
    {
        path: "/",
        component: Frame,
        children: [{
            path: "cart",
            name: "cart",
            component: () =>
                import ("../views/cart/Cart"),
        }]
    },
    {
        path: "",
        component: Frame,
        children: [{
            path: "mine",
            name: "mine",
            component: Mine,
            children: [{
                    path: "/order",
                    name: "order",
                    component: () =>
                        import ("../views/mine/Order"),
                },
                {
                    path: "/information",
                    name: "information",
                    component: () =>
                        import ("../views/mine/Information"),
                },
                {
                    path: "/addressList",
                    name: "addressList",
                    component: () =>
                        import ("../views/mine/AddressList"),
                },
                {
                    path: "/coupon",
                    name: "coupon",
                    component: () =>
                        import ("../views/mine/Coupon"),
                },
                {
                    path: "/support",
                    name: "support",
                    component: () =>
                        import ("../views/mine/Support"),
                },
                {
                    path: "/aihuishou",
                    name: "aihuishou",
                    component: () =>
                        import ("../views/mine/Aihuishou"),
                }
            ]
        }]
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login/Index")
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("../views/register/Index")
    }
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router