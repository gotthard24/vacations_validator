<template>
    <NConfigProvider>
        <NMessageProvider>
            <div class="app">
                <router-view>

                </router-view>
            </div>
        </NMessageProvider>
    </NConfigProvider>
</template>

<script setup>
import { NMessageProvider } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
</script>

<style></style>