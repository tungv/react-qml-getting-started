import { Button } from 'react-qml/QtQuickControls2';
import { RowLayout } from 'react-qml';
import React from 'react';

import ControlledTextField from './components/ControlledTextField';
import StateContext from './StateContext';

export default function NewTodo() {
  const dispatch = React.useContext(StateContext);
  const [text, setText] = React.useState('');

  const textRef = React.createRef(text);

  React.useLayoutEffect(
    () => {
      textRef.current = text;
    },
    [text]
  );

  const submit = React.useCallback(
    () => {
      // console.log('dispatching', textRef.current);
      dispatch({
        type: 'created',
        payload: {
          text: textRef.current,
          id: String(Math.random()),
        },
      });
      setText('');
    },
    [textRef]
  );

  return (
    <RowLayout>
      <ControlledTextField
        text={text}
        onTextChanged={setText}
        onAccepted={submit}
      />
      <Button style={{ highlighted: true }} text="create" onClicked={submit} />
    </RowLayout>
  );
}
