<template>
  <div class="leftBar">
    <div class="all">
      <div class="top">
        <div class="pic">
          <img src alt />
        </div>
        <div class="username">{{user.username}}</div>
      </div>
      <div class="list">
        <div v-for="(item,index) in list" :key="index" class="one">
          <div
            class="itemName"
            :class="{color:item.path===path}"
            @click="checkName(item)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      list: [
        { name: "我的订单", path: "order" },
        { name: "账户资料", path: "information" },
        { name: "收货地址", path: "addressList" },
        { name: "我的优惠", path: "coupon" },
        { name: "售后服务", path: "support" },
        { name: "以旧换新", path: "aihuishou" }
      ],
      path: null,
    };
  },
  components: {},
  methods: {
    checkName(val) {
      if(this.path !== val.path){
        this.path = val.path;
      this.$router.push(val.path)
      }
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.path=window.location.href.split("/").pop()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.leftBar {
  width: 210px;
  border-radius: 6px;
  .all {
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
}
.top {
  .pic {
    width: 168px;
    height: 168px;
    border: 1px solid #c0c0c0;
    margin: 0 auto;
  }
  .username {
    font-size: 18px;
    line-height: 48px;
    font-weight: 700;
  }
}
.list {
  padding-top: 15px;
  .one {
    position: relative;
    height: 48px;
    border-top: 1px solid #ebebeb;
    line-height: 48px;
    .itemName {
      position: relative;
      z-index: 1;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      transition: all 0.15s ease-out;
      color: #5079d9;
      &:hover {
        color: #fff;
        background-color: #98afee;
      }
    }
    .color {
      color: #fff;
      background-color: #98afee;
    }
  }
}
</style>