<script setup>
import { NotificationsNoneOutlined } from '@vicons/material'
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { EmailOutlined, LockOpenOutlined } from '@vicons/material';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
const { changeTheme } = themeStore;

const showLoginModel = ref(false);
</script>

<template>
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
                <n-space align="center" justify="space-between">
                    <h2>登录</h2>
                    <n-text depth="3">暂无账号？<n-button text type="info">前往注册</n-button></n-text>
                </n-space>
                <!-- 登录表单 -->
                <n-form>
                    <n-form-item label="邮箱">
                        <n-input placeholder="请输入邮箱">
                            <template #prefix>
                                <n-icon :component="EmailOutlined" />
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item label="密码">
                        <n-input type="password" placeholder="请输入密码">
                            <template #prefix>
                                <n-icon :component="LockOpenOutlined" />
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item :show-label="false">
                        <n-checkbox>同意本公司的</n-checkbox>
                        <n-button text type="info">《条款与协议》</n-button>
                    </n-form-item>
                    <n-form-item :show-label="false">
                        <n-button type="success" block>登录</n-button>
                    </n-form-item>
                    
                    <n-space justify="center" style="cursor: pointer;">
                        <n-text depth="3">忘记密码</n-text>
                    </n-space>
                </n-form>
            </n-card>
        </div>
    </n-modal>
</template>