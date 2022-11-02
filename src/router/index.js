// r-2. createRouter, createWebHistory함수를 vue-router에서 import
import { createRouter, createWebHistory } from 'vue-router'

// router컴포넌트를 import
import Product from '@/components/Product.vue'
import Detail from '@/components/Detail.vue'
import Update from '@/components/Update.vue'
import Account from '@/components/Account.vue'
import AutoTransfer from '@/components/AutoTransfer.vue'
import AccountDetail from '@/components/AccountDetail.vue'
// 주석 스타트
// import Menu2 from '@/pages/menu2/Menu2.vue'
// import Menu3 from '@/pages/menu3/Menu3.vue'
// import Menu4 from '@/pages/menu4/Menu4.vue'
// 주석 종료

const router = createRouter({
    // 뒤로가기용
    history: createWebHistory(),
    routes: [
        // route 페이지가 설정되는 곳
        // routes 객체에는 항상 path, name, component가 있어야하며
        // name, path를 동일하게 설정하면 안 됨(router가 꼬임)
        // child를 선언하고 하위 route를 구성 가능
        // {
        //     path: '/',
        //     name: 'main',
        //     component : Main
        // },
        {
            path: '/transferList',
            name: 'product',
            component: Product
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/update',
            name: 'update',
            component: Update
        },
        {
            path:'/accountList',
            name:'account',
            component: Account
        },
        {
            path: '/accountListDetail',
            name: 'accountdetail',
            component: AccountDetail
        },
        {
            path:'/autoTransferList',
            name:'autoTransfer',
            component: AutoTransfer
        },
       
        // 주석 스타트
        // {
        //     path: '/menu2',
        //     name: 'menu2',
        //     component: Menu2
        // },
        // {
        //     path: '/menu3',
        //     name: 'menu3',
        //     component: Menu3
        // },
        // {
        //     path: '/menu4',
        //     name: 'menu4',
        //     component: Menu4
        // }
        // 주석 종료
    ]
})

// 만들어진 router를 내보내고 main.js로 이동
export default router
