<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2-1"
        text-color="#fff" @open="handleOpen" @close="handleClose" @select="handleSelect">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>草稿箱</span>
            </template>
            <el-menu-item>Navigator Two</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>已发布</span>
            </template>
            <el-menu-item v-for="t in chapters" :index="'2-' + t.id">{{ t.name }}</el-menu-item>

        </el-sub-menu>
        <el-menu-item index="3" disabled>
            <el-icon>
                <document />
            </el-icon>
            <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <span>Navigator Four</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang='ts' setup>

import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, nextTick } from 'vue'
import request from '@/api/request'
import { Document, Menu as IconMenu, Location, Setting, } from '@element-plus/icons-vue'
import bus from '../../Novel/bus.js'

const Route = useRoute()
const chapters = ref<any>('')

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


const handleSelect = (key: string, keyPath: string[]) => {
    nextTick(() => {
        bus.emit("getval", key.split('-')[1])
    })

}

request({
    url: `Literature/literatureNovelChapter/${Route.params.Keyword}/`
}).then((res: any) => {
    chapters.value = res
    console.log(chapters.value);
})

</script>

<style scoped></style>