<template>
    <div class="register">
        <div class="register_box">
            <p>用户注册</p>
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px"
                class="register_form">
                <el-form-item label="用户名" label-width="80px" prop="username">
                    <el-input placeholder="请输入用户名" v-model="registerForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input placeholder="请输入密码" v-model="registerForm.password" show-password
                        prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="80px" prop="password2">
                    <el-input placeholder="请再次输入密码" v-model="registerForm.password2" show-password
                        prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item label="昵称" label-width="80px" prop="nickname">
                    <el-input placeholder="请输入昵称" v-model="registerForm.nickname" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px" prop="email">
                    <el-input placeholder="请输入邮箱" v-model="registerForm.email" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="registerForm.phone" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="地址" label-width="80px" prop="address">
                    <el-input placeholder="请输入地址" v-model="registerForm.address" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- :disabled="true"禁用输入 -->
                <el-input :disabled="true" v-show="false" v-model="registerForm.role" prefix-icon="el-icon-user"></el-input>
                <!-- v-show="false" 隐藏输入框 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="register">注册</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Register',
    data() {
        return {
            // 这是注册表单的数据绑定对象
            registerForm: {
                username: "",
                password: "",
                password2: "",
                nickname: "",
                email: "",
                phone: "",
                address: "",
                role: "ROLE_USER"
            },
            registerFormRules: {
                username: [
                    { required: true, message: "请输入注册账号", trigger: "blur" },
                    { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入注册密码", trigger: "blur" },
                    { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
                ],
                password2: [
                    { required: true, message: "请再次输入密码", trigger: "blur" },
                    { validator: this.validatePassword2, trigger: "blur" }
                ],
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    { trigger: "blur" }
                ],
                email: [
                    { required: false, message: "请输入邮箱", trigger: "blur" },
                    { trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { trigger: "blur" }
                ],
                address: [
                    { required: true, message: "请输入地址", trigger: "blur" },
                    { trigger: "blur" }
                ],
            },
        };
    },
    methods: {
        // 点击重置按钮,重置注册表单
        reset() {
            this.$refs.registerFormRef.resetFields();
        },
        // 验证两次密码是否一致
        validatePassword2(rule, value, callback) {
            if (value !== this.registerForm.password) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        },
        // 注册
        register() {
            this.$refs.registerFormRef.validate(async valid => {
                if (valid) {
                    // 发送注册请求
                    this.request.post("/user/register", this.registerForm).then(res => {
                        if (res.code === "200") {
                            this.$message.success("注册成功");
                            // 跳转到登录页
                            this.$router.push("/login");
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
    }
};
</script>
<style scoped>
.register {
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}

.register_box {
    height: 568px;
    width: 450px;
    background: #fff;
    border-radius: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.register_form {
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 0px 30px;
    box-sizing: border-box;
}

/* .btns 元素的子元素（假设有多个按钮）水平排列，并且靠右对齐。具体地说，它使用了 flex 布局，其中 display 属性将元素设置为 flex 容器，justify-content 属性将子元素沿主轴（水平方向）对齐，并将它们靠近容器的尾部。*/

/* .btns { 
 display: flex; 
 justify-content: flex-end; 
} */
</style>