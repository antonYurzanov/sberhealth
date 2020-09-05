<template lang="pug">
  .shadow
    .popup
      .text
        slot
</template>

<script>
export default {
  name: 'PopupComponent'
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/functions.scss';

.shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

.popup {
  background: white;
  padding: rem(32px);
  font-size: rem(32px);
  width: rem(320px);
  text-align: center;
}
</style>
