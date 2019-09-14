<template>
  <div>
    <homelistshow :data="data" />
  </div>
</template>

<script>
import homelistshow from "@/components/homelistshow";
import { get_need as get } from "@/api/home";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    async _get(id) {
      let res = await get(id);
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