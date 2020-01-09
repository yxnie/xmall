<template>
  <div>
    <div>
      <div class="name">{{data.name}}</div>
      <div class="listAllStart">
        <div
          v-for="(item,index) in data.panelContents"
          :key="index"
          :class="{first:index===0,other:index!==0}"
        >
          <div class="cover"></div>
          <div>
            <img :src="item.picUrl" alt class="pic" />
          </div>
          <div class="productName" v-if="index!==0">{{item.productName}}</div>
          <div class="subTitle overflow" v-if="index!==0">{{item.subTitle}}</div>
          <div class="salePrice" v-if="index!==0">
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
.cover {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  background: rgba($color: #000000, $alpha: 0.01);
  box-shadow: 0px 0px 30px 5px #eee inset;
  transition: all 0.5s;
}
.first {
  width: 50% !important;
  height: 430px;
  background: white;
  position: relative;
  &:hover {
    .cover {
      display: block !important;
    }
  }
}
.other {
  width: 25%;
  height: 430px;
  background: white;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 0px 8px 8px #ccc;
    z-index: 1;
    .hide{
      display: flex !important;
    }
    .price {
      display: none;
    }
  }
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
</style>