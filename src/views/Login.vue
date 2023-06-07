<script setup lang="ts">
import { signInWithEmail } from '@/services/AuthenticationService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')
const form = ref()
const router = useRouter()
const isLoading = ref<boolean>(false)

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid)
    return

  isLoading.value = true
  const { error } = await signInWithEmail(email.value, password.value)
  isLoading.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  router.push({
    name: 'Dashboard'
  })
}

</script>
<template>
  <v-sheet max-width="400" class="mx-auto" style="margin-top: 10%;">
    <v-card class="elevation-1">
      <v-toolbar dark color="primary">
        <v-toolbar-title class="text-h6">CMIMS</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-alert v-if="errorMessage" color="error" variant="tonal" :text="errorMessage" class="mb-5"></v-alert>
        <v-form ref="form">
          <v-text-field v-model="email" label="Email" :rules="[v => !!v || 'Email Address is required.']"
            required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" :rules="[v => !!v || 'Password is required.']"
            required></v-text-field>
        </v-form>
        <v-btn color="primary" size="large" block @click="handleSubmit" :loading="isLoading" :disabled="isLoading">
          Sign In
        </v-btn>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>