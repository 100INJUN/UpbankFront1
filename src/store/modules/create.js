/*
    axios는 외부 api 통신을 위한 자바스크립트 라이브러리
    axios 객체에는 httpMethod 함수가 구성되어있음(get, post 등등)
    axios.get => get방식
    axios.post => post방식
*/

/*
    state : store상에 정의된 내부 객체들 
    getters : state의 값을 변경하지 않지만, 해당 변수를 가공해 사용하는 내부 객체들 
    mutations : state를 동기적으로 직접 가공하는 함수들 
    actions : vue component에서 비동기적으로 외부 api와의 통신을 담당하는 함수 
*/

import axios from "axios"

export default {
    // 반드시 namespaced값이 true여야 모듈 이름을 호출 가능
    namespaced: true,
    state: {
        inptName: '',
        inptBrand: '',
        inptMadein: '',
        inptPrice: '',
        result: '',
        msg: ''
    },
    mutations: {
        setInputData(state, payload) {
            console.log('payload', payload)
            state[`${payload}`] = payload
        },
        clearInputData(state) {
            state.inptName = ''
            state.inptBrand = ''
            state.inptMadein = ''
            state.inptPrice = ''
        },
    },
    actions: {
        // 비동기 처리를 위한 async, await는 actions 함수에만 적용 가능
        // payload : 호출한 component에서 넘기는 request parameter
        // c-4. payload를 매개변수로 받음
        async createProduct({ commit }, payload) {
            commit('clearResult')
            // modal에서 넘어온 parameter 즉 payload
            // let param = {
            //     name: state.inptName ?? '',
            //     brand: state.inptBrand ?? '',
            //     madein: state.inptMadein ?? '',
            //     price: state.inptPrice ?? '',
            // }
            console.log('create param', payload)

            // commit은 mutation에 정의된 함수를 호출, clearList는 해당 state에 대한 초기화
            try {

                // c-5. parameter를 대입
                // 외부 api를 호출해 res변수에 respose 값을 받아옴
                let response = await axios.post('http://localhost:8040/api/insert', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                alert(response.data.resultMsg)

                commit('clearInputData')

            } catch (error) {
                console.log(error)
            }

        }
    }

}