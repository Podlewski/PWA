<template>
    <div>
        <div class="row justify-content-center">
            <h1 class="text-right">Vue ToDo App</h1>
        </div>
        <div class="row py-3 mx-1">
            <input @change="todoTextChange" v-bind:value="todoText" class="col form-control mr-2" type="text"/>
            <button @click="addTodoItem" class="btn btn-primary"> Add </button>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {v1} from 'uuid';

export default {
    data() {
        return {
            todoText: ""
        };
    },
    methods: {
        ...mapActions(["addTodo"]),
        todoTextChange(e) {
            this.todoText = e.target.value;
        },
        addTodoItem() {
            this.addTodo({
                id: v1(),
                title: this.todoText
            });
            this.todoText = "";
        }
    }
}
</script>

<style scoped>

</style>