<script setup>
import { computed, ref } from 'vue';

import Login from '@/components/login/Login.vue'
import Register from '@/components/login/Register.vue'
import RegisterSuccess from '@/components/login/RegisterSuccess.vue'

import { useLoginModalStore } from '@/stores/loginModalStore';
import { storeToRefs } from 'pinia';

const loginModalStore = useLoginModalStore();
const { showLoginModal } = storeToRefs(loginModalStore);

// 登录步骤:1登录，2注册，3注册成功
const loginModalStep = ref(1)

// 根据步骤选择不同的组件
const showLoginModalCard = computed(() => {
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
    <!-- 登录窗口 -->
    <n-modal v-model:show="showLoginModal" transform-origin="center" :close-on-esc="false" :mask-closable="false">
        <div style="width: 400px">
            <!-- 使用Vue提供的Transition实现组件过渡动画，"out-in"表示先执行离开动画再执行进入动画 -->
            <Transition name="bounce" mode="out-in">
                <!-- 根据 showLoginModalCard 的值动态选择要渲染的组件。
                 监听子组件发出的 changeStep 事件，并调用父组件中的 changeLoginModalStep 方法。 -->
                <component :is="showLoginModalCard" @changeStep="changeLoginModalStep" />
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