<template>
  <div id="app" class="container">
    <h1>Vue + Vuex Todo List <small>({{pendingCount}})</small></h1>

    <div class="todos">
      <todo-list></todo-list>
    </div>


    <div class="todo-form">
      <form @submit.prevent="addTodo">
        <div class="form-group">
          <label for="todo">Add Task</label>
          <input id="todo" v-model="newTask" type="text"
          class="form-control" placeholder="Enter New Task">
          <small  class="form-text text-muted">Speak your mind out.</small>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoList from './components/TodoList';

export default {
  name: 'App',
  data: () => ({
    newTask: '',
  }),

  components: {
    'todo-list': TodoList,
  },

  computed: {
    ...mapGetters('todo', ['pendingCount']),
  },

  methods: {
    addTodo() {
      this.$store.dispatch('todo/addTodo', this.newTask);
      this.newTask = '';
    },
  },
};
</script>

<style>
#app {
  margin-top: 60px;
}
.todos {
  margin: 20px 0;
}
</style>
