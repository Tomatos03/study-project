<template>
    <div class="loginStyle">
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="loginForm"
        >
            <h2 class="loginTitle">人事后台管理系统</h2>
            <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    type="text"
                    auto-complete="off"
                    placeholder="账号"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="code" class="login-code-verify">
                <div class="code-wrapper">
                    <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="验证码"
                        style="width: 60%"
                        @keyup.enter.native="handleLogin"
                    >
                    </el-input>
                    <img :src="codeUrl" @click="getCode" class="login-code-img" />
                </div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 20px 0px"
                >记住密码</el-checkbox
            >
            <el-form-item style="width: 100%">
                <el-button
                    :loading="loading"
                    type="primary"
                    style="width: 100%"
                    @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { getCodeImg, login } from '@/api/login'
    import { ElMessage } from 'element-plus'
    import { onMounted, reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'
    const loading = ref(false)
    const codeUrl = ref('')
    const loginFormRef = ref()
    const router = useRouter()
    const userStore = useUserStore()
    const loginForm = reactive<LoginForm>({
        username: '',
        password: '',
        code: '',
        uuid: '',
        rememberMe: false,
    })
    const loginRules = {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    }

    const getCode = async () => {
        getCodeImg().then((res: any) => {
            console.log(res)
            codeUrl.value = URL.createObjectURL(res.data)
        })
    }

    onMounted(() => {
        getCode()
    })

    const handleLogin = () => {
        loginFormRef.value.validate((valid: boolean) => {
            if (!valid) {
                return false
            }
            loading.value = true
            login(loginForm)
                .then((res: any) => {
                    loading.value = false
                    if (res.data.code == 0) {
                        ElMessage.error(res.data.message)
                        return
                    }
                    if (res.data.code !== 200) {
                        return
                    }

                    userStore.setAuth(true)
                    router.push({ name: 'Home' })
                })
                .finally(() => {
                    loading.value = false
                })
        })
    }
</script>

<style lang="scss" scoped>
    .loginStyle {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .loginTitle {
        text-align: center;
        color: #818181;
    }

    .loginForm {
        border-radius: 6px;
        width: 450px;

        .el-input {
            height: 40px;
            input {
                height: 40px;
            }
        }
    }
    .code-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .login-code-img {
        height: 40px;
        width: 35%;
    }
</style>
