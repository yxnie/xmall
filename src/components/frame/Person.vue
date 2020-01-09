<template>
  <div class="allCart">
    <div class="all">
      <div class="up"></div>
      <div class="list">
        <div class="pic">
          <img src alt />
        </div>
        <div class="name">{{user.username}}</div>
        <div
          v-for="(item,index) in list"
          :key="index"
          @click.stop="checkName(item)"
          class="one"
        >{{item.name}}</div>
        <div class="one">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      list: [
        { name: "我的订单", path: "order" },
        { name: "账户资料", path: "information" },
        { name: "收货地址", path: "addressList" },
        { name: "售后服务", path: "support" },
        { name: "我的优惠", path: "coupon" }
      ]
    };
  },
  components: {},
  methods: {
    checkName(val) {
      this.$router.push(val.path);
    }
  },
  mounted() {
    this.user = localStorage.getItem("user");
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.allCart {
  position: absolute;
  top: 18px;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s ease-out;
  right: 0;
  width: 168px;
  z-index: 30;
  padding-top: 18px;
  transform: translate(-50%);
  left: 50%;
  .all {
    width: 100%;
    position: relative;
    background: #fff;
    border: 1px solid #d6d6d6;
    border-color: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }
  .up {
    position: absolute;
    left: 50%;
    background: url("../../assets/images/icon.png") no-repeat -49px -43px;
    background-size: 240px 107px;
    width: 20px;
    height: 8px;
    top: -8px;
    right: 35px;
    margin-left: -10px;
  }
}
.list {
  .one {
    color: #616161;
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-align: center;
    position: relative;
    border-top: 1px solid #f5f5f5;
    line-height: 44px;
    height: 44px;
    font-size: 12px;
  }
  .pic {
    margin: 20px auto 8px;
    width: 46px;
    height: 46px;
    text-align: center;
    border-radius: 50%;
    border:1px solid rgba(200, 200, 200, 0.6);
  }
  .name {
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
    color: #757575;
  }
}
</style>