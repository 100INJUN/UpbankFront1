<template>
    <!-- 
        m-3. @emit이름으로 함수를 emit받아 쓸 수 있음 
        @modalClose는 Modal component의 emits의 key값, v-bind:isModalOpen은 props의 키값
    -->
    <Modal v-if="isModalOpen" @modalClose="closeModal()" v-bind:isModalOpen="isModalOpen" />
    <div>
        <h1> 고객 이체 내역 </h1>
        <table>
            <thead>
                <th> 이체 No </th>
                <th> 고객계좌번호 </th>
                <th> 받는사람계좌번호 </th>
                <th> 은행명 </th>
                <th> 금액 </th>
                <th> 이체일 </th>
                <th> 보낸사람메모 </th>
                <th> 받는사람메모 </th>
                <th> </th>
            </thead>
            <tbody>
                <tr v-for="transfer in transferList" v-bind:key="transfer.tfNum" @click="moveDetail(transfer.tfNum)">
                    <td> {{ transfer.tfNum }} </td>
                    <td> {{ transfer.account }} </td>
                    <td> {{ transfer.tfSenderAcc }} </td>
                    <td> {{ transfer.tfBank }} </td>
                    <td> {{ transfer.tfAmount }} </td>
                    <td> {{ transfer.tfDate}}</td>
                    <td> {{ transfer.tfSenderComment}}</td>
                    <td> {{ transfer.tfDepositComment}}</td>
                    <!-- <td><button @click="moveUpdate(transfer.id)">수정</button></td> -->
                    <!-- <td><button @click="deleteProduct(transfer.id)">삭제</button></td> -->
                </tr>
            </tbody>
        </table>
        <!-- <button @click="openModal()">등록</button> -->
    </div>
</template>

<script>
// vue lifeCycle과 ref, computed, watch등의 고유 객체를 호출
import Modal from './Modal.vue'
import { ref, onMounted, computed } from 'vue'

// r-6. useRouter함수를 import. setup함수로 이동해 router객체로 받음
import { useRouter } from 'vue-router'
// s-10. useStore 함수를 import
import { useStore } from 'vuex'

// composition API의 사용
// https://v3.ko.vuejs.org/api/composition-api.html
// composition API는 기존 vue2(Global API)의 script상에서 소스의 규모가 커질 수록
// data나 method를 찾아 연결하는 것이 불편하기 때문에 개선된 script 작성 방식이다.
// setup()함수를 export default 객체 내부에 선언해 사용한다
// 추후에는 <script setup> 으로 더 간략화된 문법 사용이 가능하며, 
// export가 필요없이 defineProps, defileEmits등의 함수로 data 전달이 가능

export default {
    name: 'Product',
    components: {
        Modal
    },
    // setup()함수는 vue2의 created() 상태와 동일하며 DOM이 만들어질 때 호출되는 함수이다
    setup() {
        // r-7. import해온 router객체를 받음 moveDetail함수로 이동
        const router = useRouter()
        // s-11. composition API에서는 useStore 함수를 내부에서 store변수에 대입해 사용
        const store = useStore()

        // s-12. computed() : store를 반응형으로 받는 두 가지 방법중 하나
        // 주로 리스트나 상세 데이터 등 화면상에서 직접 변경하지 않는 객체를 쓰기 위해 사용
        const transferList = computed(() => {
            // vue 파일에서 state를 받는 방법
            // store.state.(모듈이름).(state이름)
            return store.state.listProduct.productList
        })


        // m-1. 모달창을 표시하기 위한 객체 기본 값은 닫힌 상태(false) template영역의 Modal 컴포넌트를 확인
        const isModalOpen = ref(false)
        // m-2. 모달 렌더링용 함수 생성
        // 모달 띄움
        const openModal = () => {
            isModalOpen.value = true
        }
        // 모달 닫음
        const closeModal = () => {
            isModalOpen.value = false
        }

        // r-8. router 이동 함수
        const moveDetail = (id) => {
            // router.push는 src/route/index.js에서 작성한 routes에 접근하여
            // 페이지를 렌더링하는 함수이다
            // 방법.1
            router.push({
                name: 'detail',
                // query 객체 : url의 parameter로 매핑됨 (get방식과 유사)
                query: {
                    id: id
                }
            })

            // 방법.2
            // router.push({
            //     path: '/detail',
            //     // query와 달리 주소에 표기되지 않음
            //     param: {
            //         id: id
            //     }
            // })

            // Detail.vue의 스크립트 영역으로 이동
        }


        // d-1. 삭제 함수 생성, id를 매개변수로 받음 -> src/store/modules/delete.js로 이동
        const deleteProduct = async (id) => {
            // store.dispatch(actions호출).('[모듈이름]/[함수이름]', 매개변수)
            await store.dispatch('deleteProduct/deleteProduct', id)
            await store.dispatch('listProduct/fetchList')
        }

        // u-1. update 함수 생성 > template 영역에서 호출 > src/components/Update.vue로 이동해 vue파일 작성
        const moveUpdate = (id) => {
            router.push({
                path: '/update',
                query: {
                    id: id
                }
            })
        }


        // vue2의 mouted()와 동일한 역할(DOM에 해당 component가 구성된 상태)
        // mouted의 시점은 create의 시점보다 나중이므로 
        // (property).(name)의 null 에러를 방지하기 위해 리스트 호출을 setup보다 나중시점에 해야 함
        // async ...await 문법을 적용해 비동기로 사용이 가능
        onMounted(async () => {
            // s-13. store의 actions의 호출 방법
            // store.dispatch('[모듈이름]/[action이름]')
            await store.dispatch('listProduct/fetchList')
        })

        // setup()함수 안에서 작성한 객체들을 return해야 html영역에서 해당 객체를 사용 가능 
        return {
            transferList,
            isModalOpen,
            deleteProduct,
            openModal,
            closeModal,
            moveDetail,
            moveUpdate
        }

    }
}

</script>