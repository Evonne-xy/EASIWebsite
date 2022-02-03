<template>
  <div class="wrapper">
    <div class="wrapper-top"></div>
    <div class="search">
      <div class="iconfont search_back" @click="handleBackClick">&#xe662;</div>
      <div class="search_content">
        <span class="iconfont search_content_icon">&#xe6e1;</span>
        <input
          class="search_content_input"
          placeholder="Please input item name"
        />
      </div>
    </div>
    <div class="infoCard">
      <shopInfo :shopItem="shopInfo.item" :hideBorder="true" v-show = "shopInfo.item.imgSrc"></shopInfo>
    </div>
      <shop-content :shopName = "shopInfo.item.title"></shop-content>
      <shop-cart></shop-cart>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive } from 'vue'
import shopInfo from '../../components/Shop/ShopInfo.vue'
import { get } from '../../utils/request.js'
import ShopContent from '../../components/Shop/shopContent.vue'
import ShopCart from '../../components/Shop/shopCart.vue'

//get the shopDetails
const useShopInfoEffect = () => {
  const shopInfo = reactive({ item: {} })
  const route = useRoute()
  const getShopInfo = async () => {
    // const response = await get(`/api/shop/${route.params.shopId}`)
    const response = await get(`/api/shopDetail/${route.params.shopId}`)
    if (response?.errno === 0 && response?.data) {
      shopInfo.item = response.data
    }
  }
  return { shopInfo, getShopInfo }
}

//click back button
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick 
}

export default {
  name: 'Shop',
  components: { shopInfo, ShopCart, ShopContent },
  setup() {
    const { shopInfo, getShopInfo } = useShopInfoEffect()
    getShopInfo()
    const handleBackClick = useBackRouterEffect()
    return { shopInfo, handleBackClick }
  },
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
.wrapper {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
}

.wrapper-top {
  opacity: 0.8;
  z-index: 1;
  background-image: linear-gradient(
    0deg,
    rgba(0, 145, 255, 0) 4%,
    $content_labelColor 50%
  );
  height: 25vh;
}

.search {
  display: flex;
  position: absolute;
  z-index: 999;
  top: 0.1rem;
  width: 96%;
  margin: 0.06rem auto;
}

.search .search_back {
  width: 0.3rem;
  line-height: 0.32rem;
  font-size: 0.3rem;
  color: #b6b6b6;
}

.search .search_content {
  display: flex;
  flex: 1;
  background: $search-bgColor;
  border-radius: 0.16rem;
}

.search .search_content .search_content_icon {
  width: 0.44rem;
  line-height: 0.32rem;
  text-align: center;
  color: $search-fontColor;
}

.search .search_content .search_content_input {
  height: 0.32rem;
  border: none;
  outline: none;
  background: none;
  width: 100%;
  display: block;
  padding-right: 0.2rem;
  color: $content_fontColor;
  font-size: 0.14rem;
}

.search .search_content .search_content_input ::placeholder {
  color: $content_fontColor;
  font-size: 0.14rem;
}

.infoCard {
  position: absolute;
  top: 0.7rem;
  border-radius: 0.12rem;
  box-shadow: 0.01rem 0.02rem 0.03rem 0.03rem rgba(189, 189, 189, 0.26);
  background-color: white;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.1rem;
}
</style>