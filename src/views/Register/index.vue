<template>
  <div class="showcase">
    <img fit="cover" src="./image/yelan.jpg" />
    <div class="overlay"></div>

    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0" class="demo-ruleForm">
      <div class="title">
        <h1>用户注册</h1>
      </div>

      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" placeholder="手机号/邮箱" prefix-icon="User" />
      </el-form-item>
      <el-form-item prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="密码" prefix-icon="Hide" />
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="确认密码" prefix-icon="Hide" />
      </el-form-item>
      <el-form-item prop="code">
        <el-col :span="16"><el-input v-model="ruleForm.code" autocomplete="off" placeholder="验证码" /></el-col>
        <el-col :span="8"><el-button :type=code_value.btn_color @click=getCode :disabled=code_value.btn_type>{{
          code_value.seconds }}</el-button></el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
        <el-button @click="resetForm(ruleFormRef)">清空</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { Hide, User } from "@element-plus/icons-vue";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import request from "./../../api/request";
import { FormInstance, FormRules } from 'element-plus'


const reg_phone = RegExp("^1[3,4,5,7,8][0-9]\\d{8}$")
const reg_email = RegExp("^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$")



const Router = useRouter();

const ruleFormRef = ref<FormInstance>()

const checkAccount = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入手机号或邮箱'))
  }
  setTimeout(() => {
    if (reg_phone.test(value)) {
      code_value.btn_type = false
      callback()
    }
    else if (reg_email.test(value)) {
      code_value.btn_type = false
      callback()
    }
    else {
      code_value.btn_type = true
      callback(new Error('账号格式不正确'))
    }
  }, 1000)
}

const checkCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  else if (!code_value.code) {
    return callback(new Error('请发送验证码请求'))
  }
  else {
    if (value !== code_value.code) {
      return callback(new Error('验证码错误'))
    }
    else {
      return callback()
    }
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  else if (value.length < 6) {
    callback(new Error('密码长度不能低于6位'))
  }
  else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("输入密码不一致"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  account: '',
  code: null
})

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  account: [{ validator: checkAccount, trigger: 'blur' }],
  code: [{ validator: checkCode, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      request({
        method: "POST",
        url: "/Users/register/",
        data: { account: ruleForm.account, password: ruleForm.pass },
      }).then(
        () => {
          alert("注册成功");
          Router.push("/");
        },
        () => { }
      );
    } else {
      console.log('注册失败')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const code_value: any = reactive({
  seconds: '验证码请求',
  timer: null,
  btn_type: true,
  btn_color: 'primary',
  code: null,
  code_timer: null
})

const getCode = () => {

  code_value.btn_type = true
  code_value.btn_color = 'info'
  code_value.seconds = 60
  code_value.timer = setInterval(() => {
    if (code_value.seconds !== 0) {
      code_value.seconds -= 1
    }
    else {
      clearInterval(code_value.timer)
      code_value.seconds = "再次发送"
      code_value.btn_color = 'primary'
      code_value.btn_type = false
    }
  }, 1000)

  if (reg_email.test(ruleForm.account)) {
    request({
      url: '/Users/email_check/',
      method: 'POST',
      data: { email: ruleForm.account }
    }).then((res: any) => {
      if (parseInt(res)) {
        code_value.code = res
        code_value.code_timer = setTimeout(() => {
          code_value.code = null
        }, 10000)
      }
      else {
        alert(res);
      }
    })
  }
  if (reg_phone.test(ruleForm.account)) {
    code_value.code = '123'
    code_value.code_timer = setTimeout(() => {
      code_value.code = null
    }, 10000)
  }

}

</script>

<style>
.showcase {
  min-height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
}

.showcase img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.8;
}

.showcase .el-form {
  z-index: 1;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -20%;
  width: 302px;
  font-family: "Times New Roman", Times, serif;
}




.showcase .el-form .title {
  display: flex;
  font-size: 2em;
  justify-content: center;
  margin-bottom: 20px;
}

.showcase .el-form .title h1 {
  font-size: 1em;
}


.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(215, 206, 206);
  mix-blend-mode: overlay;
}
</style>