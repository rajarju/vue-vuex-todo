<template>
    <li class="list-group-item todo-item"
    v-bind:key="todo.id" :class="{completed: todo.completed}">

      <div v-if="inlineEditId">

      <input autofocus
      class="form-control"
      v-on:blur="cancelInlineEdit()"
      v-on:keyup="inlineEditKeyup($event)"
      type="text"  v-model="todo.task" />

      </div>

      <div v-else>

      <input class="edit" type="checkbox"
      v-model="checked" />

      <a class="item" @click="inlineEdit()">{{todo.task}}</a>

      <button @click="deleteTodo(todo.id)" type="button" class="close"  aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>

      </div>


    </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['todo'],
  data() {
    return { inlineEditId: false };
  },
  computed: {
    checked: {
      get() {
        return this.todo.completed;
      },
      set() {
        this.toggleTodo(this.todo);
      },
    },
  },
  methods: {
    toggleTodo(todo) {
      const newTodo = todo;
      newTodo.completed = !todo.completed;
      this.$store.dispatch('todo/updateTodo', newTodo);
    },
    inlineEdit() {
      this.inlineEditId = true;
    },
    cancelInlineEdit() {
      this.inlineEditId = null;
    },
    deleteTodo(id) {
      this.$store.dispatch('todo/deleteTodo', id);
    },
    inlineEditKeyup(event) {
      if (event.keyCode === 27) {
        this.cancelInlineEdit();
      } else if (event.keyCode === 13) {
        const newTodo = this.todo;
        newTodo.task = event.target.value;
        this.inlineEditId = null;
        this.$store.dispatch('todo/updateTodo', newTodo);
      }
    },
  },
};
</script>

<style scoped>
.todo-item .edit{
  margin-top: -2px;
  margin-right: 10px;
}
</style>
