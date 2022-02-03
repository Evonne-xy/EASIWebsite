<template>
<teleport to="body">
  <div v-if="show" class="backdrop"> </div>
    <dialog open v-if = "show">
      <div class = "content">
        <header>
        <slot name="header">
          <h2>{{title}}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu>
        <slot name="actions">
        </slot>
      </menu>
      </div>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['close']
}
</script>


<style lang= 'scss' scoped>
@import '../../style/variable.scss';
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  pointer-events: none;
  z-index: 10;
}

dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.12rem;
  border: none;
  box-shadow: 0 0.02rem 0.08rem rgba(0, 0, 0, 0.26);
  padding: 0;
  z-index:100;
  margin: 0;
  overflow: hidden;
  background-color:#fff
}

.content{
  width:3rem;
  height:1.56rem;
  background-color:#fff;
  text-align:center;
}

header {
  color: #333;
  font-size:0.16rem;
  margin-top:0.24rem 0 0.08rem 0;
  line-height:0.26rem
}

menu {
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  margin: 0;
}

section {
  margin-top:0.24rem 0 0.08rem 0;
 font-size:0.14rem;
  color:#666;
}
</style>