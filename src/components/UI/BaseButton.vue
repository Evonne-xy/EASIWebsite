<template>
    <button :class="mode">
      <slot></slot>
    </button>
</template>

<script>
export default {
  props: ['mode'],
}
</script>

<style lang= 'scss' scoped>
@import '../../style/variable.scss';
button {
  line-height: 0.48rem;
  background: $content_labelColor;
  box-shadow: 0 0.01rem 0.2rem 0 #ffd900c2;
  border-radius: 0.2rem;
  color: #333;
  text-align: center;
  font-size: 0.16rem;
  padding:0.01rem 0.1rem;
}
button:hover,
button:active {
  background-color: #eed919;
}

.flat {
  background-color: transparent;
  color: $content_labelColor;
  border: none;
}

.flat:hover,
.flat:active {
  text-decoration: underline;
}
</style>