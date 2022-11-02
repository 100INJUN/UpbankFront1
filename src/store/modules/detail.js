/*
    s-8. axios는 외부 api 통신을 위한 자바스크립트 라이브러리
    axios 객체에는 httpMethod 함수가 구성되어있음(get, post 등등)
    axios.get => get방식
    axios.post => post방식
*/

import axios from "axios"

// s-9. 스토어 구성
/*
    state : store상에 정의된 내부 객체들 
    getters : state의 값을 변경하지 않지만, 해당 변수를 가공해 사용하는 내부 객체들 
    mutations : state를 동기적으로 직접 가공하는 함수들 
    actions : vue component에서 비동기적으로 외부 api와의 통신을 담당하는 함수 
*/
export default {
    // 반드시 namespaced값이 true여야 해당 모듈 이름을 호출 가능
    namespaced: true,
    // state: 브라우저의 로컬 스토리지 영역에 저장되는 내부객체들의 모임
    state: {
        transefer: {}
    },
    // 저장된 state를 state의 자체의 변화 없이 임의로 다른 곳에 선언해 표시하기 위한 함수

    // store 영역에서 state의 값에  직접 동기적으로 변경하는 함수, actions 내부에서 사용됨
    mutations: {
        setTransefer(state, payload) {
            state.transefer = payload
        }
    },
    // vue components에서 호출하며 비즈니스 로직을 처리하는 비동기 처리 함수. api 통신을 담당(CRUD)
    actions: {
        // 비동기 처리를 위한 async, await는 actions 함수에만 적용 가능(mutation에서는 불가)
        // state를 직접 가공하기 위해서 내부에서 호출된 mutations(commit)을 사용해 state를 변경한다
        // dispatch에서 state나 mutations, getters를 호출하기 위해서는 중괄호를 열고 state(state), commit(mutation), dispatch(actions) 식으로 사용해야 함  
        async fetchDetail({ state, commit }, payload) {
            console.log('dispatch 호출')
            // commit은 mutation에 정의된 함수를 호출, clearList는 해당 state에 대한 초기화
            // mutations의 함수명을 불러오는 것
            try {
                // 외부 api를 호출해 res변수에 respose 값을 받아옴
                // axios 내부 함수(get,post 등등)의 첫 번째 매개변수에 api의 url을 작성
                // 두 번째 변수로 parameter, 세 번째 변수로 headers 정보를 넘길 수 있음
                let response = await axios.get(`http://localhost:8088/api/tranfer/${payload}`, {}, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        // 'Access-Control-Allow-Origin': 'http://localhost',
                        // 'Access-Control-Allow-Headers': '*',
                        // 'Access-Control-Allow-Credentials': 'true'
                    }
                })
                console.log('response 확인: ', response.data)

                commit('setTransefer', response.data.detail)

                // state.productList는 proxy 객체로 감싸서 저장됨
                // dispatch에서도 직접 state에 접근해 변경하는 것은 가능하지만 현 버전에서는 권장하지 않음
                // 콘솔 확인용
                console.log('state 확인: ', state.transefer)

            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 작성이 끝났으면 src/components/Product.vue를 열고 스크립트 영역으로 이동