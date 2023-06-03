<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ref } from 'vue';
import { ITableHeader } from '@/interfaces/theme/table.interface';

interface Props {
  headers: ITableHeader[],
  items: Array<Object>
}

defineProps<Props>()

const search = ref<string>('')
</script>
<template>
  <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
  <br />
  <v-data-table density="comfortable" :headers="headers" :items="items" item-value="name" class="elevation-0"
    :search="search">
    
  </v-data-table>
</template>

<style>
.v-table>.v-table__wrapper>table>thead>tr>th {
  font-weight: 900;
  color: #444141;
}
</style>