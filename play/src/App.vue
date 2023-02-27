<script setup lang="ts">

import LuButton from '@learn-ui/components/button';


</script>

<template>
<div class="card">
    <h3>default 按钮</h3>
    <lu-button
        type="default"
        :loading="true"
        size="large"
        :block="true">
        link, large
    </lu-button>
    <lu-button
        type="default"
        color-type="danger">
        警示按钮 small
    </lu-button>
    <lu-button
        type="default"
        size="small"
        color-type="info"
        :disabled="true">
        警示按钮
    </lu-button>
    <lu-button
        type="default"
        size="small"
        color="red">
        自定义颜色
    </lu-button>
</div>

<div class="card">
    <h3>ghost 按钮</h3>
    <lu-button
        type="ghost"
        :loading="true"
        size="large"
        :block="true">
        link, large
    </lu-button>
    <lu-button
        type="ghost"
        color-type="primary">
        警示按钮 small
    </lu-button>
    <lu-button
        type="ghost"
        size="small"
        color-type="danger"
        :disabled="true">
        警示按钮
    </lu-button>
    <lu-button
        type="ghost"
        size="small"
        color="red"
        :disabled="true">
        自定义颜色
    </lu-button>
</div>

<div class="card">
    <h3>link 按钮</h3>
    <lu-button
        type="link"
        :loading="true"
        size="large"
        :block="true">
        link, large
    </lu-button>
    <lu-button
        type="link"
        color-type="info">
        警示按钮 small
    </lu-button>
    <lu-button
        type="link"
        size="small"
        color-type="danger"
        :disabled="true">
        警示按钮
    </lu-button>
    <lu-button
        type="link"
        size="small"
        color="red">
        自定义颜色
    </lu-button>

    <lu-button
        type="link"
        size="small"
        color="red"
        href="https://baidu.com">
        自定义颜色
    </lu-button>
</div>


</template>
