<template>
  <div @click="$emit('close')">
    <dialog open>
      <header v-if="$slots.header">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section>
        <slot></slot>
      </section>
      <menu>
        <slot name="actions">
          <base-button @click="$emit('close')">Close</base-button>
        </slot>
      </menu>
    </dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
}
</script>


<style lang= 'scss' scoped>
@import '../../style/variable.scss';
dialog {
  position: fixed;
  /* top: 30vh;
  left: 10%;
  width: 80%; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 30%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1;
  pointer-events: none;
}

header {
  background-color: $content_labelColor;
  color: white;
  width: 100%;
  padding: 1rem;
}

menu {
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  margin: 0;
}

section {
  padding: 0.1rem;
}
</style>