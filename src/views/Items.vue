<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { ref } from 'vue';
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
    expirationDate: '03/06/2023',
    dateManufactured: '03/06/2023',
    units: '10 mg',
    quantity: 100
  },
  {
    id: 2,
    name: 'Bioflu',
    description: 'Neozep® Non-Drowsy is for the relief of colds, without the drowse',
    brand: {
      id: 1,
      name: 'Unilab'
    },
    expirationDate: '03/06/2023',
    dateManufactured: '03/06/2023',
    units: '20 ml',
    quantity: 50
  },
]

const search = ref<string>('')
</script>

<template>
  <MainContent icon="medical_services">
    <template #title>Track Inventory Items</template>
    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="items" item-value="name" class="elevation-0"
      :search="search">
    </v-data-table>
  </MainContent>
</template>

