<template>
  <div>
    <div class="wrap">
      <div class="top">
        <div class="type" @click="editAll" :class="{blue:goods.sort===''}">综合排序</div>
        <div class="type" @click="editSort('1')" :class="{blue:goods.sort===1}">价格从低到高</div>
        <div class="type" @click="editSort('-1')" :class="{blue:goods.sort===-1}">价格从高到低</div>
        <div class="after">
          <input type="text" placeholder="价格" v-model="goods.priceGt" class="price" />
          <div class="center">-</div>
          <input type="text" placeholder="价格" v-model="goods.priceLte" class="price" />
          <div class="last" @click="getData">确定</div>
        </div>
      </div>
      <div class="listAllStart">
        <div v-for="(item,index) in list" :key="index" class="other">
          <div class="cover"></div>
          <div>
            <img :src="item.productImageBig" alt class="pic" />
          </div>
          <div class="productName">{{item.productName}}</div>
          <div class="subTitle overflow">{{item.subTitle}}</div>
          <div class="salePrice">
            <div class="hide">
              <div>
                <div class="look">查看详情</div>
                <div class="buy" @click="addToCart(item)">立即购买</div>
              </div>
            </div>
            <div class="price">￥{{item.salePrice}}</div>
          </div>
        </div>
      </div>
      <transition
        appear
        @after-appear="afterEnter"
        @before-appear="beforeEnter"
        v-for="(item,index) in showMoveDot"
        :key="index.id"
      >
        <div class="move_dot" ref="ball" v-if="item">
          <!-- 小球图片 -->
          <img :src="dropImage" alt />
        </div>
      </transition>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: {
        page: 1,
        size: 10,
        sort: "",
        priceGt: "",
        priceLte: ""
      },
      list: [],
      total: null,
      lock:true,//购买锁
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0, //当前点击购物车按钮在网页中的绝对left值
      dropImage: "" //商品缩略图
    };
  },
  created() {
    this.dropBalls = [];
  },
  components: {},
  methods: {
    getData() {
      this.$api
        .getAllGoods(this.goods)
        .then(res => {
          console.log(res);
          this.list = res.data;
          this.total = res.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editSort(val) {
      this.goods.page = 1;
      this.goods.sort = 1 * val;
      this.getData();
    },
    editAll() {
      this.goods.sort = "";
      this.getData();
    },
    editPage(val) {
      this.goods.page = val;
      this.getData();
    },
    editSize(val) {
      this.goods.page = 1;
      this.goods.size = val;
      this.getData();
    },

    // 添加到购物车
    addToCart(product) {
      this.lock=true
      this.$api
        .addCart(product.productId)
        .then(res => {
          console.log(res);
          let arr=this.$store.state.goodsList
          arr.map(item=>{
            if(item.productId===product.productId){
              item.count++
            }else {
              this.lock=false
            }
          })
          if(this.lock){
            arr.push(product)
          }
          this.$store.state.goodsList=arr
        })
        .catch(err => {
          console.log(err);
        });
      this.dropImage = product.productImageBig;
      // 增加到购物车
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      this.showMoveDot = [...this.showMoveDot, true];
    },
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft - 100}px,${this.elTop -
        100}px,0)`;
      // 设置透明度
      el.style.opacity = 0;
    },
    afterEnter(el) {
      // 获取底部购物车徽标的位置
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置位移
      el.style.transform = `translate3d(${badgePosition.left -
        200}px,${badgePosition.top - 30}px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.style.transition = "transform .88s linear";
      this.showMoveDot = this.showMoveDot.map(item => false);
      // 设置透明度
      el.style.opacity = 1;
      // 监听小球动画结束方法
      el.addEventListener("transitionend", () => {
        el.style.display = "none";
        this.listenInCart();
      });
      el.addEventListener("webkitAnimationEnd", () => {
        el.style.display = "none";
        this.listenInCart();
      });
    },
    listenInCart() {
      // 拿到购物车的DOM添加class
      document.getElementById("buycar").classList.add("moveToCart");
      setTimeout(() => {
        // 500毫秒后移除class
        document.getElementById("buycar").classList.remove("moveToCart");
      }, 500);
    }
  },
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  height: 60px;
  .type {
    line-height: 60px;
    padding: 0 15px;
    font-size: 12px;
    color: #999;
    &:hover {
      color: #5683ea;
    }
  }
  .blue {
    color: #5683ea;
  }
  .price {
    border: 1px solid #ccc;
    text-align: center;
    background: none;
    border-radius: 5px;
    width: 80px;
    height: 30px;
    outline: none;
  }
  .after {
    display: flex;
    padding: 0 15px;
    align-items: center;
    .center {
      margin: 0px 5px;
    }
    .last {
      margin-left: 10px;
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
      background-image: linear-gradient(180deg, #678ee7, #5078df);
      &:hover {
        background-color: #6c8cd4;
        background-image: linear-gradient(180deg, #6c8cd4, #4769c2);
      }
    }
  }
}
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
.other {
  width: 25%;
  height: 430px;
  border: 1px solid #efefef;
  background: white;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 0px 8px 8px #ccc;
    z-index: 1;
    .hide {
      display: flex !important;
    }
    .price {
      display: none;
    }
  }
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
.listAllStart {
  background: white;
}
.foot {
  margin-top: 50px;
  margin-bottom: 34px;
  display: flex;
  justify-content: flex-end;
}

.move_dot {
  position: fixed;
  z-index: 100;
  top: 1rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  img {
    animation: 0.88s mymove ease-in-out;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}

/* Firefox */
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}

/* Safari 和 Chrome */
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}

/* Opera */
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(0.2);
  }
}
</style>