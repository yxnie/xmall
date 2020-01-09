<template>
  <div class="allCart">
    <div class="all">
      <div class="up"></div>
      <div class="data" v-if="list.length>0">
        <div v-if="list" style="max-height: 600px;" :class="{over:list.length>5}">
          <div v-for="(item,index) in list" :key="index" class="one">
            <div class="con">
              <div class="pic">
                <img :src="item.productImageBig" alt />
              </div>
              <div class="center">
                <div>
                  <div class="productName">{{item.productName}}</div>
                  <div class="price">
                    <span class="priceIcon">￥</span>
                    <span class="priceNum">{{item.salePrice}}</span>
                    <span class="count">×{{item.count}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="del" @click.stop="delterGoods(item)">删除</div>
          </div>
        </div>
        <div class="bottom">
          <div class="before">
            <div class="count">
              共
              <b>{{totalCount}}</b> 件商品
            </div>
            <div class="price">
              合计：
              <span class="priceIcon">￥</span>
              <span class="priceNum">{{totalPrice}}</span>
            </div>
          </div>
          <div class="goCart">去购物车</div>
        </div>
      </div>
      <div class="none allCenter" v-else>
        <div>
          <div class="emptyPic">
            <img src="../../assets/images/cart-empty-new.png" class="pic" alt />
          </div>
          <div class="word">您的购物车竟然是空的!</div>
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
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    delterGoods(val) {
      this.$api
        .delCart(val._id)
        .then(res => {
          this.$Message.success({
            background: true,
            content: "删除成功"
          });
          let arr=this.$store.state.goodsList
          arr.map((item,index)=>{
            if(item.productId===val.productId){
              arr.splice(index,1)
            }
          })
          this.$store.state.goodsList=arr
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    totalCount() {
      let count = 0;
      this.list.map(item => {
        count = count + item.count;
      });
      return count;
    },
    totalPrice() {
      let count = 0;
      this.list.map(item => {
        count = count + item.count * item.salePrice;
      });
      return count;
    }
  }
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
  width: 360px;
  z-index: 30;
  padding-top: 18px;
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
    background: url("../../assets/images/icon.png") no-repeat -49px -43px;
    background-size: 240px 107px;
    width: 20px;
    height: 8px;
    top: -8px;
    right: 35px;
    margin-left: -10px;
  }
}
.none {
  height: 313px;
  .emptyPic {
    display: flex;
    justify-content: center;
    .pic {
      width: 76px;
      height: 62px;
    }
  }
  .word {
    margin-top: 10px;
    color: #333;
    font-size: 16px;
  }
}
.data {
  .one {
    padding: 20px;
    position: relative;
    .con {
      display: flex;
      align-items: center;
      .pic {
        width: 80px;
        height: 80px;
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
        position: relative;
      }
      .pic::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        border: 0 solid transparent;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
        border-radius: 3px;
      }
      .center {
        display: flex;
        align-items: center;
        .productName {
          color: #5079d9;
          cursor: pointer;
          transition: all 0.15s ease-out;
          width: 205px;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 10px;
        }
        .price {
          margin-left: 14px;
          .priceIcon {
            color: #d44d44;
            font-weight: 700;
            font-size: 12px;
            line-height: 14px;
          }
          .priceNum {
            color: #d44d44;
            font-weight: 700;
            margin-left: 5px;
            font-size: 14px;
          }
          .count {
            font-weight: 700;
            color: #cacaca;
            margin-left: 10px;
          }
        }
      }
    }
    .del {
      display: none;
      cursor: pointer;
      width: 20px;
      height: 20px;
      background: url("../../assets/images/icon.png") -50px -60px no-repeat;
      background-size: 240px 107px;
      text-indent: -9999em;
      overflow: hidden;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      .del {
        display: block;
      }
    }
  }
  .bottom {
    box-sizing: content-box;
    position: relative;
    padding: 20px;
    height: 40px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
    border-radius: 0 0 8px 8px;
    box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.5),
      0 -3px 8px rgba(0, 0, 0, 0.04);
    background: linear-gradient(#fafafa, #f5f5f5);
    display: flex;
    justify-content: space-between;
    .before {
      .count {
        margin-bottom: 4px;
        line-height: 16px;
        font-size: 12px;
        color: #c1c1c1;
      }
      .price {
        line-height: 20px;
        font-size: 14px;
        color: #6f6f6f;
        .priceIcon {
          color: #d44d44;
          font-weight: 700;
          font-size: 12px;
          line-height: 14px;
        }
        .priceNum {
          color: #d44d44;
          font-weight: 700;
          margin-left: 5px;
          font-size: 14px;
        }
      }
    }
    .goCart {
      width: 108px;
      height: 40px;
      margin: 0px;
      color: rgb(255, 255, 255);
      font-size: 14px;
      line-height: 38px;
      background-image: linear-gradient(180deg, #678ee7, #5078df);
      border: 1px solid #5c81e3;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
    }
  }
}
.over {
  overflow: scroll;overflow-x: hidden;
}
</style>