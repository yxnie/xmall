<template>
  <div @mouseenter="enterBox" @mouseleave="leaveBox" @mousemove="moveBox" class="banner"
          :style="{transform: 'rotateY('+rotateY+'deg) rotateX('+rotateX+'deg)'}">
    <Carousel
      v-model="value"
      :autoplay="autoplayLock"
      :autoplay-speed="time"
      dots="inside"
      :radius-dot="true"
      trigger="click"
      arrow="never"
      easing="ease"
      class="my__alter__css"
    >
      <CarouselItem v-for="(item,index) in data.panelContents" :key="index">
        <div
          class="demo-carousel"
        >
          <img :src="item.picUrl" alt class="pic" />
          <img :src="item.picUrl2" alt class="pic" />
          <img :src="item.picUrl3" alt class="pic" />
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      time: 2500,
      autoplayLock: true,
      rotateY: 0,
      rotateX: 0
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {
    enterBox() {
      // console.log(1);
      this.autoplayLock = false;
    },
    leaveBox() {
      this.autoplayLock = true;
    },
    moveBox(e) {
      // console.log(e.offsetX, e.offsetY);
      if (e.offsetY > 0) {
        if(e.offsetX < 610){
          this.rotateX = (e.offsetY - 250) /50;
        }else {
          this.rotateX = (e.offsetY - 250) /50;
        }
      }
      if (e.offsetX > 0) {
        if (e.offsetX < 610) {
          this.rotateY = (e.offsetX - 610) /50;
        } else {
          this.rotateY = (e.offsetX - 610) /50;
        }
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.banner {
  position: relative;
}
.demo-carousel {
  width: 100%;
  height: 500px;
  position: relative;
  .pic {
    position: absolute;
    border-radius: 10px;
  }
}
</style>