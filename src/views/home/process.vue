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
import { process, get_process as get } from "@/api/home";
export default {
  data() {
    return {
      list: {},
      pagination: {},
      router: "/home/process/show"
    };
  },
  methods: {
    async _process(curr, size) {
      let res = await process({
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
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._process(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 3;
      this._process(curr, size);
    }
  },
  mounted() {
    this._process(0, 3);
  },
  components: {
    list
  }
};
</script>

<style lang="less">
</style>