<template>
    <div class="login-body">
        <div class="login-panel">
            <div class="login-title">用户登录</div>
            <el-form :model="formData" :rules="rules">
                <el-form-item prop="account">
                    <el-input placeholder="请输入邮箱" v-model="formData.account" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="lock" type="password" placeholder="请输入密码" v-model="formData.password" />
                </el-form-item>

                <el-form-item style="width: 100%;">
                    <el-button type="text" class="button_forgot" @click="beforeTo">找回密码？</el-button>
                </el-form-item>

                <el-form-item label="">
                    <div class="button-group">
                        <el-button type="primary" class="button_login" @click="login">登录</el-button>
                        <router-link to="register">
                            <el-button type="primary" class="button_register">注册</el-button>
                        </router-link>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {userLoginService} from '@/api/user.js'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
import {useTokenStore} from '@/stores/token.js'
const router = useRouter();
const tokenStore = useTokenStore();
const formData = ref({
    account: '',
    password: ''
});
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
        { required: true, message: '请输入密码', trigger: 'blur'},
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur'}
    ]
}
const login = async ()=>{
    let result = await userLoginService(formData.value);
    // if (result.code === 1){
    //     alert(result.msg ? result.msg : "success");
    // }else{
    //     alert("fall")
    // }
    // alert(result.msg ? result.msg : "success");
    ElMessage.success(result.msg ? result.msg : "登录成功")
    tokenStore.setToken(result.data); // 假设后端返回的数据中包含token
    router.push('/')
}
const beforeTo = ()=>{
    router.push('/user/resetpassword')
}
</script>

<style lang="scss">
.login-body {
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: fixed;
    width: 100%;
    height: calc(100vh);
    background-image: url(../assets/login-bg.jpg);
}

.login-panel {
    margin: 20% 40% 0 40%;
    width: 350px;
    background: #fff;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}

.login-title {
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
}

.button-group {
    justify-content: space-between; // 在容器内平均分配空间，将按钮推向容器两端
    width: 100%; 
}

.button_login {
    width: 48%;
    background: #409EFF;
    border: none;
    float: left;
}

.button_register {
    width: 48%;
    background: #505458;
    border: none;
    float: right;
}

.button_forgot {
    float: right;
    color: #50b6ff;
    text-decoration: none;
}
</style>
