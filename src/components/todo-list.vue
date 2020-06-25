<template lang="html">
  <div>
    <v-flex
      my-2
      d-flex
      align-center
      justify-space-between
      flex-row
      class="flex-wrap"
      v-if="getTodosCount()"
    >
      <h3 class="headline mb-0 font-weight-bold todos-list-title">
        Todos ({{ getTodosCount() }})
      </h3>
      <v-btn
        flat
        error
        :disabled="getCompletedTodosCount() == 0"
        @click="clearCompleted"
      >
        remove completed ({{ getCompletedTodosCount() }})</v-btn
      >
    </v-flex>
    <TodoItem
      class="mb-3"
      v-for="(todo, index) in todos"
      :key="index"
      :title="todo.title"
      :is-completed="todo.isCompleted"
      @add-new-todo="addNewTodo"
      @complete-todo="completeTodo(index)"
      @uncomplete-todo="uncompleteTodo(index)"
      @delete-todo="deleteTodo(index)"
    />
  </div>
</template>
<script>
import TodoItem from "@/components/todo-item";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TodoItem,
  },
  props: ["todos"],
  methods: {
    ...mapGetters("todosModule", ["getTodosCount", "getCompletedTodosCount"]),
    ...mapActions("todosModule", [
      "addNewTodo",
      "completeTodo",
      "uncompleteTodo",
      "deleteTodo",
      "clearCompleted",
    ]),
  },
};
</script>
<style lang="css">
.todos-list-title {
  width: 70%;
}
</style>
