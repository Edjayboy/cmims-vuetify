<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { Item } from '@/types/item.interface';
import { ref } from 'vue';
import ItemDialog from '@/components/dialogs/ItemDialog.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers: ITableHeader[] = [
  {
    title: 'Item Name',
    align: 'start',
    key: 'name',
    fixed: false
  },
  {
    title: 'Brand',
    align: 'start',
    key: 'brand.name'
  },
  {
    title: 'Expiration Date',
    align: 'start',
    key: 'expirationDate'
  },
  {
    title: 'Date Manufactured',
    align: 'start',
    key: 'dateManufactured'
  },
  {
    title: 'Units',
    align: 'start',
    key: 'units'
  },
  {
    title: 'Quantity',
    align: 'center',
    key: 'quantity'
  },
  {
    title: '',
    align: 'center',
    key: 'action'
  }
]

const items = [
  {
    id: 1,
    name: 'Neozep',
    description: 'Neozep® Non-Drowsy is for the relief of colds, without the drowse',
    brand: {
      id: 1,
      name: 'Unilab'
    },
    expirationDate: '02/06/2023',
    dateManufactured: '02/06/2023',
    units: '10 mg',
    quantity: 100
  },
  {
    id: 2,
    name: 'Bioflu',
    description: 'Neozep® Non-Drowsy is for the relief of colds, without the drowse',
    brand: {
      id: 2,
      name: 'Pfizer'
    },
    expirationDate: '07/06/2023',
    dateManufactured: '07/06/2023',
    units: '20 ml',
    quantity: 50
  },
]

const search = ref<string>('')
const itemDialog = ref()


const showItemDialog = (item: Item, isActionAdd = true) => {
  itemDialog.value.show(item, isActionAdd)
}

const fetchData = async () => {

}
</script>

<template>
  <MainContent icon="medical_services">
    <template #title>Track Inventory Items</template>
    <template #top-right>
      <v-btn color="info" variant="outlined" @click="showItemDialog" prepend-icon="add">Add new item</v-btn>
    </template>
    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="items" item-value="name" class="elevation-0"
      :search="search">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{ item }">
        <v-btn icon="edit" flat size="small" @click="showItemDialog(item.raw, false)"></v-btn>
      </template>
    </v-data-table>
  </MainContent>
  <ItemDialog ref="itemDialog" @after-save="fetchData" />
</template>

