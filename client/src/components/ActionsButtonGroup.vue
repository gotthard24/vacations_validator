<template>
  <n-space justify="start">
    <n-button type="success" size="small" :loading="loading" @click="$emit('approve')">
      Approve
    </n-button>
    <n-button type="error" size="small" :loading="loading" @click="$emit('reject')">
      Reject
    </n-button>
  </n-space>
</template>

<script setup>
import { NSpace, NButton } from 'naive-ui'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
})

defineEmits(['approve', 'reject'])
</script>


