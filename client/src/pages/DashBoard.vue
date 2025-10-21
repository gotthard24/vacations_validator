<template>
    <div class="dashboard-container">
        <n-button 
            type="warning" 
            quaternary 
            @click="handleLogout"
            class="right-corner-button"
        >
            <template #icon>
                <n-icon>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z"/>
                    </svg>
                </n-icon>
            </template>
            Logout
        </n-button>

        <n-space>
            <n-card style="margin-left: 20px;">
                <h1>{{ dashboardTitle }}</h1>
                <h2>Role: {{ userRole }}</h2>
            </n-card>
        </n-space>
        <n-space v-if="userRole === 'requester'">
            <RequestFormModal style="margin-left: 20px;" :user-id="userId" @requestSubmitted="handleRequestSubmitted"/>
        </n-space>
        <n-space>
            <RequestsTable ref="requestsTableRef" />
        </n-space>
    </div>
</template>

<script setup>
import useRole from '@/hooks/useRole'
import { computed, ref } from 'vue'
import { useAuth } from '@/hooks/useAuth'
import router from '@/router/router'
import RequestsTable from '@/components/RequestsTable.vue'
import RequestFormModal from '@/components/RequestFormModal.vue'

const { userRole, userName, userId } = useRole()
const { logout } = useAuth()
const requestsTableRef = ref(null)

const dashboardTitle = computed(() => {
  return userName.value ? `${userName.value}'s Dashboard` : 'Dashboard'
})

const handleRequestSubmitted = () => {
  if (requestsTableRef.value) {
    requestsTableRef.value.reloadData()
  }
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.dashboard-container {
    position: relative;
    min-height: 100vh;
}

.right-corner-button {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.n-space {
    margin-bottom: 20px;
}
</style>