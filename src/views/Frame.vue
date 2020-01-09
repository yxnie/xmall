<template>
 <div>
   <top></top>
   <router-view></router-view>
   <foot></foot>
 </div>
</template>

<script> 
import top from "../components/frame/Top"
import foot from "../components/frame/Foot"
 export default {
   data () {
     return {

     }
   },
   components: {
     top,
     foot
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

</style>