<template>
  <div class="wrap">
    <div class="mine">
      <leftBar></leftBar>
      <div class="right"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
import leftBar from "../../components/mine/LeftBar";
export default {
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.state.mineLock = false;
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.mineLock = true;
    next()
  },
  components: {
    leftBar
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wrap {
  padding-top: 40px;
}
.mine {
  display: flex;
  justify-content: space-between;
  .right {
    margin-left: 20px;
    flex: 1;
  }
}
</style>