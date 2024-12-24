import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { darkTheme } from 'naive-ui'
import { LightbulbOutlined, DarkModeRound } from '@vicons/material'

export const useThemeStore = defineStore(
  'theme',
  () => {
    // 是否暗色主题
    const isDarkTheme = ref(false)
    // 暗色主题-灯泡，亮色主题-月牙
    const theme = computed(() => {
      if (isDarkTheme.value) {
        return {
          name: darkTheme,
          icon: LightbulbOutlined,
        }
      } else {
        return {
          name: null,
          icon: DarkModeRound,
        }
      }
    })
    // 切换主题
    const changeTheme = () => {
      isDarkTheme.value = !isDarkTheme.value
    }
    return { isDarkTheme, theme, changeTheme }
  },
  {
    persist: {
      // 本地存储
      storage: localStorage,
      // 存储主题
      paths: ['isDarkTheme']
    }
  }
)
