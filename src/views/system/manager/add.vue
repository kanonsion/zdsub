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
      <el-form-item label="管理员名称">
        <el-input v-model="manager.user_name"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码	">
        <el-input v-model="manager.pass_word"></el-input>
      </el-form-item>
      <el-form-item label="所属学校">
        <el-select placeholder="请选择级别" v-model="manager.schid" @change="schoolChange($event)">
          <el-option
            v-for="(item, index) in schoolList"
            :key="index"
            :value="item.sch_name"
          >{{item.sch_name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="manager.telephone"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select placeholder="请选择级别" v-model="sch_id" @change="managerChange($event)">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :value="item.role_name"
          >{{item.role_name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, roleList, verifyByName } from "./../../../api/system";
import { schoolList } from "@/api/school";
import { Message } from "element-ui";
import md5 from "md5";
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
      schoolList: [],
      sch_id: "",
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
          this._verifyByName(this.manager.user_name);
        }
      });
    },
    async _verifyByName(name) {
      let res = await verifyByName(name);
      if (res.data.data === false) {
        let { user_name, pass_word, schId, telephone, roleId } = this.manager;
        this._add({
          user_name,
          pass_word: md5(pass_word),
          schId,
          telephone,
          roleId
        });
      } else {
        Message.error("管理员名称重复");
      }
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
    async _roleList() {
      let res = await roleList();
      let data = res.data.data;
      this.roleList = data;
    },
    async _schoolList() {
      let res = await schoolList();
      let data = res.data.data;
      this.schoolList = data;
    },
    managerChange(val) {
      let roleId;
      this.roleList.some(item => {
        roleId = item.id;
        return item.role_name === val;
      });
      this.manager.roleId = roleId;
    },
    schoolChange(val) {
      console.log(val);
      let schId;
      this.schoolList.some(item => {
        schId = item.id;
        return item.sch_name === val;
      });
      this.manager.schId = schId;
    }
  },
  mounted() {
    this._roleList();
    this._schoolList();
  }
};
</script>

<style lang="less">
</style>