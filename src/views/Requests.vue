<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { VDataTable } from 'vuetify/labs/VDataTable'
import { getUserInventoryRequests } from '@/services/UsersService';
import { UserInventoryRequest } from '@/types/user.type';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';
import UserInventoryRequestDialog from '@/components/dialogs/UserInventoryRequestDialog.vue'
import { useAuthentication } from '@/composables/useAuthentication';

const defaultHeaders: ITableHeader[] = [
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
interface Props {
  title?: string
  customHeaders?: ITableHeader[],
  hidePagination?: boolean,
  hideSearch?: boolean,
  showLatestOnly?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: 'Manage Requests',
  customHeaders: () => [],
  hidePagination: false,
  hideSearch: false,
  showLatestOnly: false
})

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

const headers = computed(() => {
  if (props.customHeaders.length > 0)
    return props.customHeaders

  return defaultHeaders
})

onMounted(() => {
  fetchData()
})

</script>
<template>
  <MainContent icon="fact_check">
    <template #title>{{ title }}</template>
    <template #top-right>
      <slot name="top-right">
        <v-btn v-if="isUser" color="info" variant="outlined" @click="showUserInventoryRequestDialog" prepend-icon="add">
          Add new request
        </v-btn>
      </slot>
    </template>
    <v-text-field v-if="!hideSearch" v-model="search" append-inner-icon="search" label="Search" hide-details
      single-line></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="userInventoryRequests" item-value="name"
      class="elevation-0" :search="search">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{ item }">
        <v-btn icon="edit" flat size="small" @click="showUserInventoryRequestDialog(item.raw, false)"></v-btn>
      </template>
      <template v-if="hidePagination" #bottom></template>
    </v-data-table>
  </MainContent>
  <UserInventoryRequestDialog ref="userInventoryRequestDialog" @after-save="fetchData" />
</template>
