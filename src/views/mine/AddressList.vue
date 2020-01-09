<template>
  <div>
    <div class="myOrder">
      <topTitle>收货地址</topTitle>
      <div class="but" @click="addAdd">添加收货地址</div>
      <div class="con">
        <div class="title">
          <div class="name">姓名</div>
          <div class="name">详细地址</div>
          <div class="name tel">电话</div>
        </div>
        <div class="allAdd" v-if="addressList.length>0">
          <div class="one" v-for="(item,index) in addressList" :key="index">
            <div class="name">{{item.username}}</div>
            <div class="add">{{item.phone}}</div>
            <div class="tel">{{item.address}}</div>
            <div class="default">
              <div v-if="item.isDefault">( 默认地址 )</div>
              <div class="no" v-else @click="editDefault(item,index)">设为默认</div>
            </div>
            <div class="after">
              <div class="edit">
                <i class="iconfont icon-bianji" @click="editAdd(item)"></i>
              </div>
              <div class="del" @click="delterAdd">
                <i class="iconfont icon-shanchu" @click="delterAdd(item._id,index)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="none" v-else>
          <div class="word">你还未添加收货地址</div>
          <div class="but1">添加地址</div>
        </div>
      </div>
      <Modal v-model="lock" width="475">
        <p slot="header" style="color:#f60;text-align:center" class="modalTop">
          <span>新增收货地址</span>
        </p>
        <div style="text-align:center">
          <div class="input1">
            <input placeholder="收货人姓名" type="text" v-model="address.username" />
          </div>
          <div class="input">
            <input placeholder="手机号码" type="text" v-model="address.phone" />
          </div>
          <div class="input">
            <input placeholder="收货地址" type="text" v-model="address.address" />
          </div>
          <div class="foot">
            <Checkbox v-model="address.isDefault">设为默认</Checkbox>
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long @click="save" :disabled="allFill">保存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lock: false,
      address: {
        username: "",
        phone: "",
        address: "",
        isDefault: false
      },
      addressList: []
    };
  },
  components: {},
  methods: {
    addAdd() {
      this.lock = true;
    },
    save() {
      if(this.address._id){
        this.$api
        .editAddress(this.address)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$Message.success({
              background: true,
              content: res.msg
            });
            this.getAddressList();
            this.lock = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }else {
        this.$api
        .addAddress(this.address)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.$Message.success({
              background: true,
              content: res.msg
            });
            this.getAddressList();
            this.lock = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    getAddressList() {
      this.$api
        .getAddressList()
        .then(res => {
          // console.log(res);
          this.addressList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editDefault(val, index) {
      this.$api
        .setDefault(val._id)
        .then(res => {
          console.log(res);
          this.addressList.map(item => {
            item.isDefault = false;
          });
          val.isDefault = true;
          let a = this.addressList.splice(index, 1);
          this.addressList.unshift(a[0]);
          this.$Message.success({
            background: true,
            content: res.msg
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    delterAdd(id, index) {
      this.$api
        .delAddress(id)
        .then(res => {
          console.log(res);
          this.addressList.splice(index, 1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editAdd(val){
      this.lock = true;
      this.address=val
    }
  },
  mounted() {
    this.getAddressList();
  },
  watch: {},
  computed: {
    allFill() {
      if (this.address.username && this.address.phone && this.address.address) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
@import "//at.alicdn.com/t/font_1604068_0mwg99gx5k8j.css";
.myOrder {
  position: relative;
}
.but {
  position: absolute;
  right: 10px;
  top: 15px;
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
  cursor: pointer;
  text-align: center;
  z-index: 99;
}
.con {
  .title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding-left: 45px;
    padding-right: 20px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);
    color: #838383;
    display: flex;
    .name {
      flex: 1;
    }
    .tel {
      padding-left: 60px;
    }
  }
  .allAdd {
    .one {
      display: flex;
      align-items: center;
      height: 115px;
      text-align: center;
      .name {
        width: 106px;
      }
      .add {
        flex: 1;
      }
      .tel {
        width: 160px;
      }
      .default {
        width: 80px;
        .no {
          color: #5079d9;
          cursor: pointer;
        }
      }
      .after {
        display: flex;
        width: 135px;
        justify-content: center;
      }
      .edit {
        font-size: 12px;
        border-radius: 4px;
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
        cursor: pointer;
        width: 32px;
        height: 28px;
        text-align: center;
        .iconfont {
          font-size: 13px;
          line-height: 28px;
        }
      }
      .del {
        font-size: 12px;
        border-radius: 4px;
        color: #fff;
        background-color: #ff4949;
        border-color: #ff4949;
        cursor: pointer;
        width: 32px;
        height: 28px;
        margin-left: 18px;
        text-align: center;
        .iconfont {
          font-size: 13px;
          line-height: 28px;
        }
      }
    }
  }
}
input {
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0 3px 5px -4px rgba(0, 0, 0, 0.4),
    inset -1px 0 3px -2px rgba(0, 0, 0, 0.1);
  line-height: 46px;
  outline: none;
}
.modalTop {
  font-size: 18px;
  padding: 0 15px !important;
  height: 30px;
  line-height: 30px;
  width: 100%;
  span {
    color: #666;
  }
}
.input {
  margin-bottom: 15px;
}
.input1 {
  margin-bottom: 15px;
  margin-top: 10px;
}
.foot {
  text-align: left;
}
.none {
  padding: 80px 0px;
  text-align: center;
  .word {
    font-size: 20px;
  }
  .but1 {
    margin: 20px auto;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    font-size: 12px;
    color: #646464;
    background-color: #f9f9f9;
    background-image: linear-gradient(180deg, #fff, #f9f9f9);
    width: 100px;
    height: 30px;
    line-height: 28px;
    cursor: pointer;
    text-align: center;
  }
}
</style>