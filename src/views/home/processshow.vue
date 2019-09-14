<template>
  <div>
    <homelistshow :data="data" />
  </div>
</template>

<script>
import homelistshow from "@/components/homelistshow";
import { get_process as get } from "@/api/home";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    async _get(id) {
      let res = await get(id);
      console.log(res);
      this.data = res.data.data;
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this._get(id);
  },
  components: {
    homelistshow
  }
};
</script>

<style lang="less">
.center {
  height: 10px;
  width: 50px;
  background: #2ecc71;
  opacity: 0.7;
}
.to_right {
  width: 0;
  height: 0;
  border-left: 30px solid #2ecc71;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  opacity: 0.7;
}
.tag {
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
}
.el-tag {
  margin: 5px;
}
</style>