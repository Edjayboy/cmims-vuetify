<script setup lang="ts">
import { addBrand } from '@/services/BrandsService';
import { ref } from 'vue';
const dialog = ref<boolean>(false)
const name = ref<string>('')
const isLoading = ref<boolean>(false)
const form = ref()

const show = () => {
  dialog.value = true
}
defineExpose({ show })
const emit = defineEmits(['after-save'])

const closeDialog = () => {
  dialog.value = false
  name.value = ''
}

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (!valid)
    return
  await addBrand({ name: name.value })
  closeDialog()
  emit('after-save')
}
</script>
<template>
  <v-dialog v-model="dialog" width="300" persistent>
    <v-card>
      <v-card-title class="pl-6 pt-5 pb-0 font-weight-black">
        <h3>New Brand</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field label="* Name" :rules="[v => !!v || 'Brand Name is required.']" required v-model="name">
              </v-text-field>
            </v-col>
          </v-row>
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