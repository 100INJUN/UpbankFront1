<template>

    <!-- 
        teleport는 html tag 작성 순서와 관계 없이
        해당 영역에 component를 렌더링한다는 의미 
        to로 자식 element를 public/index.html의 id에 렌더링 함 
    -->
    <teleport to="#modal">
        <!-- 반응형 데이터에 따라서 class나 style을 변경할 수 있다 -->
        <div class="modal" :class="isModalOpen ? 'show' : ''">
            <div class="modal_body">
                <h2>상품 등록</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Product Name</th>
                            <td><input type="text" v-model="inptName" placeholder="상품 이름" /></td>
                        </tr>
                        <tr>
                            <th>Product Brand</th>
                            <td><input type="text" v-model="inptBrand" placeholder="상품 브랜드" /></td>
                        </tr>
                        <tr>
                            <th>Product Madein</th>
                            <td><input type="text" v-model="inptMadein" placeholder="상품 원산지" /></td>
                        </tr>
                        <tr>
                            <th>Product Price</th>
                            <td><input type="number" v-model="inptPrice" placeholder="상품 가격" /></td>
                        </tr>
                    </tbody>
                </table>
                <!-- 함수 바인딩 v:on을 @로 축약해 사용할 수 있음-->
                <button @click="regProduct()">등록</button>
                <button @click="closeModal()">닫기</button>
            </div>
        </div>
    </teleport>
</template>

<script>
import { reactive, toRefs, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'modal',
    // Product.vue에서 넘긴 prop, emits
    props: {
        // template에서 class 값을 변경하기 위해 사용
        isModalOpen: Boolean
    },
    emits: ['modalClose'],

    // setup함수 내부에서에서 props와 emit을 쓰기위한 설정 
    setup(props, { emit }) {
        const store = useStore()

        /*
            state : store상에 정의된 내부 객체들 store.state.모듈이름.변수이름
            getters : state의 값을 변경하지 않지만, 해당 변수를 가공해 사용하는 내부 객체들 store.getters['모듈이름/변수이름']
            mutations : state를 동기적으로 직접 변경하는 함수들 store.commit('모듈이름/함수이름')
            actions : vue component에서 비동기적으로 외부 api와의 통신을 담당하는 함수 (async) store.dispatch('모듈이름/함수이름')
        */

        // reactive() : computed와 다른 용도로 사용하는 반응형 객체
        // 주로 Array, Object에 사용
        // v-model을 사용해 화면상에서 input태그에 연결된 객체의 값을 변경하고 싶을 때 사용
        // store.state.(모듈이름) 해당 모듈의 state의 객체를 담겠다는 의미
        const createData = reactive(store.state.createProduct)

        // toRefs는 반응형 객체(reactive)의 key값을 빼서 해당 변수를 ref데이터로 설정
        // 각각의 input v-model에 bind시킴
        const {
            inptName,
            inptBrand,
            inptMadein,
            inptPrice
        } = toRefs(createData)
        // 동일 의미
        // const inptName = ref(createData.inptName)
        // const inptBrand = ref(createData.inptBrand)
        // const inptMadein = ref(createData.inptMadein)
        // const inptPrice = ref(createData.inptPrice)

        // watch로 ref 변수들의 변화를 감지해 스토어에 해당 값 대입
        // 첫 번째 변수: 변화를 감지받을 객체(주로 ref로 싸여있음)
        // 두 번째 변수(함수): 새로운 값을 받아 내부에서 함수 실행
        watch(inptName, (newValue) => {
            console.log('input name:', newValue)
            // 새 값을 받아 store에 저장
            store.commit('createProduct/setInputData', newValue)
            console.log('store data', store.state.createProduct.inptName)
        })

        watch(inptBrand, (newValue) => {
            console.log('input brand:', newValue)
            store.commit('createProduct/setInputData', newValue)
            console.log('store data', store.state.createProduct.inptBrand)
        })

        watch(inptMadein, (newValue) => {
            store.commit('createProduct/setInputData', newValue)
        })

        watch(inptPrice, (newValue) => {
            store.commit('createProduct/setInputData', newValue)
        })

        // c-1. 화면에서 입력받은 값을 등록하는 함수 작성
        const regProduct = async () => {

            // c-2. 새 객체를 생성하고 backend의 spring vo의 property에 맞춰서 key값을 설정
            let regObj = {
                // ref에 저장되어 있는 data를 대입
                // ref 혹은 computed객체를 vue script영역에서 사용하려면 .value를 붙여야 함
                name: inptName.value ?? '',
                brand: inptBrand.value ?? '',
                madein: inptMadein.value ?? '',
                price: inptPrice.value ?? 0,
            }

            // c-3. actions를 호출(dispatch) -> src/store/moudules/create.js -> actions 안의 createProduct()함수로 이동
            await store.dispatch('createProduct/createProduct', regObj)
            await store.dispatch('listProduct/fetchList')

            // 입력이 끝나면 모달을 닫음(emit으로 함수 호출)
            closeModal()
        }

        // emit으로 modal을 닫는 함수를 호출
        const closeModal = () => {
            emit('modalClose')
        }

        // lifeCycle 모달이 닫힐 때 실행됨
        onUnmounted(() => {
            // modal창에서만 사용되던 store data를 초기화한다
            store.commit('createProduct/clearInputData')
            store.commit('createProduct/clearResult')
        })

        // setup()에서 정의된 객체, 함수를 내보내야 template영역에서 사용이 가능
        return {
            inptName,
            inptBrand,
            inptMadein,
            inptPrice,
            closeModal,
            regProduct
        }
    }
}

</script>

<style>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
    display: block;
}

.modal_body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 600px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
}
</style>