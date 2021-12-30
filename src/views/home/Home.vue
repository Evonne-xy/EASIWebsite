<template>
  <div>
    <div class="wrapper">
      <topPart></topPart>
      <nearby></nearby>
      <dockerPart></dockerPart>
    </div>
  </div>
</template>

<script>
import topPart from './TopPart.vue'
import nearby from './Nearby.vue'
import dockerPart from './DockerPart.vue'

export default {
  name:'home',
  components: {
    topPart,
    nearby,
    dockerPart
  }
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
.wrapper {
    left: 0;
    top: 0;
    width: 100%;
    position: absolute;
    border-top: 1px solid $content_bgColor;
    padding: 0 0.18rem;
    box-sizing: border-box;
    color: $content_fontColor;
    bottom: 0.5rem;
    overflow-y: auto;
}
</style>
