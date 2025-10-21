import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useAuth } from "./useAuth";
import axios from "axios";

export default function useRole() {
  const store = useStore();
  const { user } = useAuth();

  const role = ref("");
  const name = ref("");
  const userId = ref("");

  watch(
    user,
    async (newUser) => {
      if (!newUser) return;

      try {
        const baseURL = process.env.VUE_APP_API_URL || "http://localhost:3000";

        const response = await axios.get(`${baseURL}/api/users/${newUser.uid}`);
        const userData = response.data;

        role.value = userData.role;
        name.value = userData.name || "";
        userId.value = userData.id;

        store.commit("setRole", userData.role);
        store.commit("setName", userData.name || "");
        store.commit("setUserId", userData.id);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    },
    { immediate: true }
  );

  return { userRole: role, userName: name, userId };
}
