<template>
  <!-- 按钮 -->
  <n-button>naive-ui</n-button>
  <!-- 图标 -->
  <n-icon size="30" :component="AcUnitRound"></n-icon>

</template>

<script setup>
// 按需引入naive-ui组件
import { NButton, NIcon } from 'naive-ui'
// 从图标库引入AcUnitRound图标
import { AcUnitRound } from '@vicons/material'

</script>