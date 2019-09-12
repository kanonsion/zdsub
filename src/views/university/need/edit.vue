<template>
  <div>
    <el-form
      :model="manager"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="管理员编号">
        <el-input v-model="manager.id" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="管理员名称	">
        <el-input v-model="manager.user_name"></el-input>
      </el-form-item>
      <el-form-item label="所属学校">{{manager.schName}}</el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="manager.telephone"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select placeholder="请选择级别" v-model="roleId" @change="managerChange($event)">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :value="item.role_name"
          >{{item.role_name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">{{manager.create_time}}</el-form-item>
      <el-form-item label="创建者	">{{manager.user_name}}</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get, add, roleList } from "./../../../api/system";
import { Message } from "element-ui";
var validateTelephone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入电话号码"));
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error("请输入正确的电话号码"));
    }
    callback();
  }
};
export default {
  data() {
    return {
      manager: {},
      roleList: [],
      rules: {
        telephone: [{ validator: validateTelephone, trigger: "blur" }]
      },
      roleId: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { user_name, pass_word, sch_id, telephone, roleId } = this.manager;
          this._add({
            user_name,
            pass_word,
            schId:sch_id,
            telephone,
            roleId
          });
        }
      });
    },
    async _add(data) {
      let res = await add(data);
      let { status } = res.data;
      if (status === 200) {
        Message.success("修改成功");
        this.$router.go(-1);
      }
    },
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.manager = data;
      console.log(this.manager);
    },
    async _roleList() {
      let res = await roleList();
      let data = res.data.data;
      this.roleList = data;
    },
    managerChange(val) {
      let roleId;
      this.roleList.some(item => {
        roleId = item.id;
        return item.role_name === val;
      });
      this.manager.roleId = roleId;
    }
  },
  mounted() {
    this._get(this.$route.params.id);
    this._roleList();
  }
};
</script>

<style lang="less">
</style>