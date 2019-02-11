<template>
  <div class="todo-list">
    <ul class="list-group">

      <li
        v-if="!todos.length"
        class="list-group-item" ><i>There are no Items in the list.</i></li>

      <todo-item
        v-for="t in todos"
        :todo="t"
        :key="t.id" />

    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './TodoItem';

export default {
  name: 'TodoList',
  components: {
    'todo-item': TodoItem,
  },
  computed: {
    ...mapGetters('todo', ['todos']),
  },
  created() {
    this.$store.dispatch('todo/loadTodos');
  },
};
</script>

<style scoped>
.todo-list ul li a.item{
  cursor: pointer;
}
.todo-list ul li.completed {
  text-decoration:line-through;
}

</style>
