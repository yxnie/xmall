<template>
  <div>
    <div class="form">
      <div class="title">
        <div class="wrod">使用 XMall 账号 登录官网</div>
      </div>
      <div class="content">
        <div class="name">
          <input v-model="user.username" placeholder="账号" class="nameInput" />
        </div>
        <div class="name">
          <input v-model="user.password" placeholder="密码" type="password" class="nameInput" />
        </div>
        <div class="marginBotttom">
          <div id="vaptchaContainer" style="width: 100%;height: 36px;">
            <!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
            <div class="vaptcha-init-main">
              <div class="loading" style="display:flex;">
                <div class="pic">
                  <img src="https://r.vaptcha.com/public/img/vaptcha-loading.gif" />
                </div>
                <div class="vaptcha-text" style="line-height:36px; flex:1;">输入后加载验证码</div>
              </div>
            </div>
          </div>
        </div>
        <div class="admonish marginBotttom">
          <div>
            <Checkbox v-model="remember" class="password" @click="agree">记住密码</Checkbox>
          </div>
          <div class="flex">
            <div class="before" @click="register">注册 XMall 账号</div>
            <div class="after">忘记密码 ?</div>
          </div>
        </div>
        <div class="button register" :class="{notAllow:!notAllow}" @click="login">登录</div>
        <div class="button back" @click="back">返回</div>
        <div class="foot">
          <div>其它账号登录：</div>
          <div class="img">
            <img src="../../assets/images/qq.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rePassword: "",
      remember: false,
      vaptchaObj: null,
      vaptchaLock: false
    };
  },
  updated() {
    let that = this;
    if (!this.vaptchaLock) {
      vaptcha({
        vid: "5e12867a4c6b8b41680b90c2", // 验证单元id
        type: "click", // 显示类型 点击式
        container: "#vaptchaContainer", // 容器，可为Element 或者 selector
        offline_server: "http://localhost:8080/" //离线模式服务端地址
        //可选参数
        //style: 'dark' //按钮样式 默认dark，可选值 dark,light
        //color: '#57ABFF' //按钮颜色 默认值#57ABFF
      }).then(function(vaptchaObj) {
        that.vaptchaObj = vaptchaObj; //将VAPTCHA验证实例保存到局部变量中
        that.vaptchaObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
        //获取token的方式二：
        that.vaptchaObj.listen("pass", function() {
          // 验证成功进行后续操作
          // that.vaptchaObj.reset(); //重置验证码
          that.vaptchaLock = true;
        });
        //关闭验证弹窗时触发
        that.vaptchaObj.listen("close", function() {
          //验证弹窗关闭触发
        });
      });
    }
  },
  components: {},
  methods: {
    register() {
      this.$router.push("register");
    },
    agree() {
      this.remember = !this.remember;
    },
    login() {
      if (this.notAllow) {
        this.$api
          .login(this.user)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$Message.success({
                background: true,
                content: res.msg
              });
              localStorage.setItem("user", JSON.stringify(res.data.user));
              localStorage.setItem("adminToken", res.data.token);
              this.$store.state.user = res.data.user;
              if (this.remember) {
                localStorage.setItem(
                  "rememberPassword",
                  JSON.stringify(this.user)
                );
              }
              this.$router.push("/");
            } else if (res.code === 500) {
              this.$Message.warning({
                background: true,
                content: res.msg
              });
              this.vaptchaObj = null;
              this.vaptchaLock = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    back() {
      this.$router.back();
    }
  },
  mounted() {
    if (localStorage.getItem("rememberPassword")) {
      this.user = JSON.parse(localStorage.getItem("rememberPassword"));
    }
  },
  watch: {},
  computed: {
    notAllow() {
      if (
        this.user.username !== "" &&
        this.user.password !== "" &&
        this.vaptchaLock
      ) {
        console.log(1);
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.form {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  margin-top: -312px;
  background: url("../../assets/images/bg.png") #fff bottom repeat-x;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url("../../assets/images/loginLog.png");
    background-size: 140px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 167px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    .wrod {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
      font-size: 20px;
    }
  }
}
.marginBotttom {
  margin-bottom: 15px;
}
.content {
  padding: 0 40px 22px;
  .nameInput {
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 6px;
    // color: #ccc;
    outline: none;
  }
  .name {
    margin-bottom: 15px;
  }
}
.admonish {
  display: flex;
  justify-content: space-between;
  .password {
    font-size: 14px;
  }
  .before {
    padding: 1px 10px 0;
    border-right: 1px solid #ccc;
    color: #5079d9;
    cursor: pointer;
  }
  .after {
    padding: 1px 0px 0px 10px;
    color: #5079d9;
    cursor: pointer;
  }
}
.button {
  height: 48px;
  font-size: 18px;
  line-height: 48px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  color: #646464;
  text-align: center;
}
.register {
  margin-top: 25px;
  margin-bottom: 10px;
  background-color: #a9a9a9;
}
.back {
  margin-bottom: 25px;
}
.foot {
  border-top: 1px solid #ccc;
  display: flex;
  padding-top: 20px;
  font-size: 12px;
  cursor: default;
  color: #999;
  line-height: 20px;
  .img {
    height: 15px;
    width: 72px;
    margin-top: 4px;
  }
}
</style>