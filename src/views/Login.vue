<template>
  <div class="register">
    <div class="from">
      <el-form :model="login" :rules="rules" ref="login" status-icon>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="login.user_name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass_word">
          <el-input v-model="login.pass_word" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('login')">登录</el-button>
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { login } from "./../api/home";
import { Notification } from "element-ui";
import md5 from "md5";
export default {
  data() {
    var validatorName = (rule, value, callback) => {
      if (!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error("用户名包含非法字符"));
      } else {
        callback();
      }
    };
    return {
      login: {
        user_name: "",
        pass_word: ""
      },
      rules: {
        // label prop
        user_name: [
          //trigger 触发时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validatorName, trigger: "blur" }
        ],
        pass_word: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          let { _login, login } = this;
          //登录
          _login({
            user_name: login.user_name,
            pass_word: md5(login.pass_word)
          });
        }
      });
    },
    resetForm(formname) {
      this.$refs[formname].resetFields();
    },
    async _login(users) {
      let res = await login(users);
      if (res) {
        let { status, msg, data } = res.data;
        let { authorization } = res.headers;
        sessionStorage.token = authorization;
        sessionStorage.btn = true;
        Message.success(msg);
        this.$router.push({ path: "/layout?" });
        sessionStorage.user_name = data;
      }
    }
  },
  mounted() {
    this.$notify({
      title: "测试账号",
      message: "用户名:test<p>密 &nbsp;&nbsp;码:admin",
      dangerouslyUseHTMLString: true,
      duration: 3000
    });
  }
};
</script>

<style lang="less">
@import url("./../common/css/mixin.less");
.register {
  height: 100vh;
  .flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1abc9c, #2ecc71, #3498db, #9b59b6) left
    center/400% 400%;
  animation: move 10s ease-in-out infinite;
  @keyframes move {
    0%,
    100% {
      background-position-x: left;
    }
    50% {
      background-position-x: right;
    }
  }
  .from {
    background: rgba(230, 238, 232, 0.5);
    box-shadow: 0px 0px 8px black;
    .flex;
    align-items: center;
    padding: 10px 50px;
    border-radius: 4px;
    min-height: 20px;
    transition: 0.4s all;
  }
  .from:hover {
    box-shadow: 0px 0px 16px black;
  }
}
</style>