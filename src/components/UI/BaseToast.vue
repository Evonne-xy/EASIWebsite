<template>
    <div class = "toast">
        <slot></slot>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    error: '',
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.error = message
    setTimeout(() => {
      toastData.error = ''
      toastData.show = false
    }, 2000)
  }
  return { toastData, showToast }
}
</script>

<style lang = "scss" scoped>
@import '../../style/variable.scss';
.toast{
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    padding:0.1rem;
    background: rgba(0,0,0,0.35);
    border-radius: 0.05rem;
    color:$bgColor
}
</style>