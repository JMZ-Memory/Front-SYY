<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script setup lang="ts">
import Header from "../../components/Header/Header.vue";
</script>

<style scoped>
main {
  margin-top: 50px;
}

</style>