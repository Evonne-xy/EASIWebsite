<template>
  <div>
    <div class="background-img"></div>
    <div class="wrapper">
      <img class="wrapper_img" src="../../img/easiLogo.png" />
      <div class="wrapper_input">
        <input
          class="wrapper_input_content"
          placeholder="UserName"
          v-model="user.userName"
        />
      </div>
      <div class="wrapper_input">
        <input
          class="wrapper_input_content"
          type="password"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div class="wrapper_login-button" @click="handleLogin">Login</div>
      <div class="wrapper_login-link" @click="handleSignUp">Sign up</div>
    </div>
    <base-toast v-if="toastData.show">{{ toastData.error }}</base-toast>
  </div>
</template>


<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { useToastEffect } from '../../components/UI/BaseToast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const user = reactive({
    userName: '',
    password: '',
  })
  const handleLogin = async () => {
    try {
      const response = await post('/api/user/login', {
        username: user.userName,
        password: user.password,
      })
      if (response?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('Fail to Authenticate')
      }
    } catch (error) {
      showToast(error)
    }
  }
  return { user, handleLogin }
}

export default {
  setup() {
    const router = useRouter()
  
    const { toastData, showToast } = useToastEffect()
    const { user, handleLogin } = useLoginEffect(showToast)

  //   const user = reactive({
  //   userName: '',
  //   password: '',
  // })
  // const handleLogin = async () => {
  //   try {
  //     const response = await post('111/api/user/login', {
  //       username: user.userName,
  //       password: user.password,
  //     })
  //     if (response?.errno === 0) {
  //       localStorage.isLogin = true
  //       router.push({ name: 'Home' })
  //     } else {
  //       showToast('Fail to Authenticate')
  //     }
  //   } catch (error) {
  //     showToast(error)
  //   }
  // }


    const handleSignUp = () => {
      router.push({ name: 'Register' })
    }
    return { handleLogin, handleSignUp, user, toastData }
  },
}
</script>


<style lang = "scss" scoped>
@import '../../style/variable.scss';
.background-img {
  background-image: url(../../img/nearby1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  opacity: 0.9;
}
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-60%);
}
.wrapper .wrapper_img {
  width: 1.6rem;
  height: 0.6rem;
  display: block;
  margin: 0 auto 0.4rem auto;
}

.wrapper .wrapper_input {
  height: 0.48rem;
  margin: 0 0.4rem 0.16rem 0.4rem;
  padding: 0rem 0.16rem;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border: 0.01rem solid $content_notice_fontColor;
  border-radius: 0.06rem;
}

.wrapper .wrapper_input .wrapper_input_content {
  width: 100%;
  border: none;
  outline: none;
  margin-top:0.12rem;
  line-height: 0.22rem;
  background: none;
  font-size: 0.16rem;
  color: $content_notice_fontColor;
  &::placeholder {
    color: $content_notice_fontColor;
  }
}

.wrapper_login-button {
  line-height: 0.48rem;
  background: $content_labelColor;
  box-shadow: 0 0.01rem 0.2rem 0 #ffd900c2;
  border-radius: 0.4rem;
  color: #333;
  text-align: center;
  font-size: 0.16rem;
  margin: 0.32rem auto 0.16rem auto;
  width: 60%;
}

.menu {
  margin: 0.32rem 0.4rem 0.16rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper_login-link {
  font-size: 0.14rem;
  color: $bgColor;
  text-align: center;
  text-decoration: underline;
}
</style>