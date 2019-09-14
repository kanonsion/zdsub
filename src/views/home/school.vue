<template>
  <div>
    <list
      :list="list"
      :pagination="pagination"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :router='router'
    />
  </div>
</template>

<script>
import list from "./../../components/homelist";
import { school, get_school as get } from "@/api/home";
export default {
  data() {
    return {
      list: {},
      router:'/home/school/show'
    };
  },
  methods: {
    async _school(curr, size) {
      let res = await school({
        pageNo: curr,
        pageSize: size
      });
      let { resultList, pageNo, pageSize, totalCount } = res.data.data;
      this.list = resultList;
      console.log(this.list);
      this.pagination = {
        size: pageSize,
        total: totalCount,
        curr: pageNo
      };
      console.log(this.pagination);
    },
    handleSizeChange(val) {
      console.log(val)
      let { size, curr } = this.pagination;
      size = val;
      this._school(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 3;
      this._school(curr, size);
    }
  },
  mounted() {
    this._school(0, 3);
  },
  components: {
    list
  }
};
</script>

<style lang="less">
</style>