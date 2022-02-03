<template>
  <div class="wrapper">
    <top-area></top-area>
    <order-product-list></order-product-list>
    <order-check @displayDialog = "displayDialog"></order-check>
    <base-dialog title="Do you want to leave?" :show = showDialog>
      <template v-slot:default>
        <p>Please finish the payment, otherwise it will be canceled.</p>
      </template>
      <template v-slot:actions>
        <div class="cancelBtn">
          <base-button
            mode="flat"
            widthStyle="width:0.8rem"
            @click="handleOderCanclation(true)"
            >Cancel</base-button
          >
        </div>
        <div class="payBtn">
          <base-button widthStyle="width:0.8rem" @click="handleOrderConfirmation(false)"
            >Pay</base-button
          >
        </div>
      </template>
    </base-dialog>
       <base-toast v-if="toastData.show">{{ toastData.error }}</base-toast>
  </div>

</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from 'vuex'
import { useCartEffect } from '../../effects/cartEffects.js'
import { useToastEffect } from '../../components/UI/BaseToast.vue'
import TopArea from '../orderConfirmation/TopArea.vue'
import OrderProductList from '../orderConfirmation/OrderProductList.vue'
import OrderCheck from '../orderConfirmation/OrderCheck.vue'
import { post } from '../../utils/request'

//The logic of order confirmation
const useMakeOrderEffect = (shopId,shopName,showDialog,userAddCartList,showToast)=> {
  const router = useRouter()
  const store = useStore()


    const handleOrderConfirmation = async (isCanceled) => {
      //iterate user cart list
      const products = []
      for (let i in userAddCartList.value) {
        const product = userAddCartList.value[i]
        products.push({
          id: parseInt(product.id, 10),
          count: product.count,
        })
      }
      //post the cart List to the backend
      try {
        const result = await post('/api/order', {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled,
          products: {
            products,
          },
        })
        if (result?.errno === 0) {
          store.commit('cleanCartProducts',{shopId})
          router.push({ name: 'OrderList' })
        }else{
          showToast('Fail to Pay')
        }
      } catch (e) {
        showToast(e)
      }
    }
    return {handleOrderConfirmation}
}

//The logic of show dialog
const useShowDialogEffect =()=> {
   const router = useRouter()
   const showDialog = ref(false)
   const displayDialog = ()=> {
      showDialog.value = true
    }
   const handleOderCanclation = ()=> {
      router.push({name:'OrderConfirmation'})
      showDialog.value = false
    }
    return {displayDialog,showDialog,handleOderCanclation}
}

export default {
  components: { TopArea, OrderProductList, OrderCheck },
  name: 'OrderConfirmation',
  setup() {
    const route = useRoute()
    
    const shopId = parseInt(route.params.shopId, 10)
    

    const { toastData, showToast } = useToastEffect()
    const { userAddCartList, shopName } = useCartEffect(showToast, shopId)

    const {displayDialog,showDialog,handleOderCanclation} = useShowDialogEffect(showDialog)
    const {handleOrderConfirmation} = useMakeOrderEffect(shopId,showDialog,userAddCartList,shopName,showToast)
    

    return { shopName, userAddCartList,toastData,showDialog,handleOrderConfirmation,handleOderCanclation,displayDialog }
  },
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: scroll;
  background-color: $search-bgColor;
}

.cancelBtn {
  margin-right: 0.12rem;
}

.payBtn {
  margin-left: 0.12rem;
}
</style>
