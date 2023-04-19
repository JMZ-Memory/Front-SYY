<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="ruleForm.nickname" />
    </el-form-item>


    <el-form-item label="用户名">
      <el-col :span="11">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" disabled />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-col class="text-center" :span="2">
      <span class="text-gray-500"></span>
    </el-col>

    <el-form-item label="生日">
      <el-col :span="11">
        <el-form-item prop="birthday">
          <el-date-picker v-model="ruleForm.birthday" type="date" />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="男" />
        <el-radio label="女" />
        <el-radio label="保密" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="我的签名" prop="signature">
      <el-input v-model="ruleForm.signature" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>

    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import request from "../../../api/request"

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
  nickname: '',
  username: '',
  gender: '保密',
  birthday: '',
  signature: '',
})

const userdetail = request({
  method: "GET",
  url: `/Users/userdetail/${window.localStorage.getItem("userInfo")}/`,
}).then((res: any) => {
  if (res.gender == 1) ruleForm.gender == '男'
  else if (res.gender == 2) ruleForm.gender == '女'
  else ruleForm.gender == '保密'
  ruleForm.nickname = res.nickname
  ruleForm.username = res.username
  ruleForm.birthday = res.birthday,
    ruleForm.signature = res.signature
})

let date = new Date()
console.log(date)

const rules = reactive<FormRules>({
  nickname: [
    { required: false, max: 5, message: '名字长度不能超过5', trigger: 'blur' },
  ],
  username: [
    {
      required: true,
      pattern: RegExp('^[0-9a-zA-Z]+$'),
      message: '请输入数字或字母',
      trigger: 'change',

    },
    {
      required: true,
      min: 3,
      max: 32,
      message: '长度限制为3~32',
      trigger: 'change',
    },
  ],
  birthday: [
    {
      required: false,
      trigger: 'change',
    },
  ],


  gender: [
    {
      required: false,
      trigger: 'change',
    },
  ],
  desc: [
    { required: false, trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      request({
        url: `/Users/userdetail/${window.localStorage.getItem("userInfo")}/`,
        data: {
          gender: 1,
          nickname: ruleForm.nickname,
          birthday: ruleForm.birthday,
          signature: ruleForm.signature,
        },
        headers: {
          Authorization:`Token ${window.localStorage.getItem("userInfo")}`
        },
        method: 'PUT',
      }).then(() => {
        console.log('修改成功')
      })
    } else {
      console.log('修改失败', fields)
    }
  })
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>