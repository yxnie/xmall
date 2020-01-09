<template>
  <div>
    <div class="form">
      <div class="top">注册 XMall 账号</div>
      <div class="content">
        <div class="name">
          <input v-model="user.username" placeholder="账号" class="nameInput" />
        </div>
        <div class="name">
          <input v-model="user.password" placeholder="密码" type="password" class="nameInput" />
        </div>
        <div class="name">
          <input
            v-model="rePassword"
            placeholder="确认密码"
            type="password"
            class="nameInput"
            @blur="checkPassword"
          />
          <div :class="{passwordLock:passwordLock}" v-if="passwordLock">请两次密码保持一致</div>
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
            <Checkbox v-model="single" class="password" @change="agree">我已阅读并同意遵守</Checkbox>
          </div>
          <div class="before">法律声明</div>
          <div>和</div>
          <div class="after">隐私条款</div>
        </div>
        <div class="button register" :class="{notAllow:!notAllow}" @click="register">注册</div>
        <div class="foot">
          <div>如果您已拥有 XMall 账号，则可在此</div>
          <div class="login" @click="login">登录</div>
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
      single: false,
      vaptchaObj: null,
      vaptchaLock: false,
      passwordLock: false
    };
  },
  updated() {
    let that = this;
    if (!this.vaptchaLock && !this.vaptchaObj) {
      vaptcha({
        vid: "5e12867a4c6b8b41680b90c2", // 验证单元id
        type: "click", // 显示类型 点击式
        container: "#vaptchaContainer", // 容器，可为Element 或者 selector
        offline_server: "http://localhost:8080/" //离线模式服务端地址
        //可选参数
        //style: 'dark' //按钮样式 默认dark，可选值 dark,light
        //color: '#57ABFF' //按钮颜色 默认值#57ABFF
      })
        .then(function(vaptchaObj) {
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
        })
        .catch(err => {
          console.log(1);
        });
    }
  },
  components: {},
  methods: {
    login() {
      this.$router.push("login");
    },
    register() {
      if (this.notAllow) {
        if (this.single) {
          this.$api
            .register(this.user)
            .then(res => {
              // console.log(res);
              if (res.code === 200) {
                this.$Message.success({
                  background: true,
                  content: res.msg
                });
                localStorage.setItem("user", JSON.stringify(this.user));
                this.$store.state.user = this.user;
                this.$router.push("/login");
              } else if (res.code === 500) {
                this.vaptchaObj = null;
                this.vaptchaLock = false;
                this.$Message.warning({
                  background: true,
                  content: res.msg
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error({
            background: true,
            content: "您未勾选同意我们的相关注册协议!"
          });
          this.vaptchaLock = false;
          this.vaptchaObj = null;
        }
      }
    },
    agree() {
      this.single = !this.single;
    },
    checkPassword() {
      if (this.rePassword === this.user.password) {
        this.passwordLock = true;
      } else {
        this.passwordLock = false;
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {
    notAllow() {
      if (
        this.user.username !== "" &&
        this.user.password !== "" &&
        this.vaptchaLock &&
        this.passwordLock
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
}
.marginBotttom {
  margin-bottom: 15px;
}
.top {
  padding: 0;
  text-align: center;
  color: #666;
  border-bottom: 1px solid #dcdcdc;
  font-weight: 700;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
  margin-bottom: 40px;
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
    position: relative;
  }
}
.admonish {
  display: flex;
  color: #999;
  .password {
    font-size: 14px;
  }
  .before {
    color: #5079d9;
    cursor: pointer;
    margin-right: 5px;
  }
  .after {
    color: #5079d9;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 5px;
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
  margin-bottom: 25px;
  background-color: #a9a9a9;
}
.foot {
  border-top: 1px solid #ccc;
  display: flex;
  padding-top: 20px;
  font-size: 12px;
  cursor: default;
  color: rgb(153, 153, 153);
  line-height: 20px;
  justify-content: center;
  .login {
    color: #5079d9;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 5px;
  }
}
.passwordLock {
  position: absolute;
  color: red;
  font-size: 12px;
}
</style>