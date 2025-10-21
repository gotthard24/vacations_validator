<template>
  <div>
    <n-card title="Vacation Requests" :bordered="false">
      <n-data-table :columns="columns" :data="filteredVacations" :loading="isLoading" striped />
    </n-card>

    <n-modal v-model:show="showRejectModal" preset="dialog" title="Reject request">
      <n-form>
        <n-form-item label="Comment">
          <n-input v-model:value="rejectComment" placeholder="Enter rejection reason..." type="textarea" rows="3" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space justify="end">
          <n-button @click="showRejectModal = false">Cancel</n-button>
          <n-button type="error" @click="confirmReject" :loading="actionLoading">
            Reject
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
  import { ref, h, computed } from 'vue'
  import axios from 'axios'
  import { useMessage, NTag } from 'naive-ui'
  import useVacations from '@/hooks/useVacations'
  import useRole from '@/hooks/useRole'
  import StatusFilter from '@/components/StatusFilter.vue'
  import ActionsButtonGroup from '@/components/ActionsButtonGroup.vue'

const message = useMessage()
const { userRole, userId } =  useRole()
const { vacations, isLoading, fetching } = useVacations()

const actionLoading = ref(false)
const showRejectModal = ref(false)
const rejectComment = ref('')
const selectedRequest = ref(null)
const statusFilter = ref(null)

const filteredVacations = computed(() => {
  if (!statusFilter.value) {
    return vacations.value
  }
  return vacations.value.filter(vacation => vacation.status === statusFilter.value)
})


const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleDateString() : '-'

const updateStatus = async (id, status, comments = '') => {
  try {
    actionLoading.value = true
    await axios.post(`${process.env.VUE_APP_API_URL || 'http://localhost:3000'}/api/vacations/${id}/status`, {
      status,
      comments,
    })
    message.success(`Request ${status}`)
    await reloadData()
  } catch (e) {
    message.error('Failed to update status')
    console.error(e)
  } finally {
    actionLoading.value = false
  }
}

const approve = (row) => {
  updateStatus(row.id, 'approved')
}

const openRejectModal = (row) => {
  selectedRequest.value = row
  rejectComment.value = ''
  showRejectModal.value = true
}

const confirmReject = async () => {
  if (!rejectComment.value.trim()) {
    message.warning('Please enter a comment')
    return
  }
  await updateStatus(selectedRequest.value.id, 'rejected', rejectComment.value)
  showRejectModal.value = false
}

const reloadData = async () => {
  if (userRole.value !== 'validator' && userId.value) {
    await fetching(userId.value)
  } else {
    await fetching()
  }
}

defineExpose({
  reloadData
})

  const columns = computed(() => {
    const baseColumns = [
      {
        title: 'Name',
        key: 'name',
      },
      {
        title: 'Reason',
        key: 'reason',
      },
      {
        title: 'Start date',
        key: 'start_date',
        render: (row) => formatDate(row.start_date),
      },
      {
        title: 'End date',
        key: 'end_date',
        render: (row) => formatDate(row.end_date),
      },
      {
        title: () => h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
          h('span', 'Status'),
          h(StatusFilter, {
            modelValue: statusFilter.value,
            'onUpdate:modelValue': (value) => statusFilter.value = value
          })
        ]),
        key: 'status',
        render: (row) =>
          h(
            NTag,
            {
              type:
                row.status === 'approved'
                  ? 'success'
                  : row.status === 'rejected'
                  ? 'error'
                  : 'warning',
              bordered: false,
            },
            { default: () => row.status },
          ),
      }
    ]

    if (userRole.value === 'validator') {
      baseColumns.push({
        title: 'Actions',
        key: 'actions',
        render: (row) =>
          h(ActionsButtonGroup, {
            loading: actionLoading.value,
            onApprove: () => approve(row),
            onReject: () => openRejectModal(row)
          })
      })
    }

    baseColumns.push({
      title: 'Comments',
      key: 'comments',
      render: (row) => row.comments,
    })

    return baseColumns
  })
</script>

<style scoped>
.n-card {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>