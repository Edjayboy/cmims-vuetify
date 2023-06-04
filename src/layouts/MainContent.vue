<script setup lang="ts">
interface Props {
  icon?: string;
}

defineProps<Props>()
</script>
<template>
  <v-card height="100%" :prepend-icon="icon" fill-height>
    <template v-slot:title>
      <h1 class="text-h5 float-left">
        <slot name="title">
          Page Title Here
        </slot>
      </h1>
      <div class="float-right">
        <slot name="top-right">
        </slot>
      </div>
    </template>
    <v-divider></v-divider>
    <v-card-text>
      <slot>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur ligula non dictum fermentum. Cras
        lacinia diam ac elit iaculis lacinia. Donec id mollis elit. Quisque dignissim tincidunt urna, non imperdiet nunc
        varius in. In hac habitasse platea dictumst. Quisque ultricies sit amet dolor eget gravida. Quisque sagittis ante
        sed dolor ultricies commodo. Vivamus vel diam vitae ante laoreet mollis quis eu arcu. Duis mollis sagittis ante
        nec dignissim. Fusce eros arcu, commodo bibendum dui vel, rutrum tristique urna. Mauris accumsan ac neque at
        euismod. Maecenas lacinia turpis sapien, at consectetur mauris molestie a. Integer pulvinar sed risus nec
        ullamcorper.
      </slot>
    </v-card-text>
  </v-card>
</template>