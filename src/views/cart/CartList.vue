<template>
  <div class="wrapper">
    <div class="title">Cart List</div>
    <div class="cartList">
      <div class="cartItem" v-for="(item, index) in cartContent" :key="index">
        <div class="cartItem_shopName">{{ item.shopName }}</div>
            <div class="cartItem_content" v-for="(innerItem, innerIndex) in item?.productList || []"
            :key="innerIndex">
              <img class="cartItem__img" :src="innerItem.imgUrl" />
              <div class="cartItem_detail">
                <!-- <h4 class="item_title">{{innerItem.name}}</h4> -->
                <h4 class="item_title">{{ innerItem.name }}</h4>
                <div class="item_price">
                  <span>
                    <span class="item_currentValue">&dollar;</span>
                    {{ innerItem.price }} * {{ innerItem.count }}
                  </span>
                  <span class="item_totalValue">
                    <span>&dollar;</span>
                    {{ (innerItem.price * innerItem.count).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
        <div class="cartItem_exceedItems" @click="showMore" v-if = "item.length > 3">
          <span class="exceedItems_content">Total Item is {{item.length}}</span>
          <span class="iconfont exceedItems_arrow" @click="handleBackClick"
          :class = "show ? 'exceedItems_arrow_show' : 'exceedItems_arrow_NotShow'"
            >&#xe662;</span
          >
        </div>
      </div>
    </div>
  </div>
  <docker-part :currentIndex="1"></docker-part>
</template>

<script>
import { ref, reactive,toRefs} from 'vue'
import { useCartEffect } from '../../effects/cartEffects.js'

//logic of control the productList item count is 3
const useNewCartListEffect = (newCartList) => {
  for (const keys in newCartList.cartContent) {
      if (newCartList.cartContent[keys].productList) {
        const cartListKey = Object.keys(newCartList.cartContent[keys].productList)
        let length = newCartList.cartContent[keys].length
        if (newCartList.cartContent[keys].length > 3) {
          for (let i = 0; i < newCartList.cartContent[keys].length - 3; i++) {
            const productListKey = cartListKey[length - 1]
            length = length - 1
            delete newCartList.cartContent[keys].productList[productListKey]
          }
        }
      }
    }
}

export default {
  name: 'CartList',
  setup() {
    const show = ref(false)
    const { cartList } = useCartEffect()

    //add a new property(length) in order to show the total count
    for(const keys in cartList){
      if(cartList[keys].productList){
        cartList[keys].length = Object.keys(cartList[keys].productList).length
      }
    }
    const newCartList = reactive({ cartContent: [] })
    newCartList.cartContent = JSON.parse(JSON.stringify(cartList));

    console.log(cartList)
    useNewCartListEffect(newCartList)

    // logic of show or not show, If show, deep copy value to cartContent, If not, call useNewCartListEffect function
    const showMore = () => {
      show.value = !show.value
      if (show.value === true) {
        newCartList.cartContent = JSON.parse(JSON.stringify(cartList));
      }else{
        useNewCartListEffect(newCartList)
      }
    }

    const { cartContent } = toRefs(newCartList)
    return { cartContent, showMore, show }
  },
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/variable.scss';

.wrapper {
  @include wrapper;
  background: $content_bgColor;
}

.title {
  @include title;
}

.cartList {
  overflow-y: scroll;
  left: 0;
  right: 0;
  top: 0.5rem;
  bottom: 0rem;
  width: 100%;
  position: absolute;
}

.cartList .cartItem {
  padding: 0.16rem;
  margin: 0.16rem 0.18rem;
  background-color: $bgColor;
}

.cartItem .cartItem_shopName {
  font-size: 0.16rem;
  color: $content_fontColor;
}

.cartItem .cartItem_content {
  display: flex;
  margin-top: 0.16rem;
}

.cartItem_content .cartItem__img {
  width: 0.46rem;
  height: 0.46rem;
  margin-right: 0.16rem;
}

.cartItem .cartItem_detail {
  flex: 1;
  overflow: hidden;
}

.cartItem_detail .item_title {
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: $content_fontColor;
  margin: 0;
  @include ellipsis;
}

.cartItem_detail .item_price {
  /* line-height: 0.2rem; */
  margin: 0.06rem 0;
  font-size: 0.16rem;
  color: $hightLight-fontColor;
  display: flex;
}

.item_price .item_totalValue {
  flex: 1;
  text-align: right;
  color: #000;
}

.cartItem .cartItem_exceedItems {
  text-align: center;
  background: #f5f5f5;
  margin-top: 0.16rem;
}

.exceedItems_content {
  line-height: 0.28rem;
  font-size: 0.14rem;
  color: #999999;
  display: inline-block;
}

.exceedItems_arrow {
  width: 0.3rem;
  line-height: 0.28rem;
  font-size: 0.3rem;
  color: #b6b6b6;
  
  position: absolute;
  display: inline-block;
}

.exceedItems_arrow_NotShow{
  transform: rotate(270deg);
}

.exceedItems_arrow_show {
  transform: rotate(90deg);
}
</style>