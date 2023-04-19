<template>
    <div class="contain" v-for="(c, index) in Ancient_Poetry_List">
        <div class="item">
            <a target="_blank" @click=goDisplay(c.id)>{{ c.title }}</a>
            <span>字数：{{ c.context.length }}(计空格)</span>
        </div>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { StarFilled } from '@element-plus/icons-vue'
import request from '@/api/request'
import {useRoute,useRouter} from 'vue-router'

console.log(window.KeyboardEvent);

const Route =  useRoute()
const Router = useRouter()
let Ancient_Poetry_List = ref<any>()
console.log(Route.meta.show);


 request({
    url: '/Literature/literatureAncient/',
    method: "GET",

}).then((res: any) => {
     Ancient_Poetry_List.value = res
    console.log(Ancient_Poetry_List.value)
})

const goDisplay = ((keyword:number)=>{
    if(Route.query){
          let location = {name:'ancient_and_modern',params:{Keyword:keyword || undefined,Type:"Ancient"}};  
          Router.push(location);
        }
})


</script>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>