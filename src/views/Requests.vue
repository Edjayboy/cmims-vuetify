<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { VDataTable } from 'vuetify/labs/VDataTable'
import { getUserInventoryRequests } from '@/services/UsersService';
import { UserInventoryRequest } from '@/types/user.type';
import { onMounted } from 'vue';
import { ref } from 'vue';
import UserInventoryRequestDialog from '@/components/dialogs/UserInventoryRequestDialog.vue'
import { useAuthentication } from '@/composables/useAuthentication';

const headers: ITableHeader[] = [
  {
    title: 'ID',
    align: 'start',
    key: 'id',
  },
  {
    title: 'Brgy',
    align: 'start',
    key: 'brgy.name',
  },
  {
    title: 'Item',
    align: 'start',
    key: 'item.name',
  },
  {
    title: 'Quantity Requested',
    align: 'center',
    key: 'quantity',
  },
  {
    title: 'Requested By',
    align: 'start',
    key: 'requestedBy.full_name',
  },
  {
    title: 'Acknowledged By',
    align: 'start',
    key: 'acknowledgedBy.full_name',
  },
  {
    title: '',
    key: 'action'
  }
]

const isLoading = ref<boolean>()
const search = ref<string>('')
const userInventoryRequests = ref<UserInventoryRequest[]>()
const userInventoryRequestDialog = ref()
const { isUser, brgyAssignedId } = useAuthentication()

const fetchData = async () => {
  isLoading.value = true
  userInventoryRequests.value = await getUserInventoryRequests({ brgyId: brgyAssignedId.value })
  isLoading.value = false
}
const showUserInventoryRequestDialog = (item: UserInventoryRequest, isActionAdd = true) => {
  userInventoryRequestDialog.value.show(item, isActionAdd)
}

onMounted(() => {
  fetchData()
})

</script>
<template>
  <MainContent icon="fact_check">
    <template #title>Manage Requests</template>
    <template #top-right>
      <v-btn v-if="isUser" color="info" variant="outlined" @click="showUserInventoryRequestDialog" prepend-icon="add">Add
        new
        request</v-btn>
    </template>
    <v-text-field v-model="search" append-inner-icon="search" label="Search" hide-details single-line></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="userInventoryRequests" item-value="name"
      class="elevation-0" :search="search">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{ item }">
        <v-btn icon="edit" flat size="small" @click="showUserInventoryRequestDialog(item.raw, false)"></v-btn>
      </template>
    </v-data-table>
  </MainContent>
  <UserInventoryRequestDialog ref="userInventoryRequestDialog" @after-save="fetchData" />
</template>
