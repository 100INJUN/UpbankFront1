<template>
  <!-- <Product /> -->
  <!-- <router-view /> -->
  <Home />
</template>

<script>
import Home from './layouts/Home.vue'

/* layouts, pages, router/index.js 확인, 
  menu없애려면 layouts의 Home.vue에서 주석, router/index.js의 항목 주석
  layout 구성
  (jsp의 header navigation과 비슷함)
  전체 틀을 잡아주는 Home.vue를 layout의 최상위에 작성
  src/layouts에 페이지 전역에서 공통으로 들어가는 components 작성

  원하는 방식의 사이트 구성을 위해 폴더를 구분
  header, nav, content, footer 등의 태그를 기준으로 구성
  각 하위에 해당 태그를 작성하고 
  동적으로 변경하기 위한 content에 <router-view>를 작성

  매뉴마다 동작을 원하는 페이지를 위해
  src/pages(임의)에 메뉴 별로 폴더를 구성하고 <router-view>에 들어갈
  page별 component를 구성
  src/router/index.js에서 해당 페이지와 주소를 작성하고 컴퍼넌트를 연결시킴

*/
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
