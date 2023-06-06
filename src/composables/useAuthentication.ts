import { getUserSession } from "@/services/AuthenticationService"
import { onMounted, ref } from "vue"

export const useAuthentication = () => {
  const fullName = ref<string | undefined>()

  onMounted(async () => {
    const { data } = await getUserSession()

    fullName.value = data.session?.user.user_metadata.full_name
  })

  return {
    getUserSession,
    fullName
  }
}