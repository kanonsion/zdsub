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
        <el-input v-model="role.cdescriprition"></el-input>
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
import {
  update_role as edit,
  findNotParent,
  get_role as get
} from "./../../../api/system";
import { Message } from "element-ui";
export default {
  data() {
    return {
      role: {},
      findNotParent: [],
      ids: [],
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
    submit() {
      this._edit;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ids = this.$refs.tree.getCheckedKeys();
          let role = this.role;
          this._edit({
            ids,
            ...role
          });
        }
      });
    },
    async _edit(data) {
      let res = await edit(data);
      console.log(res)
      let { status } = res.data;
      if (status === 200) {
        Message.success("修改成功");
        this.$router.go(-1);
      }
    },
    async _get(id) {
      let res = await get(id);
      this.role = res.data.data;
    },
    back() {
      this.$router.go(-1);
    },
    async _findNotParent(id) {
      let res = await findNotParent(id);
      let data = res.data.data;
      let { ids, menus } = data;
      console.log(data);
      console.log(menus);
      this.ids = ids;
      this.findNotParent = menus;
    }
  },
  mounted() {
    this._get(this.$route.params.id);
    this._findNotParent(this.$route.params.id);
  }
};
</script>

<style lang="less">
</style>