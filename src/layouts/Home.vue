<template>
    <!-- 메뉴를 없애려면 주석처리 start -->
    <!-- <Header /> -->
    <!-- 메뉴를 없애려면 주석처리 end -->
    <Content />
    <Footer />
</template>
<script>
//메뉴를 없애려면 주석처리 start
// import Header from './header/index.vue'
//메뉴를 없애려면 주석처리 end

import Footer from './footer/index.vue'
import Content from './content/index.vue'
// import Nav from './nav/index.vue'

export default {
    components: {
        Footer,
        // Header, 
        Content
    },
    setup() {
    },
}
</script>
<style>
</style>