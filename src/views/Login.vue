<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <div class="form-container">
    <LoginForm />
    <p>
      Dont have an account?
      <router-link to="/register">Register here</router-link>
    </p>
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

p {
  color: white;
  font-size: 14px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  color: rgb(167, 187, 80);
}
</style>
