import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        name: '登录',
        path: '/user/login',
        component: () => import('@/views/Login.vue'),
    },
    {
        name: '注册',
        path: '/user/register',
        component: () => import('@/views/Register.vue')
    },
    {
        name: '首页',
        path: '/',
        component: () => import('@/views/HomePage.vue')
    },
    {
        name: '测试',
        path: '/test',
        component: () => import('@/views/Test.vue')
    },
    {
        name: '重置密码',
        path: '/user/resetpassword',
        component: () => import('@/views/ResetPassword.vue')
    }
];

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
    routes: routes,
    history: createWebHistory(),
})

export default router