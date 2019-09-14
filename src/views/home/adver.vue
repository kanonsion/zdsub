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
import { adver, get_adver as get } from "@/api/home";
export default {
  data() {
    return {
      list: {},
      router:"/home/adver/show"
    };
  },
  methods: {
    async _adver(curr, size) {
      let res = await adver({
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
      let { size, curr } = this.pagination;
      size = val;
      this._adver(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 3;
      this._adver(curr, size);
    }
  },
  mounted() {
    this._adver(0, 3);
  },
  components: {
    list
  }
};
</script>

<style lang="less">
</style>