import Todo from '../../../../src/store/todo';

const todos = [{ id: '7', createdAt: '2018-09-07T13:39:21.958Z', task: 'Lean TypeDoc', completed: false }, { id: '8', createdAt: '2018-09-07T16:59:33.233Z', task: 'Learn Vue', completed: false }, { id: '9', createdAt: '2018-09-07T15:56:14.085Z', task: 'Learn Nuxt', completed: false }, { id: '10', createdAt: '2018-09-07T10:21:01.196Z', task: 'Lean Vuex', completed: false }, { id: '11', createdAt: '2018-09-07T20:16:18.978Z', task: 'Learn Ava for testing', completed: false }];

describe('TODO: SET_TODOS', () => {
  it('should set todos value in state', () => {
    const state = {
      todos: [],
    };

    Todo.mutations.SET_TODOS(state, todos);

    expect(state.todos.length).toEqual(5);
  });
});
