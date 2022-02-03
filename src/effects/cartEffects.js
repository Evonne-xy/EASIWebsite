import { useStore } from 'vuex'
import { computed } from 'vue'
export const useCartEffect = (showToast,shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const addItemToCart = (shopId, itemId, item) => {
    store.commit('addItemToCart', { shopId, itemId, item })
  }

  const reduceItemToCart = (shopId, itemId, item) => {
    try {
      store.commit('reduceItemToCart', { shopId, itemId, item })
    } catch (e) {
      showToast('The number is 0, cannot reduce')
    }
  }
  //Get the cartList value from store
  const userAddCartList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProduct = {}
    for(let i in productList) {
      if(productList[i].count > 0){
        notEmptyProduct[i] = productList[i]
      }
    }
    return notEmptyProduct
  })

   //Get the shopName value from store
   const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || []
    return shopName
  })

   //Change icon number and calculate price
   const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    let totalCount = 0
    let totalPrice = 0
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        totalCount += product.count //if user add or remove, the icon number will change

        if (product.check) {
          totalPrice += product.price * product.count //Calculate total price
        }
      }
    }
    return { totalCount, totalPrice: totalPrice.toFixed(2) }
  })

  return { cartList, shopName, userAddCartList,calculations, addItemToCart, reduceItemToCart }
}
