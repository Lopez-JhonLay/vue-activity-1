<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";

const useAuth = useAuthStore;

const { getUser, logout } = useAuth();
</script>

<template>
  <div>
    <h1>Protected Page</h1>
    <p>Welcome, {{ getUser()?.username }}! This is a protected page.</p>
    <button @click="logout">Logout</button>
  </div>
</template>
