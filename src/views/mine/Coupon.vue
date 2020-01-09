<template>
 <div>
   <div class="myOrder">
      <topTitle>我的优惠</topTitle>
      <div class="con">
        <img src="../../assets/images/no-search.png" alt="" class="pic">
        <div class="word">您目前还没有优惠券</div>
      </div>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.con {
      padding: 100px 0px;
    text-align: center;
    .pic {
      width: 320px;
      height: 200px;
      margin: 0 auto 10px;
    }
    .word {
          line-height: 2em;
    font-size: 22px;
    color: #999;
    }
}
</style>