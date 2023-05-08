<template>
    <div class="contain" v-for="c in Novel_List">
        <div class="item"  @click="Novel_display(c.id)">
            <img :src="c.cover">
            <div class="jianjie">
                <h1>书名：{{ c.name }} 作者：{{ c.author }}</h1>
                <p>简介：{{ c.synopsis }}</p>
            </div>
        </div>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
    </div>
</template>

<script lang='ts' setup>
import request from '@/api/request'
import { ref, reactive } from 'vue'
import { useRouter,useRoute } from 'vue-router';

const Novel_List = ref<any>()
const Router = useRouter() 
const Route = useRoute()

request({
    url: `/Literature/literatureNovel/`,
    method: "GET"
}).then((res: any) => {
    console.log(res)
    Novel_List.value = res
})

const Novel_display = ((keyword:number)=>{
    if(Route.query){
          let location = {name:'novel_display',params:{Keyword:keyword || undefined}};  
          Router.push(location);
        }
})
</script>

<style scoped>
img {
    width: 100px;
    height: 150px;
    transition: 0.5s;
}

.item img:hover {
    transform: scale(1.1);
}

.item {
    width: 100%;
    /* padding: auto; */
    display: flex;
    /* justify-content: space-between; */
    background-color: antiquewhite;
}

.item .jianjie {
    width: 100%;
    margin-left: 200px;
    background-color: rgb(165, 122, 122);
}

p {
    word-wrap: break-word;
    font-size: 1.2em;
}
</style>