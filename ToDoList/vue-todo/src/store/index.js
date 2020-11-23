import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [],
  },
  getters: {
    allTodos: (state)=>state.todos,
  },
  actions: {
    addTodo({commit}, todo) {
      commit('add_todo', todo);
      commit('update_storage');
    },
    deleteTodo({commit}, id) {
      commit('delete_todo', id);
      commit('update_storage');
    },
    updateTodo({commit}, todo){ 
      commit('update_todo', todo);
      commit('update_storage');
    }
  },
  mutations: {
    add_todo(state, todo) {
      state.todos.push(todo);
    },
    delete_todo(state, id) {
      state.todos = state.todos.filter(todo=>todo.id != id);
    },
    update_todo(state, todo) {
      let index = state.todos.find((t) => t.id == todo.id);
      if (index != -1) {
        state.todos[index] = todo;
      }
    },
    update_storage(state) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    initialise_state(state) {
      if (localStorage.getItem('todos') !== null) {
        state.todos = JSON.parse(localStorage.getItem('todos'));
      }
    },
  },
  modules: {
  }
})
