<template>
  <div>
    <n-button type="primary" @click="showModal = true">
      <template #icon>
        <n-icon>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </n-icon>
      </template>
      New Request
    </n-button>

    <n-modal v-model:show="showModal" preset="dialog" title="Create Vacation Request">
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="Start Date" path="startDate" required>
          <n-date-picker
            v-model:value="formData.startDate"
            type="date"
            placeholder="Select start date"
            :is-date-disabled="disablePastDates"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="End Date" path="endDate" required>
          <n-date-picker
            v-model:value="formData.endDate"
            type="date"
            placeholder="Select end date"
            :is-date-disabled="disablePastDates"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="Reason" path="reason">
          <n-input
            v-model:value="formData.reason"
            placeholder="Enter reason for vacation (optional)"
            type="textarea"
            :rows="3"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space justify="end">
          <n-button @click="handleCancel">Cancel</n-button>
          <n-button 
            type="primary" 
            @click="handleSubmit" 
            :loading="isSubmitting"
          >
            Submit Request
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import { useAuth } from '@/hooks/useAuth'

const message = useMessage()
const { user } = useAuth()

const showModal = ref(false)
const isSubmitting = ref(false)
const formRef = ref(null)

const formData = reactive({
  startDate: null,
  endDate: null,
  reason: ''
})

const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

const rules = {
  startDate: {
    required: true,
    validator: (rule, value) => {
      if (!value) {
        return new Error('Please select start date')
      }
      return true
    },
    trigger: ['blur', 'change']
  },
  endDate: {
    required: true,
    validator: (rule, value) => {
      if (!value) {
        return new Error('Please select end date')
      }
      return true
    },
    trigger: ['blur', 'change']
  }
}

const disablePastDates = (date) => {
  return date < Date.now() - 24 * 60 * 60 * 1000
}

const handleCancel = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  formData.startDate = null
  formData.endDate = null
  formData.reason = ''
  formRef.value?.restoreValidation()
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    if (formData.endDate && formData.startDate && formData.endDate <= formData.startDate) {
      message.error('End date must be after start date')
      return
    }

    isSubmitting.value = true

    const requestData = {
      start_date: new Date(formData.startDate).toISOString().split('T')[0],
      end_date: new Date(formData.endDate).toISOString().split('T')[0],
      reason: formData.reason || null,
      user_id: props.userId
    }

    const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'
    await axios.post(`${baseURL}/api/vacations/request`, requestData)

    message.success('Vacation request submitted successfully!')
    showModal.value = false
    resetForm()

    emit('requestSubmitted')

  } catch (error) {
    console.error('Error submitting request:', error)
    if (error.response?.data?.message) {
      message.error(error.response.data.message)
    } else {
      message.error('Failed to submit vacation request')
    }
  } finally {
    isSubmitting.value = false
  }
}

const emit = defineEmits(['requestSubmitted'])
</script>

<style scoped>
.n-button {
  margin-bottom: 16px;
}
</style>
