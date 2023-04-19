<template>
  <div class="showcase">
    <header>
      <div class="logo">
        <img src="./image/logo.png" />
      </div>
    </header>
    <video src="./image/xiaogong.mp4" loop muted autoplay></video>
    <div class="overlay"></div>
    <div class="main-container">
      <div class="text">
        <h2>云回忆</h2>
        <h3>打造属于自己的专属回忆录</h3>
        <p>
          青春易逝，回忆永存。人生路漫漫，生活点点滴滴，陶冶情操，文采张扬，充分发挥个人的魅力，展现出最真实的自我！
        </p>
        <a href="#">ENTER >>></a>
      </div>
      <div class="login-container">
        <h2>账号登录</h2>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100%" class="demo-ruleForm">

          <el-form-item prop="account" label-width="0">
            <el-input v-model="ruleForm.account" placeholder="账号邮箱" :prefix-icon="User" />
          </el-form-item>

          <el-form-item prop="password" label-width="0">
            <el-input v-model="ruleForm.password" type="password" placeholder="密码" :prefix-icon="Hide" />
          </el-form-item>



          <el-button type="warning" round @click="submitForm(ruleFormRef)">登录</el-button>

          <router-link to="/register">没有账号？点击注册</router-link>

        </el-form>
      </div>
    </div>

    <ul class="social">
      <li>
        <a href=""><img src="./image/qq.png" /></a>
      </li>
      <li>
        <a href=""><img src="./image/weixin.png" /></a>
      </li>
      <li>
        <a href=""><img src="./image/weibo.png" /></a>
      </li>
    </ul>
  </div>
</template>



<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import request from "./../../api/request";
import { User, Hide } from "@element-plus/icons-vue";
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const Router = useRouter();

const validate1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validate2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  account: '',
  password: '',

})

const rules = reactive({
  account: [{ validator: validate1, trigger: 'blur' }],
  password: [{ validator: validate2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      request({
        method: "POST",
        url: "/Users/login/",
        data: {
          username: ruleForm.account,
          password: ruleForm.password,
        },
      }).then(
        (res: any) => {
          console.log(res);
          window.localStorage.setItem('userInfo', res.token)
          window.sessionStorage.setItem('sessionid', res.session)
          Router.push("/home");
        },
        () => {

        }
      );
    } else {
      console.log('error submit!')
      return false
    }
  })
}



</script>

<style scoped>
.showcase {
  min-height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 100px;
}

.showcase header {
  top: 0;
  left: 0;
  display: flex;
  position: absolute;
  padding: 40px 100px;
  z-index: 999;
}

.showcase video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: darkkhaki;
  mix-blend-mode: overlay;
}

.logo {
  width: 60px;
}

.logo img {
  width: 100%;
}

.main-container {
  display: flex;
}

.text {
  position: relative;
  margin-top: 100px;
}

.text h2 {
  font-size: 5em;
  font-weight: 800;
  line-height: 1em;
}

.text h3 {
  font-size: 4em;
  font-weight: 700;
  line-height: 1em;
}

.text p {
  font-size: 1.1em;
  font-weight: 400;
  margin: 20px 0;
  max-width: 700px;
}

.text a {
  border-radius: 50%;
  display: inline-block;
  font-size: 1em;
  text-decoration: none;
  background: white;
  color: black;
  padding: 10px 30px;
  margin-top: 10px;
  transition: 0.2s;
}

.text a:hover {
  text-decoration: none;
  letter-spacing: 6px;
  color: gray;
}

.login-container {
  display: flex;
  margin-left: 100px;
  padding: 5px 30px;
  border-radius: 10%;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  height: 300px;
  width: 300px;
  background-color: white;
  color: black;
}

.login-container h2 {
  margin-bottom: 30px;
  z-index: 1;
  color: rgb(33, 28, 28);
  font-size: large;
  font-family: "Times New Roman", Times, serif;
}

.login-container form {
  z-index: 1;
  display: flex;
  flex-direction: column;
  color: rgb(33, 28, 28);
  font-size: large;
  font-family: "Times New Roman", Times, serif;
}

.login-container form a {
  font-size: 0.5em;
  margin-top: 5px;
}

.social {
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social li a {
  display: inline-block;
  width: 40px;
  margin-right: 20px;
  transition: 0.5s;
}

.social li a:hover {
  transform: translateY(-15px);
}

.social li a img {
  width: 100%;
}

@media (max-width: 991px) {

  .showcase,
  .showcase header {
    padding: 0 40px;
  }

  .login-container {
    margin-left: 10px;
  }

  .text h2 {
    font-size: 3em;
  }

  .text h3 {
    font-size: 2em;
  }
}
</style>







