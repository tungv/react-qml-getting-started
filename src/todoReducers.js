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

  if (action.type === 'textEdited') {
    const { id, text } = action.payload;
    return {
      todos: _.assign({}, state.todos, {
        [id]: { id, text, checked: state.todos[id].checked },
      }),
    };
  }

  if (action.type === 'doneCleared') {
    return {
      todos: _.pickBy(state.todos, todo => !todo.checked),
    };
  }

  return state;
}
