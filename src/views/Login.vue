<template>
  <div class="register">
    <div class="from">
      <el-form :model="login" :rules="rules" ref="login" status-icon>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="login.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input>
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
        name: "",
        password: ""
      },
      rules: {
        name: [
          //trigger 触发时机
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" },
          { validator: validatorName, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this._login();
        }
      });
    },
    resetForm(formname) {
      this.$refs[formname].resetFields();
    }
  }
};
</script>

<style lang="less">
.register {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #bdc3c7;
  .from {
    background: rgba(230, 238, 232, 0.5);
    box-shadow: 0px 0px 8px black;
    display: flex;
    justify-content: center;
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