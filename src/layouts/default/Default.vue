<template>
  <v-app id="inspire">
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Medical Inventory Management Information System</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item v-for="(nav, index) in navigation" :key="index" :prepend-icon="nav.icon" :title="nav.label"
          :value="index" :to="nav.link"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ISidebarNavigation } from '@/interfaces/theme/sidebar.interface';
import { ref } from 'vue';
const drawer = ref<boolean>(true)
const navigation = ref<ISidebarNavigation[]>([
  {
    icon: 'dashboard',
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: 'medical_information',
    label: 'Items',
    link: '/items',
  },
  {
    icon: 'fact_check',
    label: 'Inventory Requests',
    link: '/requests',
  },
  {
    icon: 'manage_accounts',
    label: 'Users',
    link: '/users',
  },
])
</script>
