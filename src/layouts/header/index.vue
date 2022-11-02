<template>
    <header>
        <ul>
            <li @click="moveMenu('/')">게시판</li>
            <!-- <li @click="moveMenu('/menu2')">메뉴2</li>
            <li @click="moveMenu('/menu3')">메뉴3</li>
            <li @click="moveMenu('/menu4')">메뉴4</li> -->
        </ul>
    </header>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()

        const moveMenu = (path) => {
            router.push({
                path: path
            })
        }

        return {
            moveMenu
        }
    }
}
</script>
<style>
header ul {
    display: flex;
    justify-content: center;
    list-style: none;
}

header ul li {
    margin: 30px;
    font-size: 40px;
}
</style>
