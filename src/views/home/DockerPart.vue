<template>
  <div class="docker">
    <div
      v-for="(item, index) in footerList"
      :key="item.icon"
      class="docker__item"
    >
    <router-link :to='item.to'>
      <div
        class="iconfont"
        :class="{ 'iconfont--active': index === currentIndex }"
        v-html="item.icon"
      ></div>
      <div class="docker_title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dockerPart',
  props:['currentIndex'],
  setup() {
    const footerList = [
      { icon: '&#xe68d;', text: 'Home' , to: {name:'Home'}},
      { icon: '&#xe67c;', text: 'Cart' , to: {name:'CartList'}},
      { icon: '&#xe603;', text: 'Orders', to: {name:'OrderList'}},
      { icon: '&#xe655;', text: 'Account', to: {name:'Home'}},
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
  border-top: 0.01rem solid $content_bgColor;
  display: flex;
  padding: 0 0.18rem;
  box-sizing: border-box;
  color: $content_fontColor;
  background-color:$bgColor
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

a{ 
  color: $content_fontColor;
  text-decoration: none;
}

.docker_title {
  font-size: 0.2rem;
  transform: scale(0.5, 0.5);
  transform-origin: center top;
  font-family: 'Actor', sans-serif;
  font-weight: 700;
}
</style>
