<template>
  <div class="wrapper">
    <div class="title">Order List</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in orderList" :key="index">
        <div class="order_title">
          {{ item.shopName }}
          <span class="order_status">{{
            item.isCanceled ? 'Canceled' : 'Finished'
          }}</span>
        </div>

        <div class="order_content">
          <div class="order_content_imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                class="order_content_img"
                v-if="innerIndex <= 3"
                :src="innerItem.product.imgUrl"
              />
            </template>
          </div>
          <div class="order_content_info">
            <div class="content_info_price">$ {{item.totalPrice}}</div>
            <div class="content_info_count">{{item.totalCount}} items</div>
          </div>
        </div>
      </div>
    </div>
    <docker-part :currentIndex="2"></docker-part>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request.js'
// Logic of processing orderList
const useOrderListEffect = () => {
  const data = reactive({ orderList: [] })
  const getOrderList = async () => {
    const result = await get('/api/getOrder')
    if (result?.errno === 0 && result?.data?.length) {
        const order = result.data;
        console.log(order)
        order.forEach((item) => {
            const products = item.products || []
            let totalPrice = 0
            let totalCount = 0
            products.forEach((productItem) =>{
                totalPrice += (productItem?.product?.price * productItem?.orderSales) || 0
                totalCount += (productItem?.orderSales) || 0
            })
            item.totalPrice = totalPrice
            item.totalCount = totalCount
        });
      data.orderList = result.data
    }
  }
  getOrderList()
  const { orderList } = toRefs(data)
  return { orderList }
}
export default {
  name: 'OrderList',
  setup() {
    const { orderList } = useOrderListEffect()
    return { orderList }
  },
}
</script>


<style lang = "scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
.wrapper {
  @include wrapper;
  background: $content_bgColor;
}
.title {
  @include title
}

.orders .order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: $bgColor;
}

.orders .order .order_title {
  line-height: 0.22rem;
  margin-bottom: 0.16rem;
  font-size: 0.16rem;
  color: $content_fontColor;
}

.orders .order .order_status {
  float: right;
  font-size: 0.14rem;
  color: $light-fontColor;
}

.orders .order .order_content {
  display: flex;
}

.order_content .order_content_imgs {
  flex: 1;
}

.order_content .order_content_imgs .order_content_img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.12rem;
}

.order_content_info {
  width: 0.7rem;
}

.order_content_info .content_info_price {
  text-align: right;
  margin-bottom: 0.04rem;
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: $hightLight-fontColor;
}

.order_content_info .content_info_count {
  text-align: right;
  margin-bottom: 0.04rem;
  line-height: 0.14rem;
  font-size: 0.12rem;
  color: $content_fontColor;
}
</style>