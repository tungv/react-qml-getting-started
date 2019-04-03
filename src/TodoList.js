import { ColumnLayout } from 'react-qml';
import React from 'react';

import StateContext from './StateContext';
import TodoItem from './TodoItem';

export default function TodoList(props) {
  const { todos } = props;

  return (
    <ColumnLayout>
      {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </ColumnLayout>
  );
}
