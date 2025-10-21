import { ref, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default function useVacations() {
  const vacations = ref([]);
  const store = useStore();
  const isLoading = ref(true);

  const fetching = async (id) => {
    try {
      const baseURL = process.env.VUE_APP_API_URL || "http://localhost:3000";
      const url = id
        ? `${baseURL}/api/vacations?userId=${id}`
        : `${baseURL}/api/vacations`;

      const response = await axios.get(url);
      vacations.value = response.data;
      store.commit("setVacations", response.data);
    } catch (error) {
      console.error("Error fetching vacations:", error);
    } finally {
      isLoading.value = false;
    }
  };

  watch(() => store.state.userId, (newUserId) => {
    if (!newUserId) return;
    if (store.getters.getRole === 'validator') {
      fetching();
    } else {
      fetching(newUserId);
    }
  }, { immediate: true });

  return { vacations, isLoading, fetching };
}