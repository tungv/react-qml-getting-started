import { ColumnLayout } from 'react-qml';
import React from 'react';

import TodoItem from './TodoItem';
import useWindowWidth from './useWindowWidth';

export default function TodoList(props) {
  const { todos } = props;

  const windowWidth = useWindowWidth();

  return (
    <ColumnLayout width={windowWidth}>
      {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </ColumnLayout>
  );
}
