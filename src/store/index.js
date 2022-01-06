import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {},
    //shopId: {
    //   itemId:{
    // ...detail
    // count:
    //   }
    // }
  },
  mutations: {
    addItemToCart(state, payload) {
      const { shopId, itemId, item } = payload
      //查找shopId对应的cartListItem,如果state里有，就赋值，如果没有就创建一个空对象
      let cartListItem = state.cartList[shopId]
      if (!cartListItem) {
        cartListItem = {}
      }

      //查找是否有itemId对应的item，如果有，就直接count加1，如果没有，就将item赋值过去，并且将count = 0
      let itemObject = cartListItem[itemId]
      if (!itemObject) {
        itemObject = item
        itemObject.count = 0
      }
      itemObject.count += 1
      itemObject.check = true

      //将赋值好的itemObject添加到cartList[]里, 将更新的cartListItem赋值给state.cartList
      cartListItem[itemId] = itemObject
      state.cartList[shopId] = cartListItem
    },
    reduceItemToCart(state, payload) {
      const { shopId, itemId } = payload
      if (state.cartList[shopId][itemId].count > 0) {
        state.cartList[shopId][itemId].count -= 1
      }
    },
    handleCheckClick(state,payload) {
      const {item} = payload;
      item.check = !item.check;
    },
    handleAllCheckClick(state,payload) {
      const {shopId,allCheck} = payload;
      for(let i in state.cartList[shopId]){
          if(allCheck.value == true){
            state.cartList[shopId][i].check = true;
          }else{
            state.cartList[shopId][i].check = false
          }
      }
    },
    cleanCartProducts(state,payload) {
      const {shopId} = payload;
      state.cartList[shopId] = {}
    }
  },
  actions: {},
  modules: {},
})
