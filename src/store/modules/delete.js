/*
    axios는 외부 api 통신을 위한 자바스크립트 라이브러리
    axios 객체에는 httpMethod 함수가 구성되어있음(get, post 등등)
    axios.get => get방식
    axios.post => post방식
*/

import axios from "axios"

export default {
    // 반드시 namespaced값이 true여야 모듈 이름을 호출 가능
    namespaced: true,
    state: {
        deleteId: '',
    },
    mutations: {
        // d-3. 삭제할 id를 state에 세팅 -> 다시 actions로 이동
        setDeleteId(state, payload) {
            state.deleteId = payload
        },
        clearDeleteId(state) {
            state.deleteId = ''
        }
    },
    actions: {
        // d-2. 비동기 처리를 위한 async, await는 actions 함수에만 적용 가능
        // payload : 호출한 component에서 넘기는 request parameter
        async deleteProduct({ state, commit }, payload) {
            console.log('payload delete id', payload)
            // mutations의 setDeleteId로 이동
            commit('setDeleteId', payload)

            let param = {
                id: state.deleteId
            }

            try {

                // d-4. parameter에 생성된 객체를 대입
                // 외부 api를 호출해 res변수에 respose 값을 받아옴
                let response = await axios.post('http://localhost:8040/api/delete', param, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                console.log(response)

                alert(response.data.resultMsg)

                // state.list는 proxy 객체로 감싸서 저장

            } catch (error) {
                alert(error)
            }

        }
    }

}