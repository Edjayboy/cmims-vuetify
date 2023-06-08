<script lang="ts" setup>
import { useAuthentication } from '@/composables/useAuthentication';
import { ITableHeader } from '@/interfaces/theme/table.interface';
import MainContent from '@/layouts/MainContent.vue';
import { getTotalItems } from '@/services/ItemsService';
import Items from '@/views/Items.vue'
import { onMounted, ref } from 'vue';

const userLatestAddedHeader: ITableHeader[] = [
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

const { brgyAssignedId } = useAuthentication()
const totalQuantity = ref<number>(0)
const totalItems = ref<number>(0)
const expiredItems = ref<number>(0)

onMounted(async () => {
  const { total_items, total_quantity, expired_items } = await getTotalItems({
    brgyId: brgyAssignedId.value
  })
  totalQuantity.value = total_quantity
  totalItems.value = total_items
  expiredItems.value = expired_items
})
</script>
<template>
  <MainContent icon="dashboard">
    <template #title>Dashboard</template>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text class="pa-a5">
            <div class="d-flex align-center">
              <v-icon icon="medication" size="50" class="align-self-center mx-3" color="success"></v-icon>
              <div class="ml-4 mr-1">
                <h4 class="text-subtitle-1">Total Items</h4>
                <h2 class="text-h5">{{ totalItems }}</h2>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text class="pa-a5">
            <div class="d-flex align-center">
              <v-icon icon="medical_information" size="50" class="align-self-center mx-3" color="info"></v-icon>
              <div class="ml-4 mr-1">
                <h4 class="text-subtitle-1">Total Quantity</h4>
                <h2 class="text-h5">{{ totalQuantity }} pcs</h2>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text class="pa-a5">
            <div class="d-flex align-center">
              <v-icon icon="warning_amber" size="50" class="align-self-center mx-3" color="warning"></v-icon>
              <div class="ml-4 mr-1">
                <h4 class="text-subtitle-1">Expired Item(s)</h4>
                <h2 class="text-h5">{{ expiredItems }}</h2>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text class="pa-a5">
            <div class="d-flex align-center">
              <v-icon icon="category" size="50" class="align-self-center mx-3" color="primary"></v-icon>
              <div class="ml-4 mr-1">
                <h4 class="text-subtitle-1">Inventory Requests</h4>
                <h2 class="text-h5"></h2>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <Items title="Latest Items Added" :custom-headers="userLatestAddedHeader" hide-search hide-pagination
          show-latest-only>
          <template #top-right>
            <v-btn color="info" variant="text" size="small" href="#items" target="_blank" prepend-icon="open_in_new">View
              items</v-btn>
          </template>
        </Items>
      </v-col>
      <v-col cols="6">
        <Items title="Brands" :custom-headers="userLatestAddedHeader" hide-search hide-pagination show-latest-only />
      </v-col>
    </v-row>
  </MainContent>
</template>
