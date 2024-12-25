<script setup>
import Login from '@/components/login/Login.vue'
import Register from '@/components/login/Register.vue'
import RegisterSuccess from '@/components/login/RegisterSuccess.vue'
import { NotificationsNoneOutlined } from '@vicons/material'
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const { changeTheme } = themeStore;

// 显示登录弹窗
const showLoginModel = ref(false);

// 登录步骤:1登录，2注册，3注册成功
const loginModalStep = ref(1)

// 登录卡片显示计算属性
const showLoginModelCard = computed(() => {
    switch (loginModalStep.value) {
        case 1:
            return Login;
        case 2:
            return Register;
        default:
            return RegisterSuccess;
    }
})

// 切换登录步骤
const changeLoginModalStep = (step) => {
    loginModalStep.value = step
}
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
            <!-- 使用Vue提供的Transition实现组件过渡动画，"out-in"表示先执行离开动画再执行进入动画 -->
            <Transition name="bounce" mode="out-in">
                <!-- 根据 showLoginModelCard 的值动态选择要渲染的组件。
                 监听子组件发出的 changeStep 事件，并调用父组件中的 changeLoginModalStep 方法。 -->
                <component :is="showLoginModelCard" @changeStep="changeLoginModalStep" />
            </Transition>
        </div>
    </n-modal>
</template>
<style scoped>
/* 过渡动画样式开始 */
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

/* 过渡动画样式结束 */
</style>