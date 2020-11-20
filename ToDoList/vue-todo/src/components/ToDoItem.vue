<template>
  <div>
    <div class="row my-3 justify-content-between">
      <h3 v-if="!editing">{{todo.title}}</h3>
      <input v-else v-bind:value="todoText" @change="todoTextChange" type="text" class="col form-control">
      <div>
        <button @click="updateTodoItem(todo)" class="btn btn-primary mx-2">{{editing?'Update':'Edit'}}</button>
        <button @click="deleteTodo(todo.id)" class="btn btn-danger" >Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    todo: {}
  },
  data() {
    return {
      todotext: "",
      editing: false
    };
  },
  methods : {
    ...mapActions(['deleteTodo','updateTodo']),
    todoTextChange(e) {
      this.todoText = e.target.value;
    },
    updateTodoItem(todo) {
      this.editing = this.editing == true ? false : true;
      if (this.editing) {
        this.todoText = todo.title;
        this.updateTodo(todo);
      } else {
        todo.title = this.todoText;
      }
    }
  }
}
</script>

<style scoped>

</style>