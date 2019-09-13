<template>
  <div>
    <el-tree :data="findNotParent" :props="defaultProps" show-checkbox></el-tree>
    <el-button type="success" size="mini" style="margin-top:50px">提交</el-button>
  </div>
</template>

<script>
import {
  get_role as get,
  update_role as edit,
  findNotParent
} from "./../../../api/system";
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
      role: {},
      findNotParent: [],
      rules: {
        telephone: [{ validator: validateTelephone, trigger: "blur" }]
      },
      roleId: "",
      defaultProps: {
        children: "children",
        label: "menu_name"
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {
            id,
            user_name,
            pass_word,
            sch_id,
            telephone,
            roleId
          } = this.role;
          this._edit({
            user_name,
            pass_word,
            schId: sch_id,
            telephone,
            roleId,
            id
          });
        }
      });
    },
    async _edit(data) {
      let res = await edit(data);
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
      this.role = data;
      console.log(this.role);
    },
    async _findNotParent() {
      let res = await findNotParent();
      let data = res.data.data;
      this.findNotParent = data;
      console.log(this.findNotParent);
    }
  },
  mounted() {
    this._get(this.$route.params.id);
    this._findNotParent();
  }
};
</script>

<style lang="less">
</style>