<<<<<<< HEAD
# EASIWebsite
This is a mock EASI app and use the vue framework
这个项目是商业外卖网站移动端网站，使用的vue框架
网页地址: https://easideliveryweb.netlify.app/#/


=======
# shopping-website

项目功能： 
1. 登陆注册（当你进入界面时，会让你登录，登录输入任何用户名和密码都可以登录成功）
   ![login](ReadmeImgs\logIn.png)
   ![sinUp](ReadmeImgs\signUp.png)


2. 首页展示 
   进入首页后，会展示不同的商家页面，可以点击进去查看不同商家的商品，这里有商品内容商家分别为Costco,WoolWorths.
   ![HomePage](ReadmeImgs\HomePage.png)


3. 商家页面
   进入后，会展示商家的商品，商品通过axios请求从fastMock平台上调取的数据。接口信息在下方

   页面功能：
   <1>用户可以通过左侧的tab，挑选不同分类的产品。

   <2>用户可添加删减不同的产品，下方的金额和数额会改变

   <3>用户选好后可以点击，checkOut，进入结账页面

![shopDetail](ReadmeImgs\shopDetail.png)
![shopDetail2](ReadmeImgs\shopDetail2.png)

4. 结账页面
   结账页面会显示商品信息，和价格，用户可点击check out选择支付或者取消，如果用户选择支付，信息会post到后端，页面会跳转到order界面，显示order详情。
   由于使用的是fastMock平台，所以无法真实的post并且get到

   ![orderComfirmation](ReadmeImgs\orderComfirmation.png)
   ![orderComfirmation](ReadmeImgs\orderComfirmation2.png)

5. 购物车页面
    购物车可以显示你加入的商品，并且如果商品数量超过3个，会将商品隐藏起来，当用户点击后，会显示所以的商品
![cartList](ReadmeImgs\cartList.png)
![cartList2](ReadmeImgs\cartList2.png)


以下为使用的接口信息：
 FastMock接口根地址：https://www.fastmock.site/mock/27a7a97298b45004b177ad4c492f30e6/EASI_shop
[{
  "name": "GetOrderList",
  "url": "/api/getOrder",
  "method": "get",
  "on": true
}, {
  "name": "CreateOrder",
  "url": "/api/order",
  "method": "post",
  "on": true
}, {
  "name": "shopDetail",
  "url": "/api/shopDetail/:id",
  "method": "get",
  "on": true
}, {
  "name": "shopItemList",
  "url": "/api/shop/:id/items",
  "method": "get",
  "on": true
}, {
  "name": "nearby",
  "url": "/api/nearby",
  "method": "get",
  "on": true
}, {
  "name": "Register",
  "url": "/api/user/register",
  "method": "post",
  "on": true
}, {
  "name": "Login",
  "url": "/api/user/login",
  "method": "post",
  "on": true
}]
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
>>>>>>> 1bf290b ('12.30update')
