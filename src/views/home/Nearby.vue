<template>
  <div class="nearby">
    <div class="nearby_title">Recommendation</div>
    <router-link
      :to="`/shop/${item.id}`"
      v-for="item in nearbyList.data"
      :key="item.id"
    >
      <shopInfo :shopItem="item"></shopInfo>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import shopInfo from '../../components/Shop/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const response = await get('/api/nearby')
    if (response?.errno === 0 && response?.data) {
      nearbyList.value = response
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { shopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  },
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
.nearby .nearby_title {
  margin: 0.16rem 0 0.04rem 0;
  font-size: 0.18rem;
  font-weight: 550;
  color: $content_fontColor;
}
a{ text-decoration: none;}
</style>
