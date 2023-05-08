<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Aside></Aside>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<script lang='ts' setup>
import Header from './Header/index.vue'
import Aside from './Aside/index.vue'
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref } from 'vue'
import request from '@/api/request'

const Router = useRouter()
const Route = useRoute()

Router.push(`/novel_display${Route.params.Keyword}/chapter1`)



</script>

<style scoped></style>