<template>
  <MainContent icon="manage_accounts">
    <template #title>Manage Users</template>
    <TableList :headers="headers" :items="users" />
  </MainContent>
</template>

<script lang="ts" setup>
import TableList from '@/components/base/TableList.vue';
import { ITableHeader } from '@/interfaces/theme/table.interface';
import { IUser } from '@/interfaces/user.interface';
import MainContent from '@/layouts/MainContent.vue';
import { ref } from 'vue';

const headers = ref<ITableHeader[]>([
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'brgy.name',
    title: 'Assigned Barangay',
  },
  {
    key: 'userType',
    title: 'User Type',
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'phoneNumber',
    title: 'Phone Number',
  },
])
const users = ref<IUser[]>([
  {
    name: 'Edjay Boy Solis',
    email: 'edjayboy@gmail.com',
    phoneNumber: 1234567,
    userType: 'admin'
  },
  {
    name: 'Brandon Perez',
    email: 'brandonperez@gmail.com',
    brgy: {
      id: 1,
      name: 'Calumpang'
    },
    phoneNumber: 1234567,
    userType: 'user'
  },
  {
    name: 'Allen Lee',
    email: 'allenlee@gmail.com',
    brgy: {
      id: 1,
      name: 'Lagao'
    },
    phoneNumber: 1234567,
    userType: 'user'
  }
])
</script>
