<script setup lang="ts">
import RegisterForm from "@/components/RegisterForm.vue";
</script>

<template>
  <div class="form-container">
    <RegisterForm />
    <div>
      Already have an account?
      <router-link to="/login">Log in here</router-link>
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
