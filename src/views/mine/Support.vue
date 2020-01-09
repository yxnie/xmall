<template>
  <div>
    <div class="myOrder">
      <topTitle>售后服务</topTitle>
      <div class="con">
        <img src="../../assets/images/support.png" alt class="pic" />
        <div class="word">如有疑问请联系邮箱1012139570@qq.com</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.con {
  padding: 100px 0px;
  text-align: center;
  .pic {
    width: 200px;
    height: 200px;
    margin: 0 auto 10px;
  }
  .word {
    line-height: 2em;
    font-size: 22px;
    color: #999;
  }
}
</style>