<template>
  <div>
    <div class="myOrder">
      <topTitle>我的订单</topTitle>
      <div class="none">你还未创建过订单</div>
    </div>
    <div class="foot">
      <Page
        :total="total"
        size="small"
        show-elevator
        show-sizer
        show-total
        @on-change="editPage"
        @on-page-size-change="editSize"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      goods: {
        page: 1,
        size: 10,
        sort: "",
        priceGt: "",
        priceLte: ""
      }
    };
  },
  components: {},
  methods: {
    editPage(val) {
      this.goods.page = val;
    },
    editSize(val) {
      this.goods.page = 1;
      this.goods.size = val;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.none {
  padding: 100px 0px;
  text-align: center;
}
.foot {
  display: flex;
  justify-content: flex-end;
}
</style>