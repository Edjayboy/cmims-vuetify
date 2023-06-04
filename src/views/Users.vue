<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import { IUser } from '@/interfaces/user.interface';
import MainContent from '@/layouts/MainContent.vue';
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable'
import UserDialog from '@/components/dialogs/UserDialog.vue'

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
    id: 1,
    name: 'Edjay Boy Solis',
    email: 'edjayboy@gmail.com',
    phoneNumber: 1234567,
    role: 'admin'
  },
  {
    id: 2,
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
    id: 3,
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
const userDialog = ref()

const showUserDialog = (item: unknown, isActionAdd = true) => {
  userDialog.value.show(item, isActionAdd)
}
</script>
<template>
  <MainContent icon="manage_accounts">
    <template #title>Manage Users</template>
    <template #top-right>
      <v-btn color="info" variant="outlined" @click="showUserDialog" prepend-icon="add">Add new user</v-btn>
    </template>
    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="users" item-value="name" class="elevation-0"
      :search="search">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.brgy="{ item }">
        {{ item.columns.brgy?.name || '-' }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{ item }">
        <v-btn icon="edit" flat size="small" @click="showUserDialog(item.columns, false)"></v-btn>
      </template>
    </v-data-table>
  </MainContent>
  <UserDialog ref="userDialog" />
</template>
