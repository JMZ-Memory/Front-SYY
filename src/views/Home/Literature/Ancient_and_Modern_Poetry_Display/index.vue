<template>
    <div class="contain">
        <div class="display">
            <h1>{{ result.title }}</h1>
            <p v-for="p in result.context">{{ p }}</p>

        </div>

    </div>
</template>

<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import request from '@/api/request';
import { method } from 'lodash';
import { reactive } from 'vue';


const Router = useRouter()
const Route = useRoute()

const result = reactive({
    title: '',
    context: '',

})




console.log(Route.params);


if (Route.params.Type == 'Modern') {
    request({
        url: `/Literature/literatureModernDetail/${Route.params.Keyword}/`,
        method: "GET",
    }).then((res: any) => {
        result.title = res.title
        result.context = res.context.split(' ')
    })
}
else{
  
    request({
        url: `/Literature/literatureAncientDetail/${Route.params.Keyword}/`,
        method: "GET",
    }).then((res: any) => {
        result.title = res.title
        result.context = res.context.split(' ')


    })
}





</script>

<style scoped>
.contain {
    display: flex;
    justify-content: center;
    padding: 50px;

}

.display {
    background-color: pink;
    width: 50%;
    height: 600px;
    overflow-y: scroll;
    /* display: flex; */
    flex-direction: column;
    align-items: center;
}
.display p{
    /* content: '\00a0\00a0\00a0\00a0'; */
    text-indent: 2em;
    
}
</style>