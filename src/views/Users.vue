<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable'
import UserDialog from '@/components/dialogs/UserDialog.vue'
import { deleteUser, getUsers } from '@/services/UsersService';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog.vue';
import { UserProfile } from '@/types/user.type';
import { useAuthentication } from '@/composables/useAuthentication'

const { currentUserId } = useAuthentication()
const headers = ref<ITableHeader[]>([
  {
    key: 'full_name',
    title: 'Full Name',
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
    key: 'phone_number',
    title: 'Phone Number',
  },
  {
    key: 'action',
    title: '',
  }
])
const users = ref<UserProfile[]>([])
const isLoading = ref<boolean>(false)

const search = ref<string>('')
const userDialog = ref()
const confirmDialogDelete = ref()

const showUserDialog = (item: UserProfile, isActionAdd = true) => {
  userDialog.value.show(item, isActionAdd)
}

const fetchData = async () => {
  isLoading.value = true
  users.value = await getUsers()
  isLoading.value = false
}

const proceedDelete = async (item: UserProfile) => {
  await deleteUser(item.user_id || '')
  confirmDialogDelete.value.close()
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <MainContent icon="manage_accounts">
    <template #title>Manage Users</template>
    <template #top-right>
      <v-btn color="info" variant="outlined" @click="showUserDialog" prepend-icon="add">Add new user</v-btn>
    </template>
    <v-text-field v-model="search" append-inner-icon="search" label="Search" hide-details></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="users" item-value="name" class="elevation-0"
      :search="search" :loading="isLoading">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.brgy="{ item }">
        {{ item.columns.brgy?.name || '-' }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{ item }">
        <v-btn icon="edit" flat size="small" @click="showUserDialog(item.raw, false)"></v-btn>

        <span v-if="currentUserId != item.raw.user_id">
          <v-btn color="red" variant="text" icon="delete" flat size="small"
            @click="confirmDialogDelete.show(item.raw)"></v-btn>
          <ConfirmationDialog ref="confirmDialogDelete" color="red-darken-4"
            :message="`Are you sure you want to delete user?`" :width="400" @confirm="proceedDelete" />
        </span>
      </template>
    </v-data-table>
  </MainContent>
  <UserDialog ref="userDialog" @after-save="fetchData" />
</template>
