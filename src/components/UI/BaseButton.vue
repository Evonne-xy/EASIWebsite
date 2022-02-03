<template>
    <button :class="mode" :style = "widthStyle">
      <slot></slot>
    </button>
</template>

<script>
export default {
  props: ['mode','widthStyle'],
}
</script>

<style lang= 'scss' scoped>
@import '../../style/variable.scss';
button {
  line-height: 0.4rem;
  background: $content_labelColor;
  box-shadow: 0 0.01rem 0 0 #ffd900c2;
  border-radius: 0.14rem;
  color: #333;
  text-align: center;
  font-size: 0.16rem;
  padding:0  0.1rem;
  border:none;
}
button:hover,
button:active {
  background-color: $content_labelColor;
}

.flat {
  box-sizing: border-box;
  background-color: transparent;

}

</style>