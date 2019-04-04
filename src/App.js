import { Window, ColumnLayout } from 'react-qml';
import * as React from 'react';
import _ from 'lodash';

import ErrorBoundary from './ErrorBoundary';
import NewTodo from './NewTodo';
import StateContext from './StateContext';
import TodoList from './TodoList';
import todoReducers from './todoReducers';
import useReducerWithAsyncStorage from './useReducerWithAsyncStorage';
import useWindowState from './useWindowState';

const INITIAL = { todos: [] };

export default function App(props) {
  const [value, setValue] = React.useState('');
  const [checkState, setCheckState] = React.useState(2);

  const {
    visibility,
    setVisibility,
    requestClosing,
    requestOpen,
  } = useWindowState();

  const [state, dispatch] = useReducerWithAsyncStorage(
    'todosState',
    todoReducers,
    INITIAL
  );

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
      height={800}
      x={0}
      y={0}
      onVisibilityChanged={setVisibility}
      onClosing={requestClosing}
    >
      <StateContext.Provider value={dispatch}>
        <ErrorBoundary>
          <ColumnLayout
            anchors={{ left: 'parent.left', right: 'parent.right' }}
          >
            <TodoList todos={todosArray} />
            <NewTodo />
          </ColumnLayout>
        </ErrorBoundary>
      </StateContext.Provider>
    </Window>
  );
}
