<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref<boolean>(false)
const emits = defineEmits(['confirm'])

interface Props {
  title?: string;
  message?: string;
  color?: string;
  confirmButtonLabel?: string;
  width: number;
}
withDefaults(defineProps<Props>(), {
  title: 'Proceed with caution',
  message: 'Are you sure?',
  color: 'primary',
  confirmButtonLabel: 'Confirm',
  width: 300
})

const show = () => {
  dialog.value = true
}
const close = () => {
  dialog.value = false
}
defineExpose({ show, close })

const confirm = () => {
  emits('confirm')
}
</script>
<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" :width="width">
    <v-card>
      <v-toolbar :color="color" :title="title" class="text-center"></v-toolbar>
      <v-card-text>
        <div class="text-h6 mt-5 mb-10 text-center">
          <slot name="message">
            {{ message }}
          </slot>
        </div>
        <div class="text-center">
          <v-btn variant="text" @click="close">Cancel</v-btn>
          <v-btn :color="color" @click="confirm">{{ confirmButtonLabel }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>