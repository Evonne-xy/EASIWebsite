<template>
  <div>
    <div class="header">
      <span class="iconfont header-locationIcon">&#xe6c5;</span>
      <span class="header-text">Little Malo Street Little Malo Street </span>
      <span class="iconfont header-scanIcon">&#xe68b;</span>
    </div>
    <div class="search">
      <label class="iconfont search-icon">&#xe6e1;</label>
      <input class="search-input" type="search" id="search" name="search" placeholder="Search" />
    </div>
    <div class="banner">
      <img class="banner_img" src="../../img/EASIBanner2.jpeg" />
    </div>
    <div class="service">
      <div class="service_item">
        <img class="service_img" src="../../img/Dumpling.png" />
        <p class="service_desc">Dumpling</p>
      </div>

      <div class="service_item">
        <img class="service_img" src="../../img/Thai.png" />
        <p class="service_desc">Thai</p>
      </div>
      <div class="service_item">
        <img class="service_img" src="../../img/Korean.png" />
        <p class="service_desc">Korean</p>
      </div>
      <div class="service_item">
        <img class="service_img" src="../../img/dessert.png" />
        <p class="service_desc">dessert</p>
      </div>
      <div class="service_item">
        <img class="service_img" src="../../img/Sushi.png" />
        <p class="service_desc">Sushi</p>
      </div>
      <div class="service_item">
        <img class="service_img" src="../../img/bubbleTea.png" />
        <p class="service_desc">Bubble Tea</p>
      </div>
      <div class="service_item">
        <img class="service_img" src="../../img/FriedChicken.png" />
        <p class="service_desc">Fried Chicken</p>
      </div>
      <div class="service_item">
        <img class="service_img" src="../../img/HotPot.png" />
        <p class="service_desc">Hot Pot</p>
      </div>

      <div class="service_item">
        <img class="service_img" src="../../img/EASIFresh.png" />
        <p class="service_desc">EASI Fresh</p>
      </div>

      <div class="service_item">
        <img class="service_img" src="../../img/burger.png" />
        <p class="service_desc">Burger Pizza</p>
      </div>
    </div>
    <div class="gap"></div>
  </div>
</template>

<script>
export default {
  name: 'topPart'
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixin.scss';
/* header css */

.header {
    padding: 0.16rem 0;
    line-height: 0.22rem;
    height: 0.29rem;
    display: flex;
}
.header .header-locationIcon {
    font-size: 0.2rem;
    flex-grow: 0.1;
    text-align: left;
}
.header .header-scanIcon {
    font-size: 0.2rem;
    flex-grow: 1;
    text-align: right;
}

.header .header-text {
    position: relative;
    flex-grow: 2;
    top: 0.01rem;
    padding: 0 0.1rem;
    font-weight: 500;
    @include ellipsis;
}
.search {
    line-height: 0.32rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: $search-fontColor;
    background-color: $search-bgColor;
    border-radius: 0.16rem;
    margin-bottom: 0.12rem;
}

.search-input {
    border-radius: 0.16rem;
    border: none;
    outline:none;
    width: 100%;
    background-color: $search-bgColor;
}
::placeholder {
    font-size: 1em;
    padding: 0.05rem;
}

.search .search-icon {
    margin-left: 0.1rem;
    font-size: 0.16rem;
}

.banner {
    height: 0rem;
    overflow: hidden;
    padding-bottom: 36.75%;
}

.banner .banner_img {
    width: 100%;
}
.service {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.16rem;
}

.service .service_item {
    width: 20%;
}

.service .service_item .service_img {
    width: 0.4rem;
    height: 0.4rem;
    margin: 0 auto;
    display: block;
    background-color: $content_labelColor;
    border-radius: 0.16rem;
}
.service .service_item :hover {
    cursor: pointer;
}

.service .service_item .service_desc {
    text-align: center;
    margin: 0.1rem 0.16rem;
    color: $content_fontColor;
    font-weight: 500;
}


</style>
