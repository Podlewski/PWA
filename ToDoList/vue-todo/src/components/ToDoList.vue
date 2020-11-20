<template>
  <div class="mx-4">
    <div v-for="todo in allTodos" :key="todo.id">
      <ToDoItem :todo='todo' />
    </div>
  </div>
</template>

<script>
import ToDoItem from '@/components/ToDoItem.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ToDoItem
  },
  computed: {
    ...mapGetters(['allTodos'])
  }
}
</script>

<style scoped>

</style>