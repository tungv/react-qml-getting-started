import _ from 'lodash';

export default function todosReducers(state, action) {
  if (action.type === '@@INIT') {
    return action.payload;
  }
  if (action.type === 'checkStateChanged') {
    const { id, nextChecked } = action.payload;
    return {
      todos: _.assign({}, state.todos, {
        [id]: _.assign({}, state.todos[id], {
          checked: nextChecked,
        }),
      }),
    };
  }

  if (action.type === 'created') {
    const { id, text } = action.payload;
    return {
      todos: _.assign({}, state.todos, { [id]: { id, text, checked: false } }),
    };
  }

  return state;
}
