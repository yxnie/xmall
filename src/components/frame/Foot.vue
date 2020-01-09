<template>
  <div class="footAll">
    <div class="wrap">
      <div class="listAll">
        <div class="flex">
          <div v-for="(item,index) in list" :key="index" class="one">
            <div class="title">{{item.title}}</div>
            <div v-for="(item1,index1) in item.list" :key="index1" class="item1 hand">{{item1}}</div>
          </div>
        </div>
        <div class="right">
          <div class="tel hand">1012139570</div>
          <div class="time">周一至周日 10:00-23:00（限Starrer或捐赠人联系）</div>
          <div class="footRight hand">
            <div class="but" @click="help(false)">在线帮助</div>
          </div>
        </div>
      </div>
      <div class="foot">
        <div>
          <span
            class="Copyright"
          >Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved.本网站设计内容大部分属锤子科技</span>
          <span class="blue">法律声明</span>
          <span class="blue">隐私条款</span>
          <span class="blue">开发者中心</span>
        </div>
        <div class="word">
          <span class="content hand">蜀ICP备16030308号-1</span>
          <span class="content hand">蜀ICP证16030308号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "订单服务", list: ["购买指南", "支付方式", "送货政策"] },
        { title: "服务支持", list: ["官方开源", "项目前端", "项目后端"] },
        { title: "自助服务", list: ["个人博客", "个人简介", "个人视频"] },
        { title: "其他项目", list: ["XPay支付系统", "数据共享", "待开发..."] },
        { title: "友情链接", list: ["宇cccc", "Smartisan", "Vue"] },
        { title: "关注我吧", list: ["腾讯 QQ", "腾讯 QQ", "官方邮箱"] }
      ]
    };
  },
  components: {},
  methods: {
    help(nodesc) {
      this.$Notice.warning({
        title: "离线帮助",
        desc: nodesc
          ? ""
          : "没人会帮助你，请自己靠自己"
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.footAll {
  padding: 50px 0 20px;
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
  margin-top: 60px;
  .listAll {
    height: 100px;
    padding: 50px 0 130px;
    border-bottom: 1px solid #e6e6e6;
  }
}
.one {
  width: 149px;
  .title {
    color: #646464;
    font-size: 12px;
    padding-bottom: 14px;
  }
  .item1 {
    color: #969696;
    font-size: 12px;
    padding: 6px 0;
  }
}
.right {
  line-height: 34px;
  .tel {
    font-size: 30px;
    line-height: 1;
    color: #646464;
    text-align: right;
    position: relative;
    top: -2;
  }
  .time {
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }
  .footRight {
    text-align: right;
    width: 100%;
    height: 34px;
    position: relative;
  }
  .but {
    position: absolute;
    right: 0;
    width: 130px;
    height: 34px;
    font-size: 14px;
    color: #5079d9;
    border: 1px solid #dcdcdc;
    margin-top: 8px;
    text-align: center;
  }
}
.foot {
  padding-top: 40px;
  font-size: 12px;
  .Copyright {
    margin-right: 12px;
  }
  .blue {
    color: #5079d9;
    cursor: pointer;
    padding: 1px 10px 0;
    border-left: 1px solid #ccc;
  }
  .word {
    margin-top: 15px;
    .content {
      margin-right: 20px;
      color: #bdbdbd;
      font-size: 12px;
      height: 12px;
    }
  }
}
</style>