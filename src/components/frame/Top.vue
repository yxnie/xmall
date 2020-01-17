<template>
  <div>
    <div class="head">
      <div class="wrap con">
        <div class="log" @click="goHome"></div>
        <div class="flex">
          <div>
            <Input search placeholder="请输入商品信息" class="input" />
          </div>
          <div class="word">全部商品</div>
          <div class="word">捐赠</div>
          <div :class="{down:scrollLock && mineLock,after:!scrollLock}">
            <div class="person" @click="goLogin"><person class="more" v-if="user"></person></div>
            <div class="cartAll" @click="gocart">
              <div class="tag" :class="{zero:totalCount===0}" id="buycar">{{totalCount}}</div>
              <div class="cart"></div>
              <cart :list="goodsList" v-if="goodsList" class="more"></cart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot" :class="{fixed:scrollLock}" v-if="mineLock">
      <div class="flex wrap">
        <div v-for="(item,index) in list" :key="index" class="one">
          <div class="dot"></div>
          <div
            class="name handBlue"
            :class="{first:index===0,bold:nowPath===index}"
            @click="goPath(item.path)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="bar" :class="{appear:scrollLock}" v-if="mineLock"></div>
  </div>
</template>

<script>
import cart from "./Cart";
import person from "./Person";
export default {
  data() {
    return {
      list: [
        { name: "首页", path: "/" },
        { name: "全部", path: "/allGoods" },
        { name: "品牌周边", path: "/rim" },
        { name: "捐赠名单", path: "/donate" },
        { name: "后台管理系统", path: "/backstage" },
        { name: "首XPay支付系统页", path: "/XPay" },
        { name: "XBoot开发平台", path: "/XBoot" },
        { name: "宣传视频", path: "/movie" },
        { name: "Github", path: "/github" },
        { name: "商用授权", path: "/impower" }
      ],
      scrollLock: false,
      nowPath: null,
      user:null,
    };
  },
  components: {
    cart,
    person
  },
  methods: {
    onScroll() {
      // 计算滚动的距离
      let scrolled =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrolled >= 100) {
        this.scrollLock = true;
      } else {
        this.scrollLock = false;
      }
    },
    goHome(){
      this.$router.push("/")
    },
    goPath(path) {
      this.list.map((item, index) => {
        if (item.path === path) {
          this.nowPath = index;
        }
      });
      this.$router.push(path);
    },
    getData() {
      this.$api
        .getCarts()
        .then(res => {
          console.log(res);
          if (res) {
            this.$store.state.goodsList=res.data;
          } else {
            this.goodsList = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goLogin(){
      if(localStorage.getItem("adminToken")){
        // this.$router.push("/mine/order")
        this.$router.push("/order")
      }else{
        this.$router.push("/login")
      }
    },
    gocart(){
      this.$router.push("/cart")
    }
  },
  mounted() {
    this.getData();
    window.addEventListener("scroll", this.onScroll);
    let arr = window.location.href.split("/");
    if(localStorage.getItem("user")){
      this.user=localStorage.getItem("user")
    }
    this.list.map((item, index) => {
      if (item.path.slice(1) === arr[arr.length - 1]) {
        this.nowPath = index;
      }
    });
  },
  watch: {},
  computed: {
    totalCount() {
      let count = 0;
      if (this.goodsList) {
        this.goodsList.map(item => {
          count = count + item.count;
        });
      }
      return count;
    },
    mineLock(){
      return this.$store.state.mineLock
    },
    goodsList(){
      return this.$store.state.goodsList
    }
  }
};
</script>

<style scoped lang='scss'>
.head {
  height: 100px;
  background: #033030;
  .word {
    padding: 0 25px;
    width: 110px;
    color: #c8c8c8;
    line-height: 32px;
  }
  .con {
    align-items: center;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .log {
    background: url("../../assets/images/log.png") no-repeat 50%;
    background-size: cover;
    display: block;
    width: 50px;
    height: 40px;
    text-indent: -9999px;
    background-position: 0 0;
  }
  .person {
    width: 20px;
    height: 20px;
    background: url("../../assets/images/icon.png") -155px 0;
    background-size: 240px 107px;
    margin-left: 49px;
    margin-right: 8px;
    position: relative;
    cursor: pointer;
    .more {
      display: none;
    }
    &:hover .more {
      display: block;
    }
  }
  .cartAll {
    margin-left: 21px;
    width: 61px;
    z-index: 99;
    position: relative;
    cursor: pointer;
    .more {
      display: none;
    }
    &:hover .more {
      display: block;
    }
    .cart {
      background: url("../../assets/images/icon.png") 0 -22px;
      background-size: 240px 107px;
      background-position: -150px -22px;
      width: 30px;
      height: 20px;
    }
    .tag {
      background: #eb746b;
      background-image: linear-gradient(#eb746b, #e25147);
      box-shadow: inset 0 0 1px hsla(0, 0%, 100%, 0.15),
        0 1px 2px hsla(0, 0%, 100%, 0.15);
      text-align: center;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      color: #fff;
      font-size: 12px;
      position: absolute;
      left: 30px;
    }
    .zero {
      background: #969696;
      background-image: linear-gradient(#a4a4a4, #909090);
      box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
    }
  }
  .after {
    margin-top: 6px;
    display: flex;
    .person:hover {
      background-position: -5px 0 !important;
    }
    .cartAll:hover {
      .cart {
        background-position: 0 -22px !important;
      }
    }
  }
  .input {
    width: 305px;
  }
  .down {
    position: fixed;
    left: 50%;
    margin-left: 451px;
    margin-top: 0;
    z-index: 99;
    top: -40px;
    transform: translate3d(0, 59px, 0);
    transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    .person:hover {
      background-position: -215px 0 !important;
    }
    .cartAll:hover {
      .cart {
        background-position: -210px -22px !important;
      }
    }
  }
}
.foot {
  padding: 31px 0;
  height: 90px;
  background: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 20;
  .one {
    display: flex;
    line-height: 28px;
    .dot {
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background: #666;
      margin-top: 13px;
    }
    .name {
      padding: 0 10px;
    }
  }
  .first {
    padding: 0 20px !important;
  }
}
.handBlue:hover {
  color: #5683ea;
}
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  height: 60px;
  padding: 16px 0;
}
.bar {
  width: 100%;
  height: 60px;
  display: none;
}
.appear {
  display: block;
}


@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.moveToCart {
  animation: mymove 0.5s ease-in-out;
}
</style>