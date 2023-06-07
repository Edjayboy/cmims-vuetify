<script lang="ts" setup>
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { Item } from '@/types/item.interface';
import { ref, onMounted } from 'vue';
import ItemDialog from '@/components/dialogs/ItemDialog.vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { deleteItem, getItems } from '@/services/ItemsService';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog.vue'
import DateFormat from '@/components/DateFormat.vue';
import { useUserStore } from '@/store/user';
import { useAuthentication } from '@/composables/useAuthentication';
import { computed } from 'vue';

const { isAdmin, isUser } = useAuthentication()

const userHeaders: ITableHeader[] = [
  {
    title: 'Item Name',
    align: 'start',
    key: 'name',
    fixed: false
  },
  {
    title: 'Brand',
    align: 'start',
    key: 'brands.name'
  },
  {
    title: 'Date Manufactured',
    align: 'start',
    key: 'dateManufactured'
  },
  {
    title: 'Expiration Date',
    align: 'start',
    key: 'expirationDate'
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

const adminHeaders: ITableHeader[] = [
  {
    title: 'Brgy',
    align: 'start',
    key: 'brgy.name',
    fixed: false
  },
  {
    title: 'Item Name',
    align: 'start',
    key: 'name',
    fixed: false
  },
  {
    title: 'Brand',
    align: 'start',
    key: 'brands.name'
  },
  {
    title: 'Date Manufactured',
    align: 'start',
    key: 'dateManufactured'
  },
  {
    title: 'Expiration Date',
    align: 'start',
    key: 'expirationDate'
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

const items = ref<Item[]>([])
const isLoading = ref<boolean>(false)

const search = ref<string>('')
const itemDialog = ref()
const confirmDialogDelete = ref()
const userStore = useUserStore()

const showItemDialog = (item: Item, isActionAdd = true, viewMode = false) => {
  itemDialog.value.show(item, isActionAdd, viewMode)
}

const fetchData = async () => {
  isLoading.value = true
  items.value = await getItems({
    brgyId: userStore?._currentUser?.brgy_id
  })
  isLoading.value = false
}

const proceedDelete = async (item: Item) => {
  await deleteItem(item.id)
  confirmDialogDelete.value.close()
  fetchData()
}

const headers = computed(() => isAdmin.value ? adminHeaders : userHeaders)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <MainContent icon="medical_services">
    <template #title>Track Inventory Items</template>
    <template #top-right>
      <v-btn v-if="isUser" color="info" variant="outlined" @click="showItemDialog" prepend-icon="add">Add new item</v-btn>
    </template>
    <v-text-field v-model="search" append-inner-icon="search" label="Search" hide-details></v-text-field>
    <br />
    <v-data-table density="comfortable" :headers="headers" :items="items" item-value="name" class="elevation-0"
      :search="search">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.dateManufactured="{ item }">
        <DateFormat :date="item.raw.dateManufactured" />
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.expirationDate="{ item }">
        <DateFormat :date="item.raw.expirationDate" />
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.action="{ item }">
        <v-btn v-if="isAdmin" icon="settings" flat size="small" @click="showItemDialog(item.raw, false, true)"></v-btn>
        <div v-if="isUser">
          <v-btn icon="edit" flat size="small" @click="showItemDialog(item.raw, false)"></v-btn>
          <v-btn color="red" variant="text" icon="delete" flat size="small" @click="confirmDialogDelete.show()"></v-btn>
          <ConfirmationDialog ref="confirmDialogDelete" color="red-darken-4"
            :message="`Are you sure you want to delete item?`" :width="400" @confirm="proceedDelete(item.raw)" />
        </div>
      </template>
    </v-data-table>
  </MainContent>
  <ItemDialog ref="itemDialog" @after-save="fetchData" />
</template>

