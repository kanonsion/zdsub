<template>
  <div>
    <el-form
      :model="school"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
      :rules="rules"
    >
      <el-form-item label="学校名称" prop="sch_name">
        <el-input v-model="school.sch_name"></el-input>
      </el-form-item>
      <el-form-item label="需要援助">
        <el-radio-group v-model="school.rec_school">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="前往援助">
        <el-radio-group v-model="school.is_zup">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <wangeditor
        :catchData="catchData"
        :content="school.message"
        :catchDataTwo="catchData2"
        :contentTwo="school.sup_history"
      />
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangeditor from "./../../../components/wangeditor";
import { add } from "./../../../api/school";
import { Message } from "element-ui";
export default {
  data() {
    return {
      school: {},
      rules: {
        sch_name: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    catchData(val) {
      this.school.message = val;
    },
    catchData2(val) {
      this.school.sup_history = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._add(this.school);
        }
      });
    },
    async _add(data) {
      let res = await add(data);
      let { status } = res.data;
      if (status === 200) {
        Message.success("添加成功");
        this.$router.go(-1);
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  components: {
    wangeditor
  }
};
</script>

<style lang="less">

</style>