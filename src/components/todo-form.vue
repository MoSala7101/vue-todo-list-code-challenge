<template lang="html">
  <v-text-field
    placeholder="What do you have to do?"
    solo
    v-model="newTodoTitle"
    @keydown.enter="addNewTodo()"
  />
</template>
<script>
export default {
  data() {
    return {
      newTodoTitle: "",
    };
  },
  methods: {
    addNewTodo() {
      if (this.newTodoTitle.length > 0) {
        this.$emit("add-new-todo", this.newTodoTitle);
        this.newTodoTitle = "";
      }
    },
  },
};
</script>
<style lang="css"></style>
