import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    varData: { ssss: "ss" },
    todos: [],
    users: [],
    currentUser: null,
  },
  mutations: {
    createUser(state, payload) {
      console.log(payload);
      axios
        .post(
          "https://pet-todo-14b9a-default-rtdb.firebaseio.com/users.json", //users.json создаем типа таблицу
          payload
        )
        .then((response) => {
          state.users = response.data;
        });
    },
    putInfo(state, payload) {
      console.log(payload);
      axios
        .put(
          "https://pet-todo-14b9a-default-rtdb.firebaseio.com/users/" +
            localStorage.getItem("current_user") +
            ".json",
          payload
        )
        .then((response) => {
          console.log((state.varData = response.data.record));
        });
    },
    getInfo(state) {
      axios
        .get(
          "https://pet-todo-14b9a-default-rtdb.firebaseio.com/users.json",
          {}
        )
        .then((response) => {
          response.data ||= [];
          state.users = response.data;
        });
    },
    getCurrentUserInfo(state, payload) {
      axios
        .get(
          `https://pet-todo-14b9a-default-rtdb.firebaseio.com/users.json`,
          {}
        )
        .then((response) => {
          state.currentUser = response.data;

          state.currentUser = Object.keys(response.data)
            .map((key) => {
              return { id: key, ...response.data[key][0] };
            })
            .filter((item) => item.id == payload);
        });
    },

    deleteInfo(state, index) {
      state.currentUser[0].ueser_todo.splice(index, 1);
      axios
        .put(
          "https://pet-todo-14b9a-default-rtdb.firebaseio.com/users/" +
            localStorage.getItem("current_user") +
            ".json",
          state.currentUser
        )
        .then((response) => {
          console.log(response.data);
        });
    },
    updateTodoItem(state) {
      axios
        .put(
          "https://pet-todo-14b9a-default-rtdb.firebaseio.com/users/" +
            localStorage.getItem("current_user") +
            ".json",
          state.currentUser
        )
        .then((response) => {
          console.log(response.data);
        });
    },
  },
  actions: {
    getInfoFromDB(context) {
      context.commit("getInfo");
    },
    getCurrentUserData(context, payload) {
      context.commit("getCurrentUserInfo", payload.id);
    },
    deleteTodoItem(context, index) {
      context.commit("deleteInfo", index.idx);
    },
    updateTodoItem(context) {
      context.commit("updateTodoItem");
    },
  },
  modules: {},
});
