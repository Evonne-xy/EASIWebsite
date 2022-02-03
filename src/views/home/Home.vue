<template>
  <div>
    <div class="wrapper">
      <topPart></topPart>
      <nearby></nearby>
      <docker-part :currentIndex = "0"></docker-part>
    </div>
  </div>
</template>

<script>
import topPart from './TopPart.vue'
import nearby from './Nearby.vue'

export default {
  name:'home',
  components: {
    topPart,
    nearby
  }
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
.wrapper {
    @include wrapper;
    overflow-y: auto;
    padding: 0 0.18rem;
}
</style>
