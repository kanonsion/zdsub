<template>
  <div>
    <el-form
      :model="adver"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="adver.title"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="schname">
        <el-select placeholder="请选择学校" v-model="adver.schname" @change="schoolChange($event)">
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :value="item.sch_name"
          >{{item.sch_name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细信息">
        <wangeditor :catchData="catchData" :content="adver.context" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangeditor from "./../../../components/wangeditor_single";
import { add } from "./../../../api/advertise";
import { schoolList } from "./../../../api/school";
import { Message } from "element-ui";
export default {
  data() {
    return {
      adver: {},
      list: [],
      schname: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        schname: [{ required: true, message: "请选择学校" }]
      }
    };
  },
  methods: {
    catchData(val) {
      this.adver.context = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { title, context, schId } = this.adver;
          this._add({
            title,
            context,
            schId
          });
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
    async _schoolList() {
      let res = await schoolList();
      let { data } = res.data;
      this.list = data;
    },
    back() {
      this.$router.go(-1);
    },
    schoolChange(val) {
      let schId;
      this.list.some(item => {
        schId = item.id;
        return item.sch_name === val;
      });
      this.adver.schId = schId;
    }
  },
  components: {
    wangeditor
  },
  mounted() {
    this._schoolList();
  }
};
</script>

<style lang="less">
.el-select-dropdown {
  z-index: 99999 !important;
}
</style>