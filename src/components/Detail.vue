<template>
    <div>
        <h1>이체 내역 상세</h1>
        <table>
            <tr>
                <th>이체 NO</th>
                <td>{{ data.tfNum }}</td>
            </tr>
            <tr>
                <th>계좌명</th>
                <td>{{ data.account }}</td>
            </tr>
            <tr>
                <th>은행명</th>
                <td>{{ data.tfBank }}</td>
            </tr>
            <tr>
                <th>금액</th>
                <td>{{ data.tfAmount }}</td>
            </tr>
            <tr>
                <th>이체일</th>
                <td>{{ data.tfDate }}</td>
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
            return store.state.detailProduct.transefer
        })
        const moveRouter = () => {
            router.push({
                name: 'product'
            })
        }

        // r-10. 비동기 처리 
        onMounted(async () => {
            // route에서 저장한 query의 key값으로 상세 데이터를 불러옴
            await store.dispatch('detailProduct/fetchDetail', route.query.id)
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