<template>
<div class = "mask" v-if = "showCart"></div>
  <div class="container">
    <div class="product" v-if = "showCart">
      <div class="product_header">
        <div class="product_header_all">
          <span
            class="product_header_icon iconfont"
            :class="IfAllCheck? 'item_checkedActive': 'item_checkedNoActive'"
            @click = "handleAllCheckClick">&#xe618;</span>
          <span class="product_header_text">All</span>
        </div>
        <div class="product_header_clear" @click="cleanCartProducts(shopId)">
          Clear Cart
        </div>
      </div>
      <template v-for="item in userAddCartList" :key="item.id">
        <div class="product_item" v-if="item.count > 0">
          <div
            :class="[
              'item_checked',
              'iconfont',
              item.check ? 'item_checkedActive' : 'item_checkedNoActive',
            ]"
            @click="handleCheckClick(item)"
          >
            &#xe618;
          </div>
          <img class="product_item_img" :src="item.imgUrl" />
          <div class="product_item_detail">
            <h4 class="item_title">{{ item.name }}</h4>
            <p class="item_price">
              <span class="item_currentValue">&dollar;{{ item.price }}</span>
              <span class="item_originalPrice"
                >&dollar;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="item_number">
            <span
              class="item_number_minus"
              @click="reduceItemToCart(shopId, item.id, item)"
              >-</span
            >
            {{ item.count || 0 }}
            <span
              class="item_number_plus"
              @click="addItemToCart(shopId, item.id, item)"
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check_icon">
        <img src="../../img/cart.png" class="check_icon_img" @click = "handleShowCartChange"/>
        <div class="check_icon_tag">{{ totalCount }}</div>
      </div>

      <div class="check_info">
        Total:<span class="check_info_price"
          >&nbsp; &dollar;&nbsp;{{ totalPrice }}</span
        >
      </div>
      <div class="check_button"><base-button>Check out</base-button></div>
    </div>
  </div>
  <base-toast v-if="toastData.show">{{ toastData.error }}</base-toast>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCartEffect } from './useCartEffect.js'
import { useToastEffect } from '../../components/UI/BaseToast.vue'
//Logic of getting cart info
const ChangeCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const allCheck = ref(true)

  //Get the cartList value from store
  const userAddCartList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

//if user add or remove, the icon number will change 
  const totalCount = computed(() => {
    const productList = cartList[shopId]
    let total = 0
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        total += product.count
      }
    }
    return total
  })

//Calculate total price
  const totalPrice = computed(() => {
    const productList = cartList[shopId]
    let price = 0
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        if (product.check) {
          price += product.price * product.count
        }
      }
    }
    return price.toFixed(2)
  })

 //User click item check button, The store will reverse the check value
  const handleCheckClick = (item) => {
    store.commit('handleCheckClick', { item })
  }

 //The Logic of all check button style.使用computed, 如果里面的productList, allCheck发生改变，这个方法就会执行，同样check style也会变化
  const IfAllCheck = computed(() => {
    const productList = cartList[shopId]
    allCheck.value = true //这里将他设置为true, 目的是当你把某个item前的对勾点掉后，由于是computed会重新执行这个方法，每当变化的时候，都会将allcheck值先为true，再去判断是否要将他置为false。好处是为了避免，你最后把下面的所有勾都打上了，他的全选图标会变
    for (let i in productList) {
      const product = productList[i]
      if (product.count > 0 && product.check == false) {
        allCheck.value = false
      }
    }
    return allCheck.value
  })

//The logic of user click all check button
  const handleAllCheckClick = ()=> {
    allCheck.value = !allCheck.value
    store.commit('handleAllCheckClick', { shopId,allCheck })
  }

// clean cart
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  return {
    totalCount,
    totalPrice,
    userAddCartList,
    IfAllCheck,
    cleanCartProducts,
    handleCheckClick,
    handleAllCheckClick
  }
}

export default {
  setup() {
    const route = useRoute()
    const shopId = route.params.shopId
    const showCart = ref(false)

    const handleShowCartChange = () => {
      showCart.value = !showCart.value
    }

    const {
      totalCount,
      totalPrice,
      userAddCartList,
      IfAllCheck,
      handleCheckClick,
      handleAllCheckClick,
      cleanCartProducts,
    } = ChangeCartEffect(shopId)
    const { toastData, showToast } = useToastEffect()
    const { addItemToCart, reduceItemToCart } = useCartEffect(showToast)
    return {
      totalCount,
      totalPrice,
      userAddCartList,
      shopId,
      toastData,
      IfAllCheck,
      showCart,
      addItemToCart,
      reduceItemToCart,
      handleAllCheckClick,
      handleCheckClick,
      cleanCartProducts,
      handleShowCartChange
    }
  },
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
.mask{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top:0;
  background-color:rgba(0, 0, 0, 0.75);
  z-index:1
}
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  background-color: #fff;
  z-index:2
}
.product {
  overflow-y: scroll;
  flex: 1;
}

.product_header {
  line-height: 0.52rem;
  border-bottom: 1px solid $content_bgColor;
  display: flex;
}
.product_header .product_header_all {
  width: 0.64rem;
  margin-left: 0.18rem;
}

.product_header .product_header_clear {
  flex: 1;
  text-align: right;
  font-size: 0.14rem;
  color: #333;
  margin-right: 0.16rem;
}

.product_header .product_header_icon {
  font-size: 0.16rem;
  display:inline-block;
  line-height:0.54rem;
  vertical-align: top;
}

.product_header .product_header_text {
  position: relative;
  left: 0.05rem;
}

.product_item {
  display: flex;
  padding: 0.12rem 0;
  margin: 0 0.16rem;
  border-bottom: 0.01rem solid $content_bgColor;
  position: relative;
}

.item_checked {
  color: $content_labelColor;
  line-height: 0.5rem;
  margin-right: 0.16rem;
}

.item_checkedNoActive {
  color: #e6e6e6;
}

.item_checkedActive {
  color: $content_labelColor;
}

.product_item .product_item_img {
  width: 0.46rem;
  height: 0.46rem;
  margin-right: 0.16rem;
}

.product_item_detail {
  overflow: hidden;
}

.product_item_detail .item_title {
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: $content_fontColor;
  margin: 0;
  @include ellipsis;
}

.product_item_detail .item_price {
  margin: 0.06rem 0 0 0;
  line-height: 0.2rem;
  margin: 0.06rem 0;
  font-size: 0.16rem;
  color: $hightLight-fontColor;
}

.item_price .item_centsValue {
  font-size: 0.12rem;
  transform: translateY(-8px);
  display: inline-block;
}

.item_price .item_originalPrice {
  font-size: 0.12rem;
  line-height: 0.2rem;
  color: $light-fontColor;
  text-decoration: line-through;
  margin-left: 0.06rem;
}

.product_item .item_number {
  position: absolute;
  right: 0rem;
  bottom: 0.12rem;
}

.product_item .item_number .item_number_minus,
.item_number_plus {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  display: inline-block;
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.18rem;
}

.product_item .item_number .item_number_minus {
  border: 0.01rem solid $medium-fontColor;
  color: $medium-fontColor;
  margin-right: 0.08rem;
}

.product_item .item_number .item_number_plus {
  background: $content_labelColor;
  color: $bgColor;
  margin-left: 0.08rem;
}
.check {
  margin: 0;
  position: relative;
  display: flex;
  box-sizing: border-box;
  height: 0.5rem;
  line-height: 0.48rem;
  background-color: #2e2e2c;
  border-top: 0.01rem solid $content_bgColor;
}

.check .check_icon {
  width: 0.84rem;
  position: relative;
}

.check .check_icon .check_icon_img {
  display: block;
  width: 0.28rem;
  height: 0.26rem;
  position: absolute;
  top: 0.1rem;
  left: 0.2rem;
}

.check .check_icon_tag {
  position: absolute;
  left: 0.5rem;
  padding: 0 0.04rem;
  min-width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  background-color: $hightLight-fontColor;
  border-radius: 0.1rem;
  text-align: center;
  color: $bgColor;
  font-size: 0.12rem;
  transform: scale(0.5);
  transform-origin: left center;
}

.check .check_info {
  flex: 1;
  color: $bgColor;
  font-size: 0.12rem;
}

.check .check_info .check_info_price {
  color: $hightLight-fontColor;
  font-size: 0.18rem;
}

.check .check_button {
  width: 0.98rem;
  position: relative;
  top: 0.05rem;
  left: 0.1rem;
  line-height: 0.4rem;
}
</style>