<script setup lang="ts">

import LuButton from '@learn-ui/components/button';


</script>

<template>
  <div>default 按钮</div>
  <div>
    <lu-button
        type="default"
        :loading="true"
        size="large"
        :block="true">
        link, large
    </lu-button>
    <lu-button
        type="default"
        size="small"

        color-type="danger">
        警示按钮 small
    </lu-button>
    <lu-button
        type="default"
        size="small"
        color-type="danger"
        :disabled="true">
        警示按钮
    </lu-button>
  </div>

</template>
