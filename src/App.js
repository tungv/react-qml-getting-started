import { Window, ColumnLayout } from 'react-qml';
import * as React from 'react';
import _ from 'lodash';

import ErrorBoundary from './ErrorBoundary';
import NewTodo from './NewTodo';
import StateContext from './StateContext';
import TodoList from './TodoList';
import useWindowState from './useWindowState';

export default function App(props) {
  const [value, setValue] = React.useState('');
  const [checkState, setCheckState] = React.useState(2);

  const {
    visibility,
    setVisibility,
    requestClosing,
    requestOpen,
  } = useWindowState();

  const [state, dispatch] = React.useReducer(todosReducer, {
    todos: {
      '1': { id: '1', text: 'React QML', checked: false },
      '2': { id: '2', text: 'QtQuick Control', checked: true },
      '3': { id: '3', text: 'test', checked: false },
      '4': { id: '4', text: 'test', checked: false },
    },
  });

  const { todos } = state;

  const todosArray = React.useMemo(
    () => {
      return _.toArray(todos);
    },
    [todos]
  );

  return (
    <Window
      title="Todo List - ReactQML"
      visibility={visibility}
      width={500}
      height={1200}
      x={0}
      y={0}
      onVisibilityChanged={setVisibility}
      onClosing={requestClosing}
    >
      <ErrorBoundary>
        <StateContext.Provider value={dispatch}>
          <ColumnLayout
            anchors={{ left: 'parent.left', right: 'parent.right' }}
          >
            <TodoList todos={todosArray} />
            <NewTodo />
          </ColumnLayout>
        </StateContext.Provider>
      </ErrorBoundary>
    </Window>
  );
}

function todosReducer(state, action) {
  console.log(require('util').inspect(action.payload, { depth: null }));
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
