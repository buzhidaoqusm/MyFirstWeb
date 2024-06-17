<template>
    <div class="reset-body">
        <div class="reset-panel">
            <el-steps :active="active" finish-status="success">
                <el-step title="验证用户名和邮箱"></el-step>
                <el-step title="输入验证码"></el-step>
                <el-step title="设置新密码"></el-step>
            </el-steps>
            <el-form :model="Form" :rules="rules" class="user-container" label-position="left" label-width="80px">
                <div v-if="active === 0" class="common_div">
                        <el-form-item prop="account" style="float: right; width: 90%" label="邮箱号">
                            <el-input type="text" v-model="Form.account" placeholder="请输入用来找回密码的邮箱" prefix-icon="el-icon-message">
                            </el-input>
                        </el-form-item>
                </div>
                <div v-if="active === 1" class="common_div">
                        <el-form-item prop="verificationCode" style="float: right; width: 80%" label="验证码">
                            <el-input type="text" v-model="Form.verificationCode" placeholder="请输入邮箱验证码" prefix-icon="el-icon-s-promotion">
                            </el-input>
                        </el-form-item>
                </div>
            <div v-if="active === 2" class="common_div">
                    <el-form-item prop="password" style="float: right; width: 80%" label="新密码">
                        <el-input type="password" v-model="Form.password" placeholder="请输入新密码" prefix-icon="el-icon-key" >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="rePassword" style="float: right; width: 80%" label="确认密码">
                        <el-input type="password" v-model="Form.rePassword" placeholder="请再次输入密码" prefix-icon="el-icon-key" >
                        </el-input>
                    </el-form-item>
            </div>
            
            </el-form>
            <div class="common_div">
                <el-button  type="primary" @click="next" :disabled="disabled" class="action_button">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
const active = ref(0)
const disabled = ref(false)
const next = () => {
  if (active.value === 0){
    if (isEmail(Form.value.account)) {
        if (checkEmail()){
            sendCode()
        }
    } else {
      ElMessage.error('请输入正确的邮箱')
    }
  }
  if (active.value === 1){
    checkCode()
  }
  if (active.value === 2){
    if (Form.value.password == '' || Form.value.rePassword == ''){
      ElMessage.error('密码不能为空')
    } else if (Form.value.password.length < 5 || Form.value.password.length > 16 || 
        Form.value.rePassword.length < 5 || Form.value.rePassword.length > 16){
        ElMessage.error('密码长度为5-16位')
    } else if (Form.value.password != Form.value.rePassword){
        ElMessage.error('两次输入的密码不一样')
    } else {
        reset_password()
    }
  }
}
import {checkEmailAccount, sendVerificationCode, checkVerificationCode, resetPassword} from '@/api/user.js'
const checkEmail = async () => {
    await checkEmailAccount(Form.value.account);
    active.value++
    return true;
}
const sendCode = async () => {
    try {
        await sendVerificationCode(Form.value.account);
        ElMessage.success('验证码已发送至邮箱');
        return true;
    } catch (error) {
        ElMessage.error('发送失败！');
        return false;
    }
};
const checkCode = async () => {
    try {
        await checkVerificationCode(Form.value.account, Form.value.verificationCode);
        active.value++
        return true;
    } catch (error) {
        ElMessage.error('验证码错误！');
        return false;
    }
};
const reset_password = async () => {
    await resetPassword(Form.value.account, Form.value.password);
    ElMessage.success('密码重置成功！');
    router.push('/user/login')
};
const Form = ref({
    account: '',
    verificationCode: '',
    password: '',
    rePassword: ''
})

const checkRePassword = (rule, value, callback) => {
    if (value == '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== Form.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}

const isEmail = (email) => {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (reg.test(email)) {
        return true;
    } else {
        return false;
    }
}
const validateEmail = (rule, value, callback) => {
    if (value == '') {
        callback(new Error('请输入邮箱'))
    } else if (!isEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
    } else {
        callback()
    }
}

const rules = {
    account: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        { validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ],
    verificationCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' }
    ]
}
</script>

<style scoped>
    .reset-body{
        background-image: url("@/assets/resetpassword.webp");
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    .reset-panel{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 10% auto;
        width: 30%;
        padding: 25px 30px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        opacity: 0.85;
    }
    .common_div{
        margin: 10% 0 0 5%;
    }
    .user-container {
        width: 80%;
        background: #fff;

    }
    .action_button {
        background: #409EFF;
        width: 20%;
        margin-top: 3%;
        text-align: center;
    }

</style>