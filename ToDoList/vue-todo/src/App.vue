<template>
  <div id="app" class="container">
    <ToDoInput />
    <ToDoList />
  </div>
</template>

<script>
import ToDoInput from '@/components/ToDoInput.vue'
import ToDoList from '@/components/ToDoList.vue'

export default {
  name: 'App',
  components: {
    ToDoInput, ToDoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
