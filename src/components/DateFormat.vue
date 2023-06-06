<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed } from 'vue';
interface Props {
  date: string;
  format?: string;
}
const props = withDefaults(defineProps<Props>(), {
  format: 'MM/DD/YYYY'
})

const formattedDate = computed(() => dayjs(props.date).format(props.format))
</script>
<template>
  <span>{{ formattedDate }}</span>
</template>