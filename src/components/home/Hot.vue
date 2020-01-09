<template>
  <div>
    <div>
      <div class="name">{{data.name}}</div>
      <div class="listAll">
        <div
          v-for="(item,index) in data.panelContents"
          :key="index"
          class="listOne"
          :class="{shadowLeft:index===0,shadowRight:index===1}"
        >
          <div>
            <img :src="item.picUrl" alt class="pic hand" />
          </div>
          <div class="productName">{{item.productName}}</div>
          <div class="subTitle overflow">{{item.subTitle}}</div>
          <div class="salePrice">
            <div class="hide">
              <div>
                <div class="look">查看详情</div>
                <div class="buy">立即购买</div>
              </div>
            </div>
            <div class="price">￥{{item.salePrice}}</div>
          </div>
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
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.pic {
  margin: 50px auto 10px;
  width: 206px;
  height: 206px;
}
.listOne {
  background: white;
  height: 430px;
}
.name {
  padding-left: 30px;
  position: relative;
  z-index: 10;
  height: 60px;
  padding: 0 10px 0 24px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
  background: #f3f3f3;
  background: linear-gradient(#fbfbfb, #ececec);
  line-height: 60px;
  font-size: 18px;
  color: #333;
  margin-top: 30px;
}
.hide {
  display: none;
  position: absolute;
  z-index: 1;
  text-align: center;
  // display: flex;
  justify-content: center;
  width: 100%;
  .look {
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    font-size: 12px;
    color: #646464;
    background-color: #f9f9f9;
    background-image: linear-gradient(180deg, #fff, #f9f9f9);
    width: 100px;
    height: 30px;
    line-height: 28px;
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin: 0px 5px;
  }
  .buy {
    border: 1px solid #5c81e3;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background-color: #678ee7;
    background-image: linear-gradient(180deg, #678ee7, #5078df);
    width: 100px;
    height: 30px;
    line-height: 28px;
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin: 0px 5px;
  }
}
.shadowLeft {
  transition: all 0.5s;
  &:hover {
    box-shadow: 5px 5px 8px 8px #ccc;
    z-index: 1;
    .hide{
      display: flex !important;
    }
    .price {
      display: none;
    }
  }
}
.shadowRight {
  transition: all 0.5s;
  &:hover {
    box-shadow: -5px 5px 8px 8px #ccc;
    z-index: 1;
    .hide{
      display: flex !important;
    }
    .price {
      display: none;
    }
  }
}
</style>