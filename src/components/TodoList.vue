<template>
  <div class="todo-list">
    <ul class="list-group">

      <li class="list-group-item" v-if="!todos.length" ><i>There are no Items in the list.</i></li>

      <todo-item :todo="t" v-bind:key="t.id" v-for="t in todos" ></todo-item>

    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './TodoItem';

export default {
  name: 'TodoList',
  created() {
    // this.$store.dispatch('todo/loadTodos');
  },
  computed: {
    ...mapGetters('todo', ['todos']),
  },
  components: {
    'todo-item': TodoItem,
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
