<script setup lang="ts">
import { IUser } from '@/interfaces/user.interface';
import { computed } from 'vue';
import { ref } from 'vue';

const dialog = ref<boolean>(false)
const isActionAdd = ref<boolean>(true)
const form = ref()

const id = ref<number | string>('')
const name = ref<string>('')
const role = ref<string>('user')
const email = ref<string>('')
const password = ref<string>('')
const phoneNumber = ref<string | number>('')

const show = (item?: IUser, addNewRow = true) => {
  id.value = item?.id || ''
  name.value = item?.name || ''
  role.value = item?.role || ''
  email.value = item?.email || ''
  phoneNumber.value = item?.phoneNumber || ''

  dialog.value = true
  isActionAdd.value = addNewRow
}
defineExpose({ show })

const title = computed(() => isActionAdd.value ? 'Add New User' : 'Update User Profile')
const passwordHint = computed(() => isActionAdd.value ? '' : 'Fill up this field to update password')

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (!valid)
    return

  // saving user
  closeDialog()
}

const resetFormValues = () => {
  name.value = ''
  role.value = ''
  email.value = ''
  phoneNumber.value = ''
  password.value = ''
}

const closeDialog = () => {
  resetFormValues()
  dialog.value = false
}
</script>

<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card>
      <v-card-title class="py-5 font-weight-black">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="* Full Name" :rules="[v => !!v || 'Name is required.']" required v-model="name">
          </v-text-field>
          <v-text-field label="Phone Number (optional)" v-model="phoneNumber" type="number" ></v-text-field>
          <v-select label="* Select Role" :items="['user', 'admin']" v-model="role" required :rules="[v => !!v || 'Role is required.']"></v-select>
          <v-text-field label="* Email Address" type="email" :rules="[v => !!v || 'Email is required.']" required
            v-model="email"></v-text-field>
          <v-text-field label="* Password" type="password" :rules="[v => !isActionAdd || !!v || 'Password is required.']"
            :hint="passwordHint" v-model="password"></v-text-field>
          <small>*indicates required field</small>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="handleSubmit">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>