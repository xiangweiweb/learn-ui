<script setup lang="ts">

import LuButton from '@learn-ui/components/button';

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <lu-button
        :loading="true"
        size="large"
        type="link"
        :block="true">
        link, large
    </lu-button>
    <lu-button
        type="ghost"
        size="small"
        color-type="info">
        ghost, small
    </lu-button>
    <lu-button
        type="ghost"
        size="small"
        color-type="danger">
        警示按钮
    </lu-button>
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
