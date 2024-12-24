<script setup>
import { NotificationsNoneOutlined } from '@vicons/material'
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const { changeTheme } = themeStore;

// 显示登录弹窗
const showLoginModel = ref(false);
</script>

<template>
    <!-- 网站头部 -->
    <n-space align="center" justify="space-between" style="height: 100%;">
        <n-text>知科笔记</n-text>
        <n-space>
            <!-- 头像 -->
            <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                style="position: relative; top: 5px;" />

            <!-- 分割线 -->
            <n-divider vertical style="position: relative; top: 5px;" />

            <!-- 消息按钮 -->
            <n-badge dot type="success" processing :offset="[-8, 4]">
                <n-button circle tertiary>
                    <n-icon size="18" :component="NotificationsNoneOutlined" />
                </n-button>
            </n-badge>

            <!-- 主题按钮 -->
            <n-button tertiary circle @click="changeTheme()">
                <n-icon size="18" :component="theme.icon" />
            </n-button>

            <!-- 登录按钮 -->
            <n-button tertiary type="primary" @click="showLoginModel = true">登录</n-button>
        </n-space>
    </n-space>

    <!-- 登录窗口 -->
    <n-modal v-model:show="showLoginModel" transform-origin="center" :close-on-esc="false" :mask-closable="false">
        <div style="width: 400px">
            <login />
        </div>
    </n-modal>
</template>