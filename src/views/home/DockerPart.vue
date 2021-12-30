<template>
  <div class="docker">
    <div class="gap"></div>
    <div
      v-for="(item, index) in footerList"
      :key="item.icon"
      class="docker__item"
    >
      <div
        class="iconfont"
        :class="{ 'iconfont--active': index === 0 }"
        v-html="item.icon"
      ></div>
      <div class="docker_title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dockerPart',
  setup() {
    const footerList = [
      { icon: '&#xe68d;', text: 'Home' },
      { icon: '&#xe67c;', text: 'Cart' },
      { icon: '&#xe603;', text: 'Orders' },
      { icon: '&#xe655;', text: 'Account' },
    ]
    return { footerList }
  },
}
</script>

<style lang = 'scss' scoped>
@import '../../style/variable.scss';
/* docker css */
.docker {
  left: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  margin-top: 0.1rem;
  height: 0.49rem;
  border-top: 1px solid $content_bgColor;
  display: flex;
  padding: 0 0.18rem;
  box-sizing: border-box;
  color: $content_fontColor;
}
.docker__item {
  flex: 1;
  text-align: center;
  .iconfont {
    margin: 0.07rem 0.02rem;
    font-size: 0.18rem;
  }
}

.iconfont--active {
  color: $content_labelColor;
}

.docker_title {
  font-size: 20px;
  transform: scale(0.5, 0.5);
  transform-origin: center top;
  font-family: 'Actor', sans-serif;
  font-weight: 700;
}
</style>
