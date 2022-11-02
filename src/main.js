
import { createApp } from 'vue'
import App from './App.vue'
// s-4. 만들어진 store모듈을 불러온다. 페이지 최하단으로 이동
import store from './store/index'
// r-3. 만들어진 router모듈을 불러온다. 페이지 최하단으로 이동
import router from './router/index'

import 'bootstrap/dist/css/bootstrap.min.css'

/*
    s-1 . store 구성
    터미널에서 npm install vuex@next --save를 입력
    설치가 종료되면 npm install로 새로 패키지 구성을 한다

    src의 하위에 store폴더를 만들고
    그 하위에 index.js 파일과 modules 폴더를 만든다.

    src/store/index.js파일을 열어 기본 store를 구성
*/

/*
    r-1. vue-router 구성
    vue-router는 SPA(Single Page App)에서 생성된 DOM의 일부를
    url주소를 변경을 감지해 설정한 element에서 부분 렌더링을 할 수 있게 하는 plugin이다

    터미널에서 npm install vue-router --save를 입력
    설치가 종료되면 npm install로 새로 패키지 구성을 한다

    src의 하위에 router폴더를 만들고
    그 하위에 모듈이 되는 index.js를 만든다.

    src/router/index.js파일을 열어 router를 구성
*/

// s-5. use함수(plugin을 사용한다는 의미)에 해당 store 모듈을 추가함
// modules폴더에 list.js, detail, create.js, update.js, delete.js 작성
// 다시 src/store/index.js 열어 만든 module들을 추가함

// r-5. use함수에 해당 router모듈을 추가 Product.vue로 이동
createApp(App).use(store).use(router).mount('#app')