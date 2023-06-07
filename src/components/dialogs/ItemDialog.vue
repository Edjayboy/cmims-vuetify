<script setup lang="ts">
import { Item } from '@/types/item.interface';
import { computed } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { Brand } from '@/types/brand.interface';
import { getBrands } from '@/services/BrandsService';
import BrandDialog from './BrandDialog.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { addItem, updateItem } from '@/services/ItemsService';
import DateFormat from '../DateFormat.vue';
import { useAuthentication } from '@/composables/useAuthentication'

const dialog = ref<boolean>(false)
const isActionAdd = ref<boolean>(true)
const isViewMode = ref<boolean>(false)
const form = ref()
const isLoading = ref<boolean>(false)
const isLoadingBrands = ref<boolean>(false)
const brandDialog = ref()

const id = ref<number>()
const name = ref<string>('')
const description = ref<string>('')
const brandId = ref<number | null>()
const expirationDate = ref<string>('')
const dateManufactured = ref<string>('')
const units = ref<string>('')
const quantity = ref<number | null>()
const brands = ref<Brand[]>([])
const brandName = ref<string>('')
const { brgyAssignedId } = useAuthentication()

const show = (item: Item, addNewRow = true, viewMode = false) => {
  if (!addNewRow) {
    id.value = item.id
    name.value = item.name || ''
    description.value = item.description || ''
    expirationDate.value = item.expirationDate || ''
    dateManufactured.value = item.dateManufactured || ''
    units.value = item.units || ''
    quantity.value = item.quantity || 0
    brandId.value = item.brandId || null

    if (viewMode) {
      const brand = brands.value.find(brand => brand.id == item.brandId) || { name: '' }
      brandName.value = brand.name
    }
  }

  dialog.value = true
  isActionAdd.value = addNewRow
  isViewMode.value = viewMode
}
defineExpose({ show })
const emit = defineEmits(['after-save'])

const title = computed(() => {
  if (isViewMode.value)
    return 'View Item Information'

  return isActionAdd.value ? 'Add New Item' : 'Update Item Information'
})

const closeBtnLabel = computed(() => isViewMode.value ? 'Close' : 'Cancel')

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (!valid)
    return

  // saving item
  isLoading.value = true

  const itemData: Partial<Item> = {
    name: name.value,
    description: description.value,
    brandId: brandId.value || 0,
    expirationDate: expirationDate.value,
    dateManufactured: dateManufactured.value,
    units: units.value,
    quantity: quantity.value || 0
  }

  if (isActionAdd.value) {
    itemData.brgyId = brgyAssignedId.value
    await addItem(itemData)
  } else {
    itemData.id = id.value
    await updateItem(itemData)
  }

  isLoading.value = false

  emit('after-save')

  closeDialog()
}

const resetFormValues = () => {
  id.value = 0
  name.value = ''
  description.value = ''
  brandId.value = null
  expirationDate.value = ''
  dateManufactured.value = ''
  units.value = ''
  quantity.value = null
  brandName.value = ''
}

const closeDialog = () => {
  resetFormValues()
  dialog.value = false
}

const fetchBrands = async () => {
  isLoadingBrands.value = true
  brands.value = await getBrands()
  isLoadingBrands.value = false
}

onMounted(() => {
  fetchBrands()
})
</script>

<template>
  <v-dialog v-model="dialog" :persistent="!isViewMode" width="800" fullscreen>
    <v-card>
      <v-card-title class="pl-6 pt-5 pb-0 font-weight-black">
        <h3 class="float-left">{{ title }}</h3>
        <v-chip class="float-right" color="warning" variant="outlined" label text-color="white" v-if="isViewMode">
          <v-icon start icon="visibility"></v-icon> View only
        </v-chip>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field label="* Name" :rules="[v => !!v || 'Name is required.']" required v-model="name"
                :readonly="isViewMode">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Description (optional)" required v-model="description" :readonly="isViewMode">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pr-3">
              <v-text-field label="* Quantity" :rules="[v => !!v || 'Quantity is required.']" required type="number"
                v-model="quantity" :readonly="isViewMode">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pl-3">
              <v-text-field class="mb-3" label="* Units" :rules="[v => !!v || 'Units is required.']" required
                v-model="units" hint="e.g 10mg" persistent-hint :readonly="isViewMode">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pr-3">
              <label>Manufactured Date:</label>
              <p v-if="isViewMode" class="pa-3 view-mode-value">
                <DateFormat :date="dateManufactured" />
              </p>
              <VueDatePicker v-else v-model="dateManufactured" placeholder="Select Manufactured Date"
                :enable-time-picker="false"></VueDatePicker>

            </v-col>
            <v-col cols="6" class="pl-3">
              <label>Expiration Date:</label>
              <p v-if="isViewMode" class="pa-3 view-mode-value">
                <DateFormat :date="expirationDate" />
              </p>
              <VueDatePicker v-else v-model="expirationDate" placeholder="Select Expiration Date"
                :enable-time-picker="false">
              </VueDatePicker>
            </v-col>
            <v-col cols="12" class="mt-5">
              <div v-if="isViewMode">
                <label>Brand: </label>
                <p class="pa-3 view-mode-value">
                  {{ brandName }}
                </p>
              </div>
              <v-autocomplete v-else label="Select Brand" :rules="[v => !!v || 'Brand is required.']" required
                v-model="brandId" :items="brands" item-title="name" :disabled="isLoadingBrands" :loading="isLoadingBrands"
                item-value="id">
                <template v-slot:append v-if="!isViewMode">
                  <v-slide-x-reverse-transition mode="out-in">
                    <v-icon color="primary" icon="add" @click="brandDialog.show()"></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-autocomplete>
            </v-col>
            <small class="mt-5">*indicates required field</small>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog" :disabled="isLoading">
          {{ closeBtnLabel }}
        </v-btn>
        <v-btn v-if="!isViewMode" color="primary" @click="handleSubmit" :disabled="isLoading">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <BrandDialog ref="brandDialog" @after-save="fetchBrands" />
</template>
<style>
.dp__action_button {
  font-size: 12px;
}

label {
  display: block;
  color: #858585;
  font-size: 13px;
}

.view-mode-value {
  border: 1px solid #e3e3e3;
}
</style>