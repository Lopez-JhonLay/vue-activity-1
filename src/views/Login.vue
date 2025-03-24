<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <div class="form-container">
    <LoginForm />
    <div>
      <router-link to="/register">Create Account</router-link>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
