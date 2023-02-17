<script setup lang="ts">

import LuButton from '@learn-ui/components/button';


</script>

<template>
  <div>
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
        size="small"
        color-type="danger">
        警示按钮
    </lu-button>
  </div>

</template>
