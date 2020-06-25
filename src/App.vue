<template>
  <v-app>
    <v-toolbar app color="primary" dark>
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content class="d-flex align-center">
      <v-layout align-center fill-height justify-center>
        <v-flex xs10 sm8 md6 lg6>
          <p class="app-title primary--text">
            {{ title }}
          </p>
          <TodoForm
            @add-new-todo="addNewTodo"
            @search-for-todo="searchForTodo"
          />
          <TodoList :todos="todos" />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>
<script>
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  created() {
    this.loadStoredTodos();
  },
  components: {
    TodoForm,
    TodoList,
  },
  computed: {
    ...mapState("todosModule", ["todos"]),
  },
  data() {
    return {
      title: "Vue Todos",
    };
  },
  methods: {
    ...mapActions("todosModule", [
      "addNewTodo",
      "loadStoredTodos",
      "searchForTodo",
    ]),
    refreshStateTodos() {
      this.addNewTodo();
      this.loadStoredTodos();
    },
  },
};
</script>
<style lang="scss">
.app-title {
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
}
</style>
