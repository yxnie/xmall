<template>
  <div class="all">
    <div class="wrap">
      <banner :data="data[0]" v-if="data[0]"></banner>
      <panel :data="data[1]" v-if="data[1]"></panel>
      <hot :data="data[2]" v-if="data[2]"></hot>
      <handpick :data="data[3]" v-if="data[3]"></handpick>
      <handpick :data="data[4]" v-if="data[4]"></handpick>
      <handpick :data="data[5]" v-if="data[5]"></handpick>
      <panel :data="data[6]" v-if="data[6]"></panel>
    </div>
  </div>
</template>

<script>
import banner from "../components/home/Banner";
import panel from "../components/home/Panel";
import hot from "../components/home/Hot";
import handpick from "../components/home/Handpick";
export default {
  data() {
    return {
      data:[]
    };
  },
  components: {
    banner,
    panel,
    hot,
    handpick
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .getHome()
        .then(res => {
          // console.log(res);
          this.data = res.data;
        })
        .catch(err => {});
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang='scss' scoped>
.all {
  margin-top: 30px;
}
</style>