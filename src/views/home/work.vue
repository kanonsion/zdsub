<template>
  <div>
    <list
      :list="list"
      :pagination="pagination"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
import list from "./../../components/homelist";
import { work, get_work as get } from "@/api/home";
export default {
  data() {
    return {
      list: {},
      pagination: {}
    };
  },
  methods: {
    async _work(curr, size) {
      let res = await work({
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
      this._work(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 3;
      this._work(curr, size);
    }
  },
  mounted() {
    this._work(0, 3);
  },
  components: {
    list
  }
};
</script>

<style lang="less">
</style>