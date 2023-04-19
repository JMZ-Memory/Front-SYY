<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="on">
          <div class="logo">
            <img src="./image/logo.png" />
          </div>
          <div class="directory">
            <el-button round @click="literature">文章</el-button>
            <el-button round>图库</el-button>
            <el-button round>日记</el-button>
          </div>
          <div class="jianjie">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" @click="drawer = true" />
            <el-drawer v-model="drawer" title="个人简介" :with-header="false">
              <div class="menu">
                <ul>
                  <li><a @click="home">主页</a></li>
                  <li><a @click="userDetail">个人信息</a></li>
                  <li><a @click="logout">退出登录</a></li>
                </ul>
              </div>
            </el-drawer>
          </div>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import { ref ,onBeforeMount} from "vue";
import { useRouter,useRoute } from "vue-router";
import request from "../../api/request";
const Router = useRouter();
const Route = useRoute()

onBeforeMount(() => {
  console.log(Route.path)
})

let drawer = ref(false);
const logout = () => {
  request({
    method: "GET",
    url: "/Users/logout/",
  }).then(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    Router.push("/");
  });
};
const home = () => {
  drawer.value = false
  Router.push("/home");
};
//个人信息
const userDetail = () => {
  request({
    method: "GET",
    url: `/Users/userdetail/${window.localStorage.getItem("userInfo")}/`,
   
  }).then(() => {
    console.log("跳转！！");
    drawer.value = false
    Router.push("/home/userdetail")
  });
};
//文章
const literature = () =>{
  console.log("跳转！！");
  Router.push("/home/literature")
}
</script>

<style scoped>
.common-layout {
  background-color: rgb(217, 229, 240);
  color: black;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

header .on {
  display: flex;
  justify-content: space-between;
}

header .down {
  display: flex;
  justify-content: center;
}

head .down button {
  margin: 20px;
}

.logo {
  width: 60px;
}

.logo img {
  width: 100%;
  color: rgb(224, 208, 208);
}
.directory {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.jianjie {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.el-carousel__item:nth-child(5) {
  background-image: url("./image/xinhai.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.menu ul li {
  margin-top: 20px;
}

.menu ul li a {
  font-family: "Times New Roman", Times, serif;
  font-size: 24px;
  color: black;
}

.menu ul li a:hover {
  color: lightblue;
}
</style>