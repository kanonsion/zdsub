<template>
  <div id="homelistshow">
    <homeheader />
    <section class="main">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>动态内容</el-breadcrumb-item>
      </el-breadcrumb>
      <!--  -->
      <div class="context">
        <div class="detail">
          <div class="title">
            <h2>{{data.title || data.path_name || data.sch_name}}</h2>
          </div>
          <div class="text" v-html="data.context || data.message" v-if="!data.path_name"></div>
          <div style="display:flex;flex-wrap: wrap" v-else>
            <div :key="tag" v-for="tag in tags" class="tag">
              <div class="center"></div>
              <div class="to_right"></div>
              <el-tag :disable-transitions="true">{{tag}}</el-tag>
            </div>
          </div>
        </div>
        <!--  -->
        <div>
          <el-button type="primary" @click="dialogFormVisible = true">点击报名</el-button>
        </div>
      </div>

      <el-dialog :visible.sync="dialogFormVisible" modal width="600px">
        <el-form :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.user_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="支援课程">
            <el-input v-model="form.course_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属学校">
            <el-select placeholder="请选择学校" v-model="form.schid" @change="needChange($event)">
              <el-option
                v-for="(item, index) in schoolList"
                :key="index"
                :value="item.sch_name"
              >{{item.sch_name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.qq" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">报名</el-button>
        </div>
      </el-dialog>
    </section>

    <!--  -->
    <homefooter />
  </div>
</template>

<script>
import homeheader from "./homeheader";
import homefooter from "./homefooter";
import { schoolList, addEnter } from "@/api/home";
import {Message} from 'element-ui'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      schoolList: []
    };
  },
  props: ["data"],
  components: {
    homeheader,
    homefooter
  },
  methods: {
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
      console.log(schId);
      this.form.sch_id = schId;
    },
    async submit() {
      let { course_name, qq, sch_id, telephone, user_name } = this.form;
      let need_id = this.$route.query.id
      console.log(need_id)
      let res = await addEnter({
        course_name,
        qq,
        sch_id,
        telephone,
        user_name,
        need_id
      });
      if(res.data.status === 200) Message.success(res.data.msg)
      this.dialogFormVisible = false;
    }
  },
  computed: {
    tags() {
      return this.data.context.split("|");
    }
  },
  mounted() {
    this._schoolList();
  }
};
</script>

<style lang="less">
@import url("./../common/css/mixin.less");
#homelistshow {
  .main {
    .center(60%);
    margin-top: 40px;
    .breadcrumb {
      font-size: 16px;
    }
    .context {
      margin: 40px 20px 20px 20px;
      .flex(space-between);
      min-height: 600px;
      .detail {
        width: 70%;
        .title {
          font-size: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid @grey;
        }
        .text {
          padding-top: 20px;
        }
      }
      .more {
        width: 20%;
        p {
          font-size: 24px;
          padding-bottom: 20px;
        }
        ul {
          li {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            font-size: 14px;
            padding-bottom: 15px;
          }
        }
      }
    }
  }
}
</style>