<template>
    <div class="login">
        <!--    登录框-->
        <div class="login_box">
            <p>用户登录</p>
            <el-form ref="LoginFormRef" :model="loginForm" :rules="LoginFormRules" label-width="0px" class="login_form">
                <!--        用户名-->
                <el-form-item label="用户名" label-width="80px" prop="username">
                    <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!--        密码-->
                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" show-password
                        prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="success" @click="register">注册</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
import {setRoutes} from '@/router';

export default {
    name: 'Login',
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            LoginFormRules: {
                username: [
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登陆密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
                ]
            },

        };
    },
    methods: {
        //点击重置按钮,重置登录表单
        login() {
            this.$refs['LoginFormRef'].validate(async (valid) => {
                if (valid) {
                    this.request.post("/user/login", this.loginForm).then(res => {
                        if (res.code == '200') {
                            localStorage.setItem("user", JSON.stringify(res.data));//存储用户信息到浏览器
                            localStorage.setItem("menus", JSON.stringify(res.data.menus));//存储用户权限菜单信息到浏览器
                            // console.log("提示",res.data.menus);
                            //动态设置当前用户的路由
                            setRoutes()
                            this.$router.push("/home");
                            this.$message.success("登录成功")
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        reset(){
            this.$refs.LoginFormRef.resetFields()
        },

        register(){
            // setRoutes()
            this.$router.push("/register")
        }
    }
}
</script>

<style scoped>
.login {
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.login_box {
    height: 300px;
    width: 450px;
    background: #fff;
    border-radius: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.login_form {
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 0px 30px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>

