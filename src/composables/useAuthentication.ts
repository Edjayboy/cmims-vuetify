import { computed } from "vue"
import { useUserStore } from '@/store/user'

export const useAuthentication = () => {
  const userStore = useUserStore()
  const isUser = computed(() => userStore.isUser)
  const isAdmin = computed(() => userStore.isAdmin)
  const brgyAssignedId = computed(() => userStore.currentUser?.brgy_id || 0)
  const currentUserId = computed(() => userStore?.currentUserUuid || '')

  return {
    // fullName,
    // userMetaData,
    currentUserId,
    isAdmin,
    isUser,
    brgyAssignedId
  }
}