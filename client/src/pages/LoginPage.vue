<template>
    <n-card style="max-width: 400px; margin: 50px auto; padding: 20px;">
        <h1>Welcome to Daniel's TravelFactory Home Assignment</h1>
        <h2>Login</h2>
        <n-input v-model:value="email" placeholder="Email" clearable type="email" style="margin-bottom: 12px;" />
        <n-input v-model:value="password" type="password" placeholder="Password" clearable
            style="margin-bottom: 12px;" />
        <n-button @click="handleLogin" type="primary" block>Login</n-button>
        <p v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</p>
    </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useAuth } from '../hooks/useAuth'
import router from '../router/router'
import axios from 'axios'
const { login, user } = useAuth()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const store = useStore()

const handleLogin = async () => {
    errorMessage.value = ''

    const trimmedEmail = email.value.trim()
    const trimmedPassword = password.value.trim()

    if (!trimmedEmail || !trimmedPassword) {
        errorMessage.value = 'Enter email and password'
        return
    }

    try {
        await login(trimmedEmail, trimmedPassword)
        router.push('/dashboard')
    } catch (err) {
        if (err.code === 'auth/invalid-email') {
            errorMessage.value = 'Invalid email format'
        } else if (err.code === 'auth/user-not-found') {
            errorMessage.value = 'User not found'
        } else if (err.code === 'auth/wrong-password') {
            errorMessage.value = 'Invalid password'
        } else {
            errorMessage.value = err.message
        }
        console.error('Login error:', err.message)
    }
}
</script>