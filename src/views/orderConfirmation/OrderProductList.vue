<template>
  <div class="products">
    <div class="products_title">{{ shopName }}</div>
    <div>
        <div class="product_item" v-for="item in userAddCartList" :key="item.id">
          <img class="product_item_img" :src="item.imgUrl" />
          <div class="product_item_detail">
            <h4 class="item_title">{{ item.name }}</h4>
            <div class="item_price">
              <span>
                <span class="item_currentValue">&dollar;</span>
                {{ item.price }} * {{ item.count }}
              </span>
              <span class="item_totalPrice">
                <span class="item_totalValue">&dollar;</span>
                {{ (item.price * item.count).toFixed(2) }}
              </span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCartEffect } from '../../effects/cartEffects.js'
import { useToastEffect } from '../../components/UI/BaseToast.vue'
export default {
  name: 'OrderProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.shopId

    const { showToast } = useToastEffect()
    const { userAddCartList, shopName, } = useCartEffect(
      showToast,
      shopId
    )
    return { shopName, userAddCartList }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/variable.scss';
.products {
  margin: 0.1rem 0.18rem 0.6rem 0.18rem;
  background: $bgColor;
  border-radius: 0.12rem;
}

.products .products_title {
  font-size: 0.16rem;
  color: $content_fontColor;
  padding: 0.16rem 0.16rem 0 0.16rem;
}

.product_item {
  display: flex;
  padding: 0.16rem 0.16rem 0 0.16rem;
  position: relative;
}

.product_item .product_item_img {
  width: 0.68rem;
  height: 0.69rem;
  margin-right: 0.16rem;
}

.product_item_detail {
  overflow: hidden;
  flex: 1;
}

.product_item_detail .item_title {
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: $content_fontColor;
  margin: 0;
  @include ellipsis;
}

.product_item_detail .item_price {
  line-height: 0.2rem;
  margin: 0.06rem 0 0 0;
  margin: 0.06rem 0;
  font-size: 0.16rem;
  color: $hightLight-fontColor;
  display: flex;
}

.product_item_detail .item_price .item_totalPrice {
  flex: 1;
  text-align: right;
  color: #000;
}
</style>
