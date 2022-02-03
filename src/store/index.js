import { createStore } from 'vuex'
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

// const findListItem = (cartListItem,item) => {
//   for(const key in cartListItem.productList) {
//     if(cartListItem.productList[key].id === item.id){
//       cartListItem.productList[key].count += 1
//       cartListItem.productList[key].check = true
//       return true
//     }else{
//        return false
//     }
//   }
// }
export default createStore({
  state: {
    cartList: getLocalCartList(),
    //   cartList{
    //        shopId: {
    //                     shopName:''
    //                     productList:{
    //                         itemId:{
    //                                       ...detail
    //                                       count:
    //                                 }
    //                     }
    //                 }
    //   }
  },
  mutations: {
   
    addItemToCart(state, payload) {
      const { shopId, item, itemId } = payload
      //查找shopId对应的cartListItem,如果state里有，就赋值，如果没有就创建一个空对象
      let cartListItem = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      }

      // console.log(cartListItem.productList)
    
      // if(!findListItem(cartListItem,item)){
      //   const length = Object.keys(cartListItem.productList).length
      //   cartListItem.productList[length] = item
      //   cartListItem.productList[length].count = 1
      //   cartListItem.productList[length].check = true
      // }
      


      //查找是否有itemId对应的item，如果有，就直接count加1，如果没有，就将item赋值过去，并且将count = 0
      let itemObject = cartListItem.productList[itemId]
      if (!itemObject) {
        itemObject = item
        itemObject.count = 0
      }
      itemObject.count += 1
      itemObject.check = true

      //将赋值好的itemObject添加到cartList[]里, 将更新的cartListItem赋值给state.cartList
      cartListItem.productList[itemId] = itemObject
      state.cartList[shopId] = cartListItem
      setLocalCartList(state)
    },
    reduceItemToCart(state, payload) {
      // console.log(cartListItem.productList)
      const { shopId, itemId } = payload
      // let cartListItem = state.cartList[shopId].productList
      
      // for(const key in cartListItem) {
      //   if(cartListItem[key].id === itemId && cartListItem[key].count > 0) {
      //     cartListItem[key].count -= 1
      //   }
      // }

      if (state.cartList[shopId].productList[itemId].count > 0) {
        state.cartList[shopId].productList[itemId].count -= 1
      }
      setLocalCartList(state)
    },
    handleCheckClick(state, payload) {
      const { item } = payload
      item.check = !item.check
    },
    handleAllCheckClick(state, payload) {
      const { shopId, allCheck } = payload
      for (let i in state.cartList[shopId].productList) {
        if (allCheck.value == true) {
          state.cartList[shopId].productList[i].check = true
        } else {
          state.cartList[shopId].productList[i].check = false
        }
      }
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const cartListItem = state.cartList[shopId] || {
        shopName: '',
        productList: {},
      }
      cartListItem.shopName = shopName
      state.cartList[shopId] = cartListItem
      setLocalCartList(state)
    },
  },
  actions: {},
  modules: {},
})
