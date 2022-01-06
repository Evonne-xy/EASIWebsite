import { useStore } from 'vuex'
export const useCartEffect = (showToast) => {
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

  return { cartList, addItemToCart, reduceItemToCart }
}
