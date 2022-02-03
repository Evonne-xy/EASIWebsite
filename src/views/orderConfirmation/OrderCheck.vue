<template>
  <div class="order">
    <div class="order_price">
      Total Price: &dollar;<b> {{ calculations.totalPrice }}</b>
    </div>
    <div class="order_button">
      <base-button @click="$emit('displayDialog')" >Check out</base-button>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCartEffect } from '../../effects/cartEffects.js'
import { useToastEffect } from '../../components/UI/BaseToast.vue'

export default {
  name: 'OrderCheck',
  emits: ['displayDialog'],
  setup() {
    const route = useRoute()
    const shopId = route.params.shopId

    const { showToast } = useToastEffect()
    const { calculations } = useCartEffect(showToast, shopId)

    return { calculations, }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.order {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  box-sizing: border-box;
  height: 0.5rem;
  line-height: 0.48rem;
  background-color: #2e2e2c;
  border-top: 0.01rem solid $content_bgColor;
}

.order .order_price {
  flex: 1;
  color: $bgColor;
  text-indent: 0.24rem;
  font-size: 0.14rem;
}

.order .order_button {
  width: 0.98rem;
  position: relative;
  top: 0.05rem;
  left: 0.1rem;
  line-height: 0.4rem;
}
</style>
