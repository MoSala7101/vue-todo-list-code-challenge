<template>
  <v-app>
    <v-toolbar 
      app 
      color="primary" 
      dark>
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content class="d-flex align-center">
      <v-layout 
        align-center 
        fill-height 
        justify-center>
        <v-flex xs6>
          <p class="app-title primary--text">
            {{ title }}
          </p>
          <TodoForm @add-new-todo="addNewTodo" />
          <TodoList />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>
<script>
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { mapActions } from "vuex";
export default {
  name: "App",
  created() {
    this.loadStoredTodos();
  },
  components: {
    TodoForm,
    TodoList,
  },
  data() {
    return {
      title: "Vue Todos",
    };
  },
  methods: {
    ...mapActions("todosModule", ["addNewTodo", "loadStoredTodos"]),
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
