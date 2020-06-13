<template lang="html">
  <v-card 
    class="pb-2" 
    :class="{ 'completed-todo': isCompleted }">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
      </div>
    </v-card-title>
    <div class="d-flex fit-content ml-auto mr-2">
      <v-btn
        color="success"
        v-if="!isCompleted"
        @click="$emit('complete-todo')"
      >
        <v-icon 
          class="mr-2" 
          dark>mdi-check-bold</v-icon>
        Complete
      </v-btn>
      <v-btn 
        v-if="isCompleted" 
        @click="$emit('uncomplete-todo')">
        <v-icon class="mr-2">mdi-undo-variant</v-icon>
        Uncomplete
      </v-btn>
      <v-btn 
        color="error" 
        @click="$emit('delete-todo')">
        <v-icon 
          class="mr-2" 
          dark>mdi-delete</v-icon>
        Delete
      </v-btn>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.fit-content {
  width: fit-content !important;
}
.ml-auto {
  margin-left: auto !important;
}
.completed-todo {
  background: #f9f9f9 !important;
  h3 {
    text-decoration: line-through;
    font-style: italic;
    color: #555;
  }
}
</style>
