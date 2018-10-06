
const API = 'http://5b9361b1bd13d30014269625.mockapi.io/api/todos';

const Todo = {

  namespaced: true,

  state: {
    todos: [],
    error: null,
  },

  getters: {
    todos(state) {
      return state.todos.sort((a, b) => a.completed > b.completed);
    },
    pendingCount(state) {
      if (state.todos && state.todos.length) {
        const pendingItems = state.todos.filter(t => t.completed === false);
        return pendingItems.length;
      }
      return 0;
    },
  },

  mutations: {

    /**
     *
     * @param {*} state
     * @param {*} todos
     */
    SET_TODOS(state, todos) {
      state.todos = todos;
    },

    /**
     *
     * @param {*} state
     * @param {*} todo
     */
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
    },

    /**
     *
     * @param {*} state
     * @param {*} id
     */
    TOGGLE_TODO(state, id) {
      const todos = state.todos;
      const todoIndex = todos.findIndex(t => t.id === id);
      if (todoIndex === 0 || todoIndex > 0) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
      }
      state.todos = todos;
    },

    /**
     *
     * @param {*} state
     * @param {*} id
     */
    DELETE_TODO(state, id) {
      const todos = state.todos;
      const todoIndex = todos.findIndex(t => t.id === id);
      if (todoIndex === 0 || todoIndex > 0) {
        todos.splice(todoIndex, 1);
      }
      state.todos = todos;
    },

    /**
     *
     * @param {*} state
     * @param {*} payload
     */
    UPDATE_TODO(state, payload) {
      const todos = state.todos;
      todos.forEach((todo, index) => {
        if (todo.id === payload.id) {
          todos[index] = payload;
        }
      });
      state.todos = todos;
    },

    /**
     *
     * @param {*} state
     * @param {*} err
     */
    TODO_ERROR(state, err) {
      state.error = err;
    },
  },

  actions: {

    /**
     * Load Todos to store
     * @param {*} store
     */
    loadTodos({ commit }) {
      return new Promise((resolve, reject) => {
        fetch(API)
          .then(response => response.json())
          .then((json) => {
            commit('SET_TODOS', json);
          })
          .catch((err) => {
            commit('TODO_ERROR', err);
            reject(err);
          });
      });
    },

    /**
     * Add Todo
     * @param {*} store
     * @param {*} task
     */
    addTodo({ commit }, task) {
      const todo = {
        task,
        completed: false,
      };

      return new Promise((resolve, reject) => {
        fetch(API, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(todo),
        })
          .then(response => response.json())
          .then((json) => {
            commit('ADD_TODO', json);
          })
          .catch((err) => {
            commit('TODO_ERROR', err);
            reject(err);
          });
      });
    },

    /**
     *
     * @param {*} store
     * @param {*} todo
     */
    updateTodo({ commit }, todo) {
      const url = `${API}/${todo.id}`;

      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(todo),
        })
          .then(response => response.json())
          .then((json) => {
            commit('UPDATE_TODO', json);
          })
          .catch((err) => {
            commit('TODO_ERROR', err);
            reject(err);
          });
      });
    },

    /**
     *
     * @param {*} store
     * @param {*} id
     */
    deleteTodo({ commit }, id) {
      const url = `${API}/${id}`;

      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
          .then(response => response.json())
          .then(() => {
            commit('DELETE_TODO', id);
          })
          .catch((err) => {
            commit('TODO_ERROR', err);
            reject(err);
          });
      });
    },
  },

};


export default Todo;
