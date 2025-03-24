import { ref, computed, reactive, type Ref } from "vue";
import { defineStore } from "pinia";

interface User {
  username: string;
}

interface StoredUser {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  password: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  middleName: string;
  lastName: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<User | null> = ref(null);
  const token: Ref<string | null> = ref(null);
  const isAuthenticated: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const getUser = (): User | null => user.value;
  const isLoggedIn = (): boolean => isAuthenticated.value;
  const getError = (): string | null => error.value;

  const register = async (userData: RegisterCredentials): Promise<boolean> => {
    try {
      loading.value = true;
      error.value = null;

      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (storedUsers.some((u: any) => u.username === userData.username)) {
        error.value = "Username already registered";
        return false;
      }

      const newUser: StoredUser = {
        firstName: userData.firstName,
        middleName: userData.middleName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password,
      };

      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      const generatedToken: string = crypto.randomUUID();

      user.value = { username: userData.username };
      token.value = generatedToken;
      isAuthenticated.value = true;

      localStorage.setItem("token", generatedToken);
      localStorage.setItem("currentUser", JSON.stringify(user.value));

      return true;
    } catch (err) {
      error.value = "Registration failed";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return { user, token, isAuthenticated, loading, error, register };
});
