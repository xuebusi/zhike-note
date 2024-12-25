import { defineStore } from 'pinia'
import { ref } from 'vue'

// 登录模态框
export const useLoginModalStore = defineStore(
  'login-modal',
  () => {
    // 是否显示登录模态框
    const showLoginModal = ref(false)
    // 登录模态框状态
    const changeLoginModalStatus = (show) => {
      showLoginModal.value = show
    }

    return { showLoginModal, changeLoginModalStatus }
  }
)
