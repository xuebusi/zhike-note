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
        { required: true, message: '请输入邮箱', trigger: ['input', 'blur'] },
        {
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
</script>

<template>
    <n-card>
        <!-- 标题 -->
        <n-space align="center" justify="space-between">
            <h2>注册</h2>
            <n-text depth="3">已有账号？<n-button text type="info">前往登录</n-button></n-text>
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
                    <n-button block secondary type="success">获取验证码</n-button>
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