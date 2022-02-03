<template>
  <div class="top">
    <div class="top_bgcor">
      <div class="top_header">
        <div class="iconfont top_header_back" @click="handleBackClick">
          &#xe662;
        </div>
        Order Confirmation
      </div>
      <div class="top_receiver">
        <div class="top_receiver_title">Address</div>
        <div class="top_receiver_address">
          713, 864 Blackburn Rd, Clayton, 3168
        </div>
        <div class="top_receiver_info">
          <span class="top_receiver_info_detail">Yvonne</span>
          <span class="top_receiver_info_detail">0432282685</span>
        </div>
        <div class="iconfont top_receiver_arrow" @click="handleBackClick">
          &#xe662;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name:'TopArea',
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }

    return { handleBackClick }
  },
}
</script>

<style lang = "scss" scoped>
@import '../../style/mixin.scss';
@import '../../style/variable.scss';
.top {
  position: relative;
  height: 1.8rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(
    0deg,
    rgba(0, 145, 255, 0) 4%,
    $content_labelColor 50%
  );
  background-repeat: no-repeat;
}

.top .top_header {
  position: relative;
  padding-top: 0.2rem;
  line-height: 0.24rem;
  color: #fff;
  text-align: center;
  font-size: 0.16rem;
}

.top .top_header .top_header_back {
  position: absolute;
  left: 0.18rem;
  font-size: 0.3rem;
}

.top_receiver {
  position: absolute;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0;
  height: 1.11rem;
  background-color: #fff;
  border-radius: 0.12rem;
  box-shadow: 0.01rem 0.02rem 0.03rem 0.03rem rgba(189, 189, 189, 0.26);
}

.top_receiver .top_receiver_title {
  padding: 0.16rem 0 0.14rem 0.16rem;
  font-size: 0.16rem;
  color: #333;
  line-height: 0.22rem;
}

.top_receiver .top_receiver_address {
  padding: 0 0.4rem 0 0.16rem;
  font-size: 0.14rem;
  color: #333;
}

.top_receiver .top_receiver_info {
  padding: 0.1rem 0 0 0.16rem;
}

.top_receiver_info .top_receiver_info_detail {
  margin-right: 0.6rem;
  color: #666;
  font-size: 0.12rem;
  line-height: 0.18rem;
}

.top_receiver .top_receiver_arrow {
  position: absolute;
  right: 0.1rem;
  top: 0.45rem;
  color: #666;
  font-size: 0.2rem;
  transform: rotate(180deg);
}

</style>