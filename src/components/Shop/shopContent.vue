<template>
  <div class="content">
    <div class="content_left">
      <div
        :class="{
          'content_left_item': true,
          'content_left_item--active': item.tab === currentTab,
        }"
        v-for="(item, index) in categories"
        :key="index"
        @click="handleLeftItemClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content_right">
      <div
        class="content_right_item"
        v-for="item in contentList"
        :key="item.id"
      >
        <img class="content_right_item_img" :src="item.imgUrl" />
        <div class="content_right_item_detail">
          <h4 class="item_title">{{ item.name }}</h4>
          <p class="item_price">
            <span class="item_currentValue">&dollar;{{ item.price }}</span>
            <span class="item_originalPrice">&dollar;{{ item.oldPrice }}</span>
          </p>
          <p class="item_cupPrice">&dollar;{{ item.sales }}</p>
        </div>
        <div class="item_number">
          <span class="item_number_minus" @click = "reduceItemToCart(shopId,item.id,item)" >-</span>
          {{ cartList?.[shopId]?.[item.id]?.count || 0 }}
          <!-- {{item.count || 0}} -->
          <span class="item_number_plus" @click="addItemToCart(shopId, item.id, item)">+</span>
        </div>
      </div>
    </div>
    <base-toast v-if="toastData.show">{{ toastData.error }}</base-toast>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request.js'
import { useToastEffect } from '../../components/UI/BaseToast.vue'
import { useCartEffect } from  './useCartEffect.js'

//define the categories name
const categories = reactive([
  { name: 'All item', tab: 'all' },
  { name: 'Drinks', tab: 'Drinks' },
  { name: 'Fruit & veg', tab: 'Fruit' },
  { name: 'Meat, Seafood & Deli', tab: 'Meat' },
  { name: 'Health & Beauty', tab: 'Health' },
])

//change the tab value, when user click
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleLeftItemClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleLeftItemClick }
}

//get shopItem and show it
const useShopDetailEffect = (tab) => {
  const route = useRoute()
  const rightItem = reactive({ contentList: [] })

  //get item detail
  const getShopDetail = async () => {
    const response = await get(`/api/shop/${route.params.shopId}/items`, {
      tab: tab.value,
    })
    rightItem.contentList = response.data
  }
  const { contentList } = toRefs(rightItem)
  console.log(contentList)
  //using watchEffect to listen it, when the tab change, the methods will execute it
  watchEffect(() => {
    getShopDetail()
  })
  return { contentList }
}

export default {
  setup() {
    const route = useRoute()
    const shopId = route.params.shopId
    const { toastData, showToast } = useToastEffect()
    const { currentTab, handleLeftItemClick } = useTabEffect()
    const { contentList } = useShopDetailEffect(currentTab)
    const { cartList, addItemToCart, reduceItemToCart } = useCartEffect(showToast)
    return {
      categories,
      contentList,
      handleLeftItemClick,
      currentTab,
      cartList,
      shopId,
      addItemToCart,
      reduceItemToCart,
      toastData,
      showToast
    }
  },
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.9rem;
  bottom: 0.5rem;
}
.content_left {
  width: 0.8rem;
  height: 100%;
  background-color: $search-bgColor;
  overflow-y: scroll;
}

.content_left_item {
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.14rem;
  color: $content_fontColor;
  @include ellipsis;
}

.content_left_item--active {
  background: $bgColor;
}

.content_right {
  overflow-y: scroll;
  flex: 1;
}

.content_right_item {
  display: flex;
  padding: 0.12rem 0;
  margin: 0 0.16rem;
  border-bottom: 0.01rem solid $content_bgColor;
  position: relative;
}

.content_right_item .content_right_item_img {
  width: 0.68rem;
  height: 0.69rem;
  margin-right: 0.16rem;
}

.content_right_item_detail {
  overflow: hidden;
}

.content_right_item_detail .item_title {
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: $content_fontColor;
  margin: 0;
  @include ellipsis;
}

.content_right_item_detail .item_cupPrice {
  margin: 0.06rem 0;
  line-height: 0.2rem;
  font-size: 0.12rem;
  color: $content_fontColor;
}

.content_right_item_detail .item_price {
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

.content_right_item .item_number {
  position: absolute;
  right: 0rem;
  bottom: 0.12rem;
}

.content_right_item .item_number .item_number_minus,
.item_number_plus {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  display: inline-block;
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.18rem;
}

.content_right_item .item_number .item_number_minus {
  border: 0.01rem solid $medium-fontColor;
  color: $medium-fontColor;
  margin-right: 0.08rem;
}

.content_right_item .item_number .item_number_plus {
  background: $content_labelColor;
  color: $bgColor;
  margin-left: 0.08rem;
}
</style>