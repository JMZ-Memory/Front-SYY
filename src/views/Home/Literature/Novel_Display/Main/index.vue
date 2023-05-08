<template>
    <div class="display" >
        <p v-for="p in result">
            {{ p }}
        </p>
    </div>
</template>

<script lang='ts' setup>
import request from '@/api/request'
import bus from '../../Novel/bus.js'
import { ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const Router = useRouter()
const Route = useRoute()

const result = ref('')

bus.on("getval", (val: any) => {
    request({
        url: `Literature/literatureNovelDetail/${val}/`
    }).then((res: any) => {
        result.value = res.context.split(' ')
        console.log(val);
        Router.push(`/novel_display${Route.params.Keyword}/chapter${val}`)
    })
})

onUnmounted(() => {
    bus.off("getval")
})
</script>

<style scoped>

.display p{
    /* content: '\00a0\00a0\00a0\00a0'; */
    text-indent: 2em;
    
}
</style>