<script setup lang="ts">
import { computed, ref } from 'vue';

const dialog = ref<boolean>(false)
const data = ref<any>()

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

const show = (passData?: any) => {
  dialog.value = true
  data.value = passData
}
const close = () => {
  dialog.value = false
}
defineExpose({ show, close })

const emits = defineEmits(['confirm'])
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
          <v-btn :color="color" @click="emits('confirm', data)">{{ confirmButtonLabel }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>