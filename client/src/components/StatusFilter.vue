<template>
  <n-select
    :value="modelValue"
    @update:value="onUpdate"
    :options="options"
    clearable
    size="small"
    style="width: 120px;"
    placeholder="Filter"
  />
</template>

<script setup>
import { NSelect } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const options = [
  { label: 'All', value: null },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

const onUpdate = (value) => {
  emit('update:modelValue', value)
}
</script>


