<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import { IUser } from '@/interfaces/user.interface';
import MainContent from '@/layouts/MainContent.vue';
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref<ITableHeader[]>([
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'role',
    title: 'Role',
  },
  {
    key: 'brgy',
    title: 'Assigned Barangay',
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'phoneNumber',
    title: 'Phone Number',
  },
  {
    key: 'action',
    title: '',
  }
])
const users = ref<IUser[]>([
  {
    name: 'Edjay Boy Solis',
    email: 'edjayboy@gmail.com',
    phoneNumber: 1234567,
    role: 'admin'
  },
  {
    name: 'Brandon Perez',
    email: 'brandonperez@gmail.com',
    brgy: {
      id: 1,
      name: 'Calumpang'
    },
    phoneNumber: 1234567,
    role: 'user'
  },
  {
    name: 'Allen Lee',
    email: 'allenlee@gmail.com',
    brgy: {
      id: 1,
      name: 'Lagao'
    },
    phoneNumber: 1234567,
    role: 'user'
  }
])

const search = ref<string>('')
</script>
<template>
  <MainContent icon="manage_accounts">
    <template #title>Manage Users</template>
    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="users" item-value="name" class="elevation-0"
      :search="search">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.brgy="{ item }">
        {{ item.columns.brgy?.name || '-' }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{}">
        <v-btn icon="edit" flat size="small"></v-btn>
      </template>
    </v-data-table>
  </MainContent>
</template>
