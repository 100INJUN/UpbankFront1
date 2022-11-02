<template>
    <div>
        <h1>고객 계좌 상세</h1>
        <table>
            <tr>
                <th> 상품명 </th>
                <td>{{ data.productName }}</td>
            </tr>
            <tr>
                <th>계좌명</th>
                <td>{{ data.account }}</td>
            </tr>
            <tr>
                <th>고객 id</th>
                <td>{{ data.id }}</td>
            </tr>
            <tr>
                <th>금액</th>
                <td>{{ data.balance }}</td>
            </tr>
            <tr>
                <th>계좌종류</th>
                <td>{{ data.accountType }}</td>
            </tr>
            <tr>
                <th>계좌상태</th>
                <td>{{ data.accountState }}</td>
            </tr>
            <tr>
                <th>이체한도금액</th>
                <td>{{ data.accLimitDay}}</td>
            </tr>
            <tr>
                <th>해지날짜</th>
                <td>{{ data.deleteDate}}</td>
            </tr>


        </table>
        <button @click="moveRouter()">돌아가기</button>
    </div>
</template>

<script>

// r-9. useRoute를 'vue-router'에서 import, onMounted을 'vue'에서 import
// onMounted()로 이동
import { useRouter, useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        // 변하지 않는 데이터를 처리하기 위해서는 computed가 적합
        // 위의 테이블에 해당 data가 매핑
        const data = computed(() => {
            return store.state.detailAccount.account
        })
        const moveRouter = () => {
            router.push({
                name: 'account'
            })
        }

        // r-10. 비동기 처리 
        onMounted(async () => {
            // route에서 저장한 query의 key값으로 상세 데이터를 불러옴
            await store.dispatch('detailAccount/fetchDetail', route.query.id)
        })

        return {
            data,
            moveRouter
        }
    }
}
</script>

<style>
</style>