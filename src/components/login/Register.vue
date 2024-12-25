<script setup>
import { ref } from 'vue'
import { EmailOutlined, LockOpenOutlined } from '@vicons/material';

// 注册表单
const registerFormRef = ref(null);
// 注册表单数据
const registerFormModel = ref({
    email: '',
    vc: '',
    trim: false
})
// 注册表单校验规则
const registerFormRules = {
    email: [
        {
            key: 'email',
            required: true,
            message: '请输入邮箱',
            trigger: ['input', 'blur']
        },
        {
            key: 'email',
            message: '邮箱格式不正确',
            trigger: ['input', 'blur'],
            validator: (rule, value) => {
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
            }
        }
    ],
    vc: [
        { required: true, message: '请输入验证码', trigger: ['input', 'blur'] }
    ],
    trim: {
        message: "请同意《条款与协议》",
        trigger: ["change"],
        validator: (rule, value) => {
            return value
        }
    }
}

// 表单提交
const toRegister = (e) => {
    e.preventDefault();
    registerFormRef.value?.validate((errors) => {
        if (!errors) {
            alert("注册成功");
        }
    });
}

// 获取邮箱验证码
const getEmailVc = () => {
    checkEmail();
}

// 校验邮箱
const checkEmail = () => {
    registerFormRef.value?.validate(
        (errors) => {
            if (!errors) {
                startCountdown();
            }
        },
        (rule) => {
            return rule?.key === 'email'
        }
    )
}

// 倒计时对象
const countdown = ref({
    // 是否正在倒计时
    isCountdown: false,
    // 倒计时是否可用
    isDisabled: false,
    // 倒计时文字
    text: "获取验证码",
    // 倒计时秒数
    seconds: 60,
    // 定时器对象
    timer: null
});

// 开始倒计时
const startCountdown = () => {
    countdown.value.isCountdown = true;
    countdown.value.isDisabled = true;
    countdown.value.timer = setInterval(() => {
        countdown.value.seconds--;
        countdown.value.text = `${countdown.value.seconds}秒后重新获取`;
        if (countdown.value.seconds === 0) {
            resetCountDown();
        }
    }, 1000);
}

// 重置倒计时
function resetCountDown() {
    // 清除定时器
    clearInterval(countdown.value.timer);
    countdown.value.seconds = 60;
    countdown.value.isCountdown = false;
    countdown.value.isDisabled = false;
    countdown.value.text = "获取验证码";
}

// 自定义事件
const emits = defineEmits(['changeStep']);
</script>

<template>
    <n-card>
        <!-- 标题 -->
        <n-space align="center" justify="space-between">
            <h2>注册</h2>
            <!-- 点击按钮后，触发名为 changeStep 的自定义事件，并传递参数 1 给父组件 -->
            <n-text depth="3">已有账号？<n-button text type="info" @click="emits('changeStep', 1)">前往登录</n-button></n-text>
        </n-space>
        <!-- 注册表单 -->
        <n-form ref="registerFormRef" :model="registerFormModel" :rules="registerFormRules">
            <!-- 邮箱 -->
            <n-form-item label="邮箱" path="email" first>
                <n-input placeholder="请输入邮箱" v-model:value="registerFormModel.email">
                    <template #prefix>
                        <n-icon :component="EmailOutlined" />
                    </template>
                </n-input>
            </n-form-item>

            <!-- 验证码 -->
            <n-grid :cols="2" :x-gap="24">
                <n-form-item-gi label="验证码" path="vc">
                    <n-input placeholder="请输入验证码" v-model:value="registerFormModel.vc" />
                </n-form-item-gi>
                <n-form-item-gi>
                    <n-button block secondary type="success" :disabled="countdown.isDisabled" @click="getEmailVc">
                        {{ countdown.text }}
                    </n-button>
                </n-form-item-gi>
            </n-grid>

            <!-- 条款与协议 -->
            <n-form-item :show-label="false" path="trim">
                <n-checkbox v-model:checked="registerFormModel.trim">同意本公司的</n-checkbox>
                <n-button text type="info">《条款与协议》</n-button>
            </n-form-item>

            <!-- 注册按钮 -->
            <n-form-item :show-label="false">
                <n-button type="success" block @click="toRegister">注册</n-button>
            </n-form-item>
        </n-form>
    </n-card>
</template>