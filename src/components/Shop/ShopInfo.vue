<template>
  <div
    :class="{ shop_item: true, bordered: hideBorder ? false : true }"
  >
    <img :src="shopItem.imgSrc" class="shop_item_img" />
    <div class="shop_content">
      <div class="shop_content_title">{{ shopItem.title }}</div>
      <div class="shop_content_tags">
        <span
          class="shop_content_tag"
          v-for="(tag, tagIndex) in shopItem.tags"
          :key="tagIndex"
          >{{ tag }}</span
        >
        <span class="shop_content_highLight">{{ shopItem.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['shopItem', 'hideBorder'],
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
.shop_item {
  display: flex;
  padding: 0.12rem 0;
  
}

.bordered {
    border-bottom: 1px solid $content_bgColor;
}

.shop_item .shop_item_img {
  width: 0.6rem;
  height: 0.6rem;
}
.shop_item .shop_content {
  flex: 1;
  margin-left: 0.16rem;
}

.shop_item .shop_content .shop_content_title {
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content_fontColor;
  font-weight: 520;
}

.shop_item .shop_content .shop_content_tags {
  line-height: 0.18rem;
  font-size: 0.13rem;
  color: $content_fontColor;
  margin-top: 0.05rem;
}
.shop_item .shop_content .shop_content_tags .shop_content_tag {
  margin-right: 0.16rem;
  background-color: $content_bgColor;
}

.shop_item .shop_content .shop_content_tags .shop_content_highLight {
  display: inline-block;
  line-height: 0.18rem;
  font-size: 0.13rem;
  margin: 0.05rem 0 0 0;
}
</style>