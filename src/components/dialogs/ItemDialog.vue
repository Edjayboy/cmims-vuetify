<script setup lang="ts">
import { Item, ItemAdd } from '@/types/item.interface';
import { computed } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
// import Datepicker from 'vuejs3-datepicker';
import { Brand } from '@/types/brand.interface';
import { getBrands } from '@/services/BrandsService';
import BrandDialog from './BrandDialog.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { addItem, updateItem } from '@/services/ItemsService';

const dialog = ref<boolean>(false)
const isActionAdd = ref<boolean>(true)
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

const show = (item: Item, addNewRow = true) => {
  if (!addNewRow) {
    id.value = item.id
    name.value = item.name || ''
    description.value = item.description || ''
    expirationDate.value = item.expirationDate || ''
    dateManufactured.value = item.dateManufactured || ''
    units.value = item.units || ''
    quantity.value = item.quantity || 0
    brandId.value = item.brandId || null
  }

  dialog.value = true
  isActionAdd.value = addNewRow
}
defineExpose({ show })
const emit = defineEmits(['after-save'])

const title = computed(() => isActionAdd.value ? 'Add New Item' : 'Update Item Information')

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
  <v-dialog v-model="dialog" persistent width="800">
    <v-card>
      <v-card-title class="pl-6 pt-5 pb-0 font-weight-black">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field label="* Name" :rules="[v => !!v || 'Name is required.']" required v-model="name">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Description (optional)" required v-model="description">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pr-3">
              <v-text-field label="* Quantity" :rules="[v => !!v || 'Quantity is required.']" required type="number"
                v-model="quantity">
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pl-3">
              <v-text-field class="mb-3" label="* Units" :rules="[v => !!v || 'Units is required.']" required
                v-model="units" hint="e.g 10mg" persistent-hint>
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pr-3">
              <!-- <CustomDatePicker label="Manufactured Date" v-model="dateManufactured" /> -->
              <label>Manufactured Date:</label>
              <VueDatePicker v-model="dateManufactured" placeholder="Select Manufactured Date"
                :enable-time-picker="false"></VueDatePicker>
            </v-col>
            <v-col cols="6" class="pl-3">
              <label>Expiration Date:</label>
              <VueDatePicker v-model="expirationDate" placeholder="Select Expiration Date" :enable-time-picker="false">
              </VueDatePicker>
            </v-col>
            <v-col cols="12" class="mt-5">
              <v-row>
                <v-col>
                  <v-autocomplete label="Select Brand" :rules="[v => !!v || 'Brand is required.']" required v-model="brandId" :items="brands" item-title="name"
                    :disabled="isLoadingBrands" :loading="isLoadingBrands" item-value="id">
                    <template v-slot:append>
                      <v-slide-x-reverse-transition mode="out-in">
                        <v-icon color="primary" icon="add" @click="brandDialog.show()"></v-icon>
                      </v-slide-x-reverse-transition>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
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
</style>