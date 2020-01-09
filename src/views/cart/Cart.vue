<template>
  <div class="wrap">
    <div class="cart">
      <topTitle>账户资料</topTitle>
      <div>
        <div>商品信息</div>
        <div>
          <div>单价</div>
          <div>数量</div>
          <div>小计</div>
          <div>操作</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.state.mineLock = false;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.mineLock = true;
    next();
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.cart {
  padding-top: 40px;
}
</style>