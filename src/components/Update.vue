<template>
    <div>
        <h1>수정</h1>
        <table>
            <tr>
                <th>Product Id</th>
                <td>{{ id }}</td>
            </tr>
            <tr>
                <th>Product Name</th>
                <td><input type="text" v-model="name" placeholder="상품 원산지" /></td>
            </tr>
            <tr>
                <th>Product Brand</th>
                <td><input type="text" v-model="brand" placeholder="상품 브랜드" /></td>
            </tr>
            <tr>
                <th>Product Madein</th>
                <td><input type="text" v-model="madein" placeholder="상품 원산지" /></td>
            </tr>
            <tr>
                <th>Product Price</th>
                <td><input type="number" v-model="price" placeholder="상품 가격" /></td>
            </tr>
        </table>
        <button @click="updateProduct()">수정</button>
        <button @click="moveHome()">돌아가기</button>
    </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'update',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        // u-2. 상세 데이터를 가져옴(reactive를 쓰는 이유는 v-model 바인딩을 위함)
        const updateData = reactive(store.state.detailProduct.productDetail)

        // toRefs : 해당 키값과 동일하게 매핑
        const {
            id,
            name,
            brand,
            madein,
            price
        } = toRefs(updateData)
        // 동일 의미
        // const id = ref(updateData.id)
        // const name = ref(updateData.name)
        // const brand = ref(updateData.inptBrand)
        // const inptMadein = ref(updateData.madein)
        // const price = ref(updateData.price)

        // u-3. insert와 다른점은 상세에서 받은 데이터의 id값도 넘긴다는 점임
        // 값이 id가 없으면 신규로 insert가 되며 있으면 해당 id의 데이터를 update
        // id의 존재 여부와 상관없이 id를 넘기지 않으면 무조건 한 건이 추가
        // JPA는 insert와 update가 같은 save함수를 사용하기 때문
        const updateProduct = async () => {
            let updObj = {
                id: id.value ?? '',
                name: name.value ?? '',
                brand: brand.value ?? '',
                madein: madein.value ?? '',
                price: price.value ?? 0
            }

            console.log('update Object', updObj)
            // u-4. src/store/update.js > actions의 updateProduct
            await store.dispatch('updateProduct/updateProduct', updObj)
            moveHome()
        }

        const moveHome = () => {
            router.push({
                name: 'product'
            })
        }

        onMounted(async () => {
            await store.dispatch('detailProduct/fetchDetail', route.query.id)
            console.log('onMounted data', updateData)
        })

        onUnmounted(() => {
            store.commit('detailProduct/clearProductDetail')
        })

        return {
            id,
            name,
            brand,
            madein,
            price,
            updateProduct,
            moveHome
        }
    }
}
</script>

<style>
</style>