<template>
  <div>
    <div class="all">
      <div v-for="(item,index) in data.panelContents" :key="index" class="one hand">
        <img :src="item.picUrl" alt class="pic" />
        <div :class="{cover:!(data.id===9 && (index===0 || index===3))}"></div>
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
.all {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
}
.one {
  position: relative;
  &:hover {
    // box-shadow: inset 0 10px 20px 10px #000;
    .cover {
      display: block;
    }
  }
}
.pic {
  width: 304px;
  height: 200px;
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
  transition: all .5s;
}
</style>