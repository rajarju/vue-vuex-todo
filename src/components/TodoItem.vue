<template>
  <li
    :class="{completed: todo.completed}"
    :key="todo.id"
    class="list-group-item todo-item" >

    <div v-if="inlineEditId">

      <input
        v-model="todo.task"
        autofocus
        class="form-control"
        type="text"
        @:blur="cancelInlineEdit()"
        @:keyup="inlineEditKeyup($event)">

    </div>

    <div v-else>

      <input
        v-model="checked"
        class="edit"
        type="checkbox">

      <a
        class="item"
        @click="inlineEdit()">{{ todo.task }}</a>

      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="deleteTodo(todo.id)">
        <span aria-hidden="true">×</span>
      </button>

    </div>


  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
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
