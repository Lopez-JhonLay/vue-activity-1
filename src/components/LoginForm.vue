<script setup lang="ts">
import { reactive, ref } from "vue";

import type { FormInstance, FormRules } from "element-plus";
import { Lock, User, Loading } from "@element-plus/icons-vue";

import { useAuthStore } from "@/stores/authStore";

const useAuth = useAuthStore();

const { login } = useAuth;

const ruleFormRef = ref<FormInstance>();

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the username"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit! valid sya");
      console.log(login(ruleForm));
    } else {
      console.log("error submit!");
    }
  });
};

const isLoading = ref(false);
</script>

<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 400px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <div>
      <h1>Login</h1>
    </div>
    <el-form-item prop="username">
      <el-input
        :prefix-icon="User"
        v-model="ruleForm.username"
        placeholder="Username"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :prefix-icon="Lock"
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="Password"
      />
    </el-form-item>
    <el-form-item>
      <el-button v-if="!isLoading" @click="submitForm(ruleFormRef)">
        LOGIN
      </el-button>
      <el-button v-else :icon="Loading" loading />
    </el-form-item>
  </el-form>
</template>

<style scoped>
h1 {
  color: white;
}

.demo-ruleForm {
  width: 100%;
  margin-top: -200px;
  margin-left: -20px;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
}

:deep(.el-input__inner) {
  color: white;
}

:deep(.el-button) {
  width: 100%;
}
</style>
