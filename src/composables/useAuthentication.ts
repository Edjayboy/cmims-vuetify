import { ROLE } from "@/constants/authentication"
import { getUserSession } from "@/services/AuthenticationService"
import { onMounted, ref } from "vue"

export const useAuthentication = () => {
  const fullName = ref<string | undefined>()
  const userMetaData = ref()
  const isAdmin = ref<boolean>()
  const isUser = ref<boolean>()

  onMounted(async () => {
    const { data } = await getUserSession()

    fullName.value = data.session?.user.user_metadata.full_name
    userMetaData.value = data.session?.user.user_metadata
    isAdmin.value = data.session?.user?.user_metadata?.role == ROLE.ADMIN
    isUser.value = data.session?.user?.user_metadata?.role == ROLE.USER
  })

  return {
    getUserSession,
    fullName,
    userMetaData,
    isAdmin,
    isUser
  }
}