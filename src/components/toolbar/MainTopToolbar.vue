<script setup>
import { DarkModeRound, NotificationsNoneOutlined } from '@vicons/material'
</script>

<template>
    <n-space align="center" justify="space-between" style="height: 100%;">
        <n-text>知科笔记</n-text>
        <n-space>
            <!-- 头像 -->
            <n-avatar
            round
            size="small"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            style="position: relative; top: 5px;"
            />

            <!-- 分割线 -->
            <n-divider vertical style="position: relative; top: 5px;" />

            <!-- 消息按钮 -->
            <n-badge dot type="success" processing :offset="[-8, 4]">
                <n-button circle tertiary>
                    <n-icon size="18" :component="NotificationsNoneOutlined" />
                </n-button>
            </n-badge>

            <!-- 主题按钮 -->
            <n-button tertiary circle>
                <n-icon size="18" :component="DarkModeRound" />
            </n-button>

            <!-- 登录按钮 -->
            <n-button tertiary type="primary">登录</n-button>
        </n-space>
    </n-space>
</template>