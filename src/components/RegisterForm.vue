<script setup lang="ts">
import { reactive, ref } from "vue";

import type { FormInstance, FormRules } from "element-plus";
import { Lock, User, Loading } from "@element-plus/icons-vue";

import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const { register } = authStore;

const ruleFormRef = ref<FormInstance>();

const validateFirstName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the first name"));
  } else {
    callback();
  }
};

const validateMiddleName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the middle name"));
  } else {
    callback();
  }
};

const validateLastname = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the last name"));
  } else {
    callback();
  }
};

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
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass");
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.password) {
    callback(new Error("Passwords do not match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  password: "",
  checkPass: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  firstName: [{ validator: validateFirstName, trigger: "blur" }],
  middleName: [{ validator: validateMiddleName, trigger: "blur" }],
  lastName: [{ validator: validateLastname, trigger: "blur" }],
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!", ruleForm);
      register(ruleForm);
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
      <h1>Register</h1>
    </div>
    <el-form-item prop="firstName">
      <el-input
        :prefix-icon="User"
        v-model="ruleForm.firstName"
        placeholder="First Name"
      />
    </el-form-item>
    <el-form-item prop="middleName">
      <el-input
        :prefix-icon="User"
        v-model="ruleForm.middleName"
        placeholder="Middle Name"
      />
    </el-form-item>
    <el-form-item prop="lastName">
      <el-input
        :prefix-icon="User"
        v-model="ruleForm.lastName"
        placeholder="Last Name"
      />
    </el-form-item>
    <el-form-item prop="username">
      <el-input
        :prefix-icon="User"
        v-model="ruleForm.username"
        placeholder="Username"
      />
    </el-form-item>
    <el-form-item prop="pass">
      <el-input
        :prefix-icon="Lock"
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="Password"
      />
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input
        :prefix-icon="Lock"
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
        placeholder="Confirm Password"
      />
    </el-form-item>
    <el-form-item>
      <el-button v-if="!isLoading" @click="submitForm(ruleFormRef)">
        REGISTER
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
  background-color: transparent !important;
}

:deep(.el-input__inner) {
  color: white;
}

:deep(.el-button) {
  width: 100%;
}
</style>
