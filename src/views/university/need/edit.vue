<template>
  <div>
    <el-form
      :model="need"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="需求编号">
        <el-input v-model="need.id" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="标题	">
        <el-input v-model="need.title"></el-input>
      </el-form-item>
      <el-form-item label="紧急状态">
        <el-radio-group v-model="need.level">
          <el-radio :label="1">紧急</el-radio>
          <el-radio :label="2">非常紧急</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校">
        <el-select placeholder="请选择学校" v-model="school.sch_name" @change="needChange($event)">
          <el-option
            v-for="(item, index) in schoolList"
            :key="index"
            :value="item.sch_name"
          >{{item.sch_name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细信息">
        <wangeditor :catchData="catchData" :content="need.context" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getNeedOne as get,
  editNeed as edit,
  schoolList
} from "./../../../api/school";
import { Message } from "element-ui";
import wangeditor from "./../../../components/wangeditor_single";
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
      need: {},
      schoolList: [],
      school:{},
      rules: {
        telephone: [{ validator: validateTelephone, trigger: "blur" }]
      },
      schId: ""
    };
  },
  methods: {
    catchData(val) {
      this.work.context = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { id, title, level, schId, context } = this.need;
          this._edit({
            id,
            title,
            level,
            schId,
            context
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
      this.need = data;
      this.school = data.school
      console.log(res)
    },
    async _schoolList() {
      let res = await schoolList();
      let data = res.data.data;
      this.schoolList = data;
    },
    needChange(val) {
      let schId;
      this.schoolList.some(item => {
        schId = item.id;
        return item.sch_name === val;
      });
      console.log(schId)
      this.need.schId = schId;
    }
  },
  mounted() {
    this._get(this.$route.params.id);
    this._schoolList();
  },
  components: {
    wangeditor
  }
};
</script>

<style lang="less">
</style>