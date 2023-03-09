<script setup lang="ts">
import { ref } from 'vue';
import LuButton from '@learn-ui/components/button';
import LuInput from '@learn-ui/components/input';
const input = ref('init');

const changeValue = (value: string) => {
    console.log('父组件中监听change: ' + value);
    console.log('双向绑定的值：'+ input.value);
}

</script>

<template>
<div class="card">
    <!-- <lu-input size="large" placeholder="请输入" v-model="input"></lu-input> -->
    <lu-input placeholder="请输入" clearable v-model="input" @change="changeValue"></lu-input>
    <div>输入框的值 {{ input }}</div>
    <!-- <lu-input size="small" placeholder="请输入" v-model="input"></lu-input> -->
    <!-- <lu-input type="textarea">
        <template #prefix>
            https://
        </template>
        <template #suffix>
            .com
        </template>
    </lu-input> -->
</div>

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
