<template>
    <div class="login-body">
        <div class="login-panel">
            <div class="login-title">用户注册</div>
            <el-form :model="registerData" :rules="rules">
                <el-form-item prop="account">
                    <el-input placeholder="请输入邮箱" v-model="registerData.account" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="lock" type="password" placeholder="请输入密码" v-model="registerData.password" />
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="lock" type="password" placeholder="请再次输入密码"
                        v-model="registerData.rePassword" />
                </el-form-item>

                <el-form-item>
                    <router-link to="login">
                        <el-button type="text" class="button_existAccount">已有账号？</el-button>
                    </router-link>

                    <div class="verification">
                        <el-form-item prop="verificationCode">
                            <el-input placeholder="请输入验证码" v-model="registerData.verificationCode" />
                        </el-form-item>
                    </div>

                    <div class="button_sendCode">
                        <el-button type="primary" @click="sendCode">发送验证码</el-button>
                    </div>
                </el-form-item>

                <el-form-item style="width: 100%;">
                    <div class="button_register1">
                        <el-button type="primary" @click="register">注册</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const registerData = ref({
    account: '',
    password: '',
    rePassword: '',
    verificationCode: ''
});
const checkRePassword = (rule, value, callback) => {
    if (value == '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== registerData.value.password) {
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
import { userRegisterService, sendVerificationCode } from '@/api/user.js'
const register = async () => {
    let result = await userRegisterService(registerData.value);
    ElMessage.success(result.msg ? result.msg : "注册成功");
    router.push('/user/login');
}
const sendCode = async () => {
    try {
        await sendVerificationCode(registerData.value.account);
        ElMessage.success('验证码已发送至邮箱');
    } catch (error) {
        ElMessage.error('发送失败！');
    }
};

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
    background-image: url(../assets/register-bg.jpg);
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

.existAccount {
    float: right;
    color: #50b6ff;
    text-decoration: none;
}

.button_register1 {
    width: 100%;
    background: #409EFF;
    text-align: center;
    border: none;
    border-radius: 5px;
}

.verification {
    width: 45%;
}

.button_sendCode {
    width: 15%;
}
</style>