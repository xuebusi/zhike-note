<script setup>
import { CheckCircleRound } from '@vicons/material'
</script>
<template>
    <n-card style="text-align: center;">
        <n-icon :component="CheckCircleRound" size="120" color="#0e7a0d" />
        <n-text>
            <h4>欢迎加入知科笔记</h4>
        </n-text>
        <n-text depth="3">
            请前往注册的邮箱，查看账号信息，
            <n-button text type="info">点击此处前往登录</n-button>
        </n-text>
    </n-card>
</template>