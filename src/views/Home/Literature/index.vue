<template>
    <div class="contain">
        <div class="catalogue">
            <a @click="detail_Def">作品信息</a>
            <a @click="novel_Def">小说</a>
            <a @click="ancient_poetry_Def">古诗词</a>
            <a @click="modern_poetry_Def">现代诗</a>
        </div>
        <div class="display">
            <div v-show="Route.meta.show">
                <sapn style="font-size: large;margin: 10px;">小说：{{ literature_length.Novel_length }}本</sapn>
                <sapn style="font-size: large;margin: 10px;">古诗词：{{ literature_length.Ancient_Poetry_length }}篇</sapn>
                <sapn style="font-size: large;margin: 10px;">现代诗：{{ literature_length.Modern_Poetry_length }}篇</sapn>
            </div>
            <RouterView>

            </RouterView>
        </div>

    </div>
</template>

<script lang='ts' setup>
import { useRouter, useRoute } from "vue-router"
import { ref, reactive } from "vue";
import request from "@/api/request";

const Router = useRouter()
const Route = useRoute()
console.log(Router)
console.log(Route.meta.show);

const detailshow = ref(true)


const literature_length = reactive({
    Novel_length: 0,
    Ancient_Poetry_length: 0,
    Modern_Poetry_length: 0
})

const isDetail = async (path:string)=>{
    await Router.push(path)
    if (Router.currentRoute.value.path !== "/home/literature") {
        detailshow.value = false
    }
    else {
        detailshow.value = true
    }
}

const detail_Def = ()=>{
    isDetail("/home/literature")
}
const novel_Def = ()=>{
    isDetail("/home/literature/novel")
}
const ancient_poetry_Def = ()=>{
    isDetail("/home/literature/ancient_poetry")
}
const modern_poetry_Def = ()=>{
    isDetail("/home/literature/modern_poetry")
}


request({
    method: "GET",
    url: `/Literature/literatureDetail/${window.localStorage.getItem("userInfo")}/`,
    params:{
        Token:window.localStorage.getItem("userInfo")
    }
}).then((res: any) => {
    console.log(res);
    
    literature_length.Novel_length = res.Novel_length
    literature_length.Ancient_Poetry_length = res.Ancient_Poetry_length
    literature_length.Modern_Poetry_length = res.Modern_Poetry_length
})


</script>

<style scoped>
.contain {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    background-color: rgb(245, 246, 247);
}

.catalogue {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 20%;
    height: 500px;
    padding: 20px;
}

.catalogue a {
    font-size: 2em;
    margin-bottom: 20px;
    text-decoration: none;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}

.catalogue a:hover {
    color: rgb(000, 103, 230);
}

.display {
    /* display: flex; */
    background-color: white;
    width: 72%;
    height: 500px;
    padding: 20px;
}
</style>