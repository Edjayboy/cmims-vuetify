<script setup lang="ts">
import { getItems } from '@/services/ItemsService';
import { addUserInventoryRequest, updateUserInventoryRequest } from '@/services/UsersService'
import { Item } from '@/types/item.interface';
import { UserInventoryRequest } from '@/types/user.type';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const dialog = ref<boolean>(false)
const isActionAdd = ref<boolean>(true)
const form = ref()
const isLoading = ref<boolean>(false)
const isLoadingItems = ref<boolean>(false)
const items = ref<Item[]>([])

const id = ref<number | null>()
const notes = ref<string>()
const quantity = ref<number | null>()
const requestedById = ref<string>()
const acknowledgedById = ref<string>()
const itemId = ref<number | null>()
const isRead = ref<boolean>(false)

const show = (item: UserInventoryRequest, addNewRow = true) => {
  if (!addNewRow) {
    id.value = item.id
    notes.value = item.notes
    quantity.value = item.quantity
    requestedById.value = item.requestedById
    acknowledgedById.value = item.acknowledgedById
    itemId.value = item.itemId
    isRead.value = item.isRead || false
  }

  dialog.value = true
  isActionAdd.value = addNewRow
}
defineExpose({ show })
const emit = defineEmits(['after-save'])

const title = computed(() => isActionAdd.value ? 'Add New Inventory Request' : 'Update/View Request Information')

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (!valid)
    return

  // saving item
  isLoading.value = true

  if (isActionAdd.value) {

    // make sure that quantity has value
    if (!quantity.value)
      return

    await addUserInventoryRequest({
      notes: notes.value,
      quantity: quantity.value,
      requestedById: '0afa17e0-eb56-4c3e-a534-5a76af70ff9a',
      itemId: itemId.value || 0,
    })
  } else {
    // make sure that id has value
    if (!id.value)
      return

    await updateUserInventoryRequest({
      acknowledgedById: 'f1114d77-5bea-4ebe-a786-b7c7b7a05ee2',
      isRead: isRead.value,
      id: id.value
    })
  }

  isLoading.value = false

  emit('after-save')

  closeDialog()
}

const resetFormValues = () => {
  id.value = null
  notes.value = ''
  quantity.value = 0
  requestedById.value = ''
  acknowledgedById.value = ''
  itemId.value = null
  isRead.value = false
}

const closeDialog = () => {
  resetFormValues()
  dialog.value = false
}

const fetchData = async () => {
  items.value = await getItems()
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <v-dialog v-model="dialog" persistent width="800">
    <v-card>
      <v-card-title class="pl-6 pt-5 pb-0 font-weight-black">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters>
            <v-checkbox v-if="!isActionAdd" v-model="isRead" label="Mark as read" color="success" :value="true"
              hide-details></v-checkbox>
            <v-col cols="12">
              <v-autocomplete label="* Select Item" :rules="[v => !!v || 'Item is required.']" required v-model="itemId"
                :items="items" :item-title="(item: Item) => `${item.name} - ${item.units}`" :disabled="isLoadingItems"
                :loading="isLoadingItems" item-value="id">
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field label="* Quantity Request" v-model="quantity" type="number"
                :rules="[v => !!v || 'Quantity is required.', v => (v > 0) || 'Quantity should be greater than zero']"
                required>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Notes (optional)" v-model="notes">
              </v-text-field>
            </v-col>
            <small class="mt-5">*indicates required field</small>
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