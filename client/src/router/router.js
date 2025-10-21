import LoginPage from "@/pages/LoginPage.vue"
import DashBoard from "@/pages/DashBoard.vue"
import { createRouter ,createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: LoginPage
    },
    {
        path: '/dashboard',
        component: DashBoard
    }
]

const router = createRouter({routes, history: createWebHistory()})

export default router 