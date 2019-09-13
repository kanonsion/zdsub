<template>
  <div>
    <el-form
      :model="role"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="权限名称" prop="role_name">
        <el-input v-model="role.role_name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="role.cdescription"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="role.context"></el-input>
      </el-form-item>
      <el-form-item>
        <el-tree
          :data="findNotParent"
          node-key="id"
          :props="defaultProps"
          show-checkbox
          :default-checked-keys="ids"
          ref="tree"
        ></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add_role as add, findNotParent } from "./../../../api/system";
import { Message } from "element-ui";
export default {
  data() {
    return {
      role: {},
      findNotParent: [],
      roleId: "",
      defaultProps: {
        children: "children",
        label: "menu_name",
        id: "id"
      },
      rules: {
        role_name: [
          { required: true, message: "请输入权限名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let role = this.role;
          this._add({
            ...role
          });
        }
      });
    },
    async _add(data) {
      let res = await add(data);
      let { status } = res.data;
      if (status === 200) {
        Message.success("新增成功");
        this.$router.go(-1);
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
</style>