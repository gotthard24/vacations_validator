import { createStore } from "vuex";

export default createStore({
  state: {
    name: "",
    userId: "",
    role: "Unsigned",
    vacations: [],
  },
  getters: {
    getRole(state) {
      return state.role;
    },
    getName(state) {
      return state.name;
    },
    getUserId(state) {
      return state.userId;
    },
    getVacations(state) {
      return state.vacations;
    },
  },
  mutations: {
    setRole(state, role) {
      state.role = role;
    },
    setName(state, name) {
      state.name = name;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setVacations(state, vacations) {
      state.vacations = vacations;
    },
  },
});
