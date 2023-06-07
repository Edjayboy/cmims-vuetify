<script setup lang="ts">
import { getItems } from '@/services/ItemsService';
import { addUserInventoryRequest, updateUserInventoryRequest } from '@/services/UsersService'
import { Item, ItemWithBrand } from '@/types/item.interface';
import { UserInventoryRequest } from '@/types/user.type';
import { onMounted, ref, computed } from 'vue';
import { useAuthentication } from '@/composables/useAuthentication'

const dialog = ref<boolean>(false)
const isActionAdd = ref<boolean>(true)
const form = ref()
const isLoading = ref<boolean>(false)
const isLoadingItems = ref<boolean>(false)
const items = ref<Item[]>([])
const { isAdmin, currentUserId, brgyAssignedId } = useAuthentication()

const id = ref<number | null>()
const notes = ref<string>()
const quantity = ref<number | null>()
const requestedById = ref<string>()
const acknowledgedById = ref<string>()
const itemId = ref<number | null>()
const isRead = ref<boolean>(false)
const selectedItem = ref<ItemWithBrand>()

const show = (item: UserInventoryRequest, addNewRow = true) => {
  if (!addNewRow) {
    id.value = item.id
    notes.value = item.notes
    quantity.value = item.quantity
    requestedById.value = item.requestedById
    acknowledgedById.value = item.acknowledgedById
    itemId.value = item.itemId
    isRead.value = item.isRead || false
    selectedItem.value = item.item
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
      requestedById: currentUserId.value,
      itemId: itemId.value || 0,
    })
  } else {
    // make sure that id has value
    if (!id.value)
      return

    await updateUserInventoryRequest({
      acknowledgedById: currentUserId.value,
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
  items.value = await getItems({
    brgyId: brgyAssignedId.value
  })
}

const selectItemLabel = computed(() => isAdmin.value ? 'Item Requested' : '* Select Item')
const quantityLabel = computed(() => isAdmin.value ? 'Quantity Requested' : '* Quantity')

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
            <v-checkbox v-if="!isActionAdd && isAdmin" v-model="isRead" label="Mark as read" color="success" :value="true"
              hide-details></v-checkbox>
            <v-col cols="12">
              <div v-if="isAdmin" class="mb-5">
                <v-row>
                  <v-col>
                    <label>Item: </label>
                    <p class="pa-3 view-mode-value">
                      {{ selectedItem?.name }} - {{ selectedItem?.units }}
                    </p>
                  </v-col>
                  <v-col>
                    <label>Brand: </label>
                    <p class="pa-3 view-mode-value">
                      {{ selectedItem?.brand.name }}
                    </p>
                  </v-col>
                </v-row>
              </div>
              <v-autocomplete v-else :label="selectItemLabel" :rules="[v => !!v || 'Item is required.']" required
                v-model="itemId" :items="items" :item-title="(item: Item) => `${item.name} - ${item.units}`"
                :disabled="isLoadingItems" :loading="isLoadingItems" item-value="id" :readonly="isAdmin">
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <div v-if="isAdmin" class="mb-5">
                <label>Quantity: </label>
                <p class="pa-3 view-mode-value">
                  {{ quantity }}
                </p>
              </div>
              <v-text-field v-else :label="quantityLabel" v-model="quantity" type="number"
                :rules="[v => !!v || 'Quantity is required.', v => (v > 0) || 'Quantity should be greater than zero']"
                required :readonly="isAdmin">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <div v-if="isAdmin" class="mb-5">
                <label>Notes: </label>
                <p class="pa-3 view-mode-value">
                  {{ notes }}
                </p>
              </div>
              <v-text-field v-else label="Notes (optional)" v-model="notes" :readonly="isAdmin">
              </v-text-field>
            </v-col>
            <small v-if="!isAdmin" class="mt-5">*indicates required field</small>
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
<style scoped>
.view-mode-value {
  border: 1px solid #e3e3e3;
  min-height: 50px;
}
</style>