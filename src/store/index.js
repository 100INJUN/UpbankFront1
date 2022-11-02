// s-2. vuex에서 createStore함수를 import
import { createStore } from 'vuex'

// s-6. store에서 사용할 module들을 import
// 이 때 설정하는 모듈 이름은 store의 namespace로 사용하는 모듈 이름임
import createProduct from './modules/create.js'
import listProduct from './modules/list.js'
import detailProduct from './modules/detail.js'
import updateProduct from './modules/update.js'
import deleteProduct from './modules/delete.js'
import listAccount from './modules/accountList.js'
import listAutoTransfer from './modules/autoTransferList.js'

// modules 객체에 import해온 모듈을 담고
const modules = {
    createProduct,
    listProduct,
    detailProduct,
    deleteProduct,
    updateProduct,
    listAccount,
    listAutoTransfer,
}

// s-3. default로 해당 모듈이 포함된 함수를 내보낸다
// main.js로 이동
export default createStore({
    // s-7. modules를 입력
    // 모듈 구성이 끝났으면 npm run serve를 실행
    // src/store/modules/list.js로 이동
    modules
})