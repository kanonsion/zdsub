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
import { policy, get_policy as get } from "@/api/home";
export default {
  data() {
    return {
      list: {},
    };
  },
  methods: {
    async _policy(curr, size) {
      let res = await policy({
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
      console.log(this.pagination)
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._policy(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 3;
      this._policy(curr, size);
    }
  },
  mounted() {
    this._policy(0, 3);
  },
  components: {
    list
  }
};
</script>

<style lang="less">
</style>