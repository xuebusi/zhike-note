<script setup>
import MainTopToolbar from '@/components/toolbar/MainTopToolbar.vue';

import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
</script>

<template>
  <n-config-provider :theme="theme.name">
    <n-layout position="absolute">
      <n-layout-header bordered style="height: 64px;padding: 0 20px">
        <main-top-toolbar />
      </n-layout-header>
      <n-layout position="absolute" style="top: 64px;" has-sider>
        <n-layout-sider bordered width="64px" content-style="padding: 24px 0; text-align: center">
          海淀桥
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
          平山道
        </n-layout-content>
      </n-layout>
    </n-layout>

    <login-modal />
  </n-config-provider>
</template>