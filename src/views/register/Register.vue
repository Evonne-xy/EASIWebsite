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
          placeholder="New Password"
          v-model="user.password"
        />
      </div>
      <div class="wrapper_input">
        <input
          class="wrapper_input_content"
          type="password"
          placeholder="Confirm Password"
          autocomplete="new-password"
          v-model="user.confirmPassword"
        />
      </div>
      <div class="wrapper_login-button" @click="handleRegister">Sign Up</div>
      <div class="wrapper_login-link" @click="handleAccount">
        Already has Account ?
      </div>
      <base-toast v-if="toastData.showToast">{{ toastData.error }}</base-toast>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { useToastEffect } from '../../components/UI/BaseToast.vue'

//register
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const user = reactive({
    userName: '',
    password: '',
    confirmPassword: '',
  })
  const handleRegister = async function () {
    try {
      const response = await post('/api/user/register', {
        username: user.userName,
        password: user.password,
        confirmPassword: user.confirmPassword,
      })
      if (response?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('Fail to sign up')
      }
    } catch (error) {
      showToast(error)
    }
  }
  return { user, handleRegister }
}
export default {
  setup() {
    const router = useRouter()
    const { toastData, showToast } = useToastEffect()
    const { user, handleRegister } = useRegisterEffect(showToast)
    const handleAccount = () => {
      router.push({ name: 'Login' })
    }
    return { handleAccount, user, handleRegister,toastData }
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
  transform: translateY(-50%);
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
  border: 1px solid $content_notice_fontColor;
  border-radius: 6px;
}

.wrapper .wrapper_input .wrapper_input_content {
  width: 100%;
  border: none;
  outline: none;
  line-height: 0.48rem;
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
  margin: 0.32rem 0.4rem 0.16rem 0.4rem;
  text-align: center;
  font-size: 0.16rem;
}

.wrapper_login-link {
  font-size: 0.14rem;
  color: $bgColor;
  text-align: center;
  text-decoration: underline;
}
</style>