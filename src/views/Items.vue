<template>
  <MainContent icon="medical_services">
    <template #title>Manage Inventory Items</template>
    <TableList :headers="headers" :items="items" />
  </MainContent>
</template>

<script lang="ts" setup>
import TableList from '@/components/base/TableList.vue';
import { IItem } from '@/interfaces/item.interface';
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';

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

const items: IItem[] = [
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
    units: '10 mg',
    quantity: 100
  },
]

</script>
