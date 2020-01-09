<template>
  <div>
    <div class="myOrder">
      <topTitle>账户资料</topTitle>
      <div class="con">
        <div class="pic">
          <img src alt />
        </div>
        <div class="right">
          <div class="edit">修改头像</div>
          <div class="updata">上传头像</div>
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
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.con {
  height: 124px;
  margin: 0 30px 30px;
  border-bottom: 1px solid #dadada;
  line-height: 30px;
  display: flex;
  align-items: center;
  .right {
    margin-left: 20px;
    .edit {
      font-size: 18px;
      font-weight: 400;
      color: #333;
      margin-left: 13px;
    }
    .updata {
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
      cursor: pointer;
      text-align: center;
      &:hover {
        background-color: #6c8cd4;
        background-image: linear-gradient(180deg, #6c8cd4, #4769c2);
      }
    }
  }
  .pic {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #c0c0c0;
  }
}
</style>