<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import { addUser, updateUser } from '@/services/UsersService'
import { UserProfileUpdateDto, UserAuthentication } from '@/types/user.type';
import { Brgy } from '@/types/brgy.type';
import { getBrgys } from '@/services/BrgyService'
import { onMounted } from 'vue';

const dialog = ref<boolean>(false)
const isActionAdd = ref<boolean>(true)
const form = ref()

const fullName = ref<string | undefined>('')
const role = ref<string | undefined>('')
const email = ref<string>('')
const password = ref<string>('')
const phoneNumber = ref<string>('')
const brgyId = ref<number>()
const userId = ref<string>('')
const isLoading = ref<boolean>(false)
const brgys = ref<Brgy[]>([])

const show = (item: UserProfileUpdateDto, addNewRow = true) => {
  if (!addNewRow) {
    fullName.value = item.full_name
    role.value = item.role
    email.value = item.email
    phoneNumber.value = item?.phone_number || ''
    userId.value = item.user_id || ''
    brgyId.value = item.brgy_id
  }

  dialog.value = true
  isActionAdd.value = addNewRow
}
defineExpose({ show })
const emit = defineEmits(['after-save'])

const title = computed(() => isActionAdd.value ? 'Add New User' : 'Update User Profile')
const passwordHint = computed(() => isActionAdd.value ? '' : 'Fill up this field to update password')
const alertInfoText = computed(() => isActionAdd.value ? 'Once you register an email, you cannot update it.' : 'If you wish to update email, Please contact the developers')

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (!valid)
    return

  // saving user
  isLoading.value = true

  const userData: UserProfileUpdateDto & UserAuthentication = {
    full_name: fullName.value,
    role: role.value,
    email: email.value,
    password: password.value,
    phone_number: phoneNumber.value,
    brgy_id: brgyId.value,
  }

  if (isActionAdd.value) {
    await addUser(userData)
  } else {
    userData.user_id = userId.value,
      await updateUser(userData)
  }

  isLoading.value = false

  emit('after-save')

  closeDialog()
}

const resetFormValues = () => {
  fullName.value = ''
  role.value = 'user'
  email.value = ''
  phoneNumber.value = ''
  password.value = ''
  brgyId.value = 0
}

const closeDialog = () => {
  resetFormValues()
  dialog.value = false
}

onMounted(async () => {
  brgys.value = await getBrgys()
})
</script>

<template>
  <v-dialog v-model="dialog" persistent width="700">
    <v-card>
      <v-card-title class="pl-6 pt-5 pb-0 font-weight-black">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <v-alert type="info" variant="tonal" :text="alertInfoText" class="mb-5"></v-alert>
        <v-form ref="form">
          <v-text-field label="* Full Name" :rules="[v => !!v || 'Full Name is required.']" required v-model="fullName">
          </v-text-field>
          <v-text-field label="Phone Number (optional)" v-model="phoneNumber" type="number"></v-text-field>
          <v-select label="* Select Role" :items="['user', 'admin']" v-model="role" required
            :rules="[v => !!v || 'Role is required.']"></v-select>
          <v-autocomplete label="* Select Assigned Barangay" :items="brgys" v-model="brgyId" item-title="name"
            item-value="id" required :rules="[v => !!v || 'Assign Barangay is required.']"></v-autocomplete>
          <v-text-field v-if="isActionAdd" label="* Email Address" type="email"
            :rules="[v => !!v || 'Email is required.']" required v-model="email" persistent-hint></v-text-field>
          <v-text-field label="* Password" type="password" :rules="[v => !isActionAdd || !!v || 'Password is required.']"
            :hint="passwordHint" v-model="password"></v-text-field>
          <small>*indicates required field</small>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog" :disabled="isLoading">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="handleSubmit" :disabled="isLoading">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>