import { createRouter, createWebHistory } from "vue-router";
import store from "@/store"

const routes = [
    {
        path: "/login",
        name: "login",
        meta: {
            layout: "simple-layout",
        },
        component: () => import("@/views/LoginPage.vue")
    },
    {
        path: "/",
        name: "home",
        meta: {
            layout: "app-layout",
        },
        component: () => import("@/views/HomePage.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const anonymousRoutes = [
    "login",
]

router.beforeEach(async (to, from) => {
    const isAuth = store.getters["auth/isAuthenticated"]


    if(!isAuth && !anonymousRoutes.includes(to.name)) {
        return { name: "login" }
    }

    // Если авторизованный пользователь пытается зайти в login, то перенаправляется в home
    if(isAuth && to.name === "login"){
        console.log("isAuth 2", isAuth)

        return { name: "home"}
    }
})

export default  router