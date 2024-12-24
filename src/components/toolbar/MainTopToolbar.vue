<script setup>
import { NotificationsNoneOutlined } from '@vicons/material'
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { EmailOutlined, LockOpenOutlined } from '@vicons/material';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const { changeTheme } = themeStore;

// 显示登录弹窗
const showLoginModel = ref(false);
// 登录表单
const loginFormRef = ref(null);
// 登录表单数据
const loginFormModel = ref({
    email: '',
    password: '',
    trim: false
})
// 登录表单校验规则
const loginFormRules = {
    email: [
        { required: true, message: '请输入邮箱地址', trigger: ['input', 'blur'] },
        {
            message: '邮箱格式不正确',
            trigger: ['input', 'blur'],
            validator: (rule, value) => {
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
            }
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: ['input', 'blur'] },
        { min: 5, max: 16, message: '密码长度在 5 到 16 个字符', trigger: 'blur' }
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
const toLogin = (e) => {
    e.preventDefault();
    loginFormRef.value?.validate((errors) => {
        if (!errors) {
            alert("登录成功");
        }
    });
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
            <n-card>
                <!-- 标题 -->
                <n-space align="center" justify="space-between">
                    <h2>登录</h2>
                    <n-text depth="3">暂无账号？<n-button text type="info">前往注册</n-button></n-text>
                </n-space>
                <!-- 登录表单 -->
                <n-form ref="loginFormRef" :model="loginFormModel" :rules="loginFormRules">
                    <!-- 邮箱 -->
                    <n-form-item label="邮箱" path="email" first>
                        <n-input placeholder="请输入邮箱" v-model:value="loginFormModel.email">
                            <template #prefix>
                                <n-icon :component="EmailOutlined" />
                            </template>
                        </n-input>
                    </n-form-item>

                    <!-- 密码 -->
                    <n-form-item label="密码" path="password">
                        <n-input type="password" placeholder="请输入密码" v-model:value="loginFormModel.password">
                            <template #prefix>
                                <n-icon :component="LockOpenOutlined" />
                            </template>
                        </n-input>
                    </n-form-item>

                    <!-- 条款与协议 -->
                    <n-form-item :show-label="false" path="trim">
                        <n-checkbox v-model:checked="loginFormModel.trim">同意本公司的</n-checkbox>
                        <n-button text type="info">《条款与协议》</n-button>
                    </n-form-item>

                    <!-- 登录按钮 -->
                    <n-form-item :show-label="false">
                        <n-button type="success" block @click="toLogin">登录</n-button>
                    </n-form-item>

                    <!-- 忘记密码 -->
                    <n-space justify="center" style="cursor: pointer;">
                        <n-text depth="3">忘记密码</n-text>
                    </n-space>
                </n-form>
            </n-card>
        </div>
    </n-modal>
</template>