import { Button } from 'react-qml/QtQuickControls2';
import { Text, RowLayout } from 'react-qml';
import React from 'react';

import ControlledCheckBox from './components/ControlledCheckBox';
import ControlledTextField from './components/ControlledTextField';
import StateContext from './StateContext';

export default function TodoItem(props) {
  const dispatch = React.useContext(StateContext);
  const [isEditting, setEditting] = React.useState(false);
  const [edittingText, setEdittingText] = React.useState(props.text);

  const toggleEditting = React.useCallback(
    () => {
      setEditting(e => !e);
      setEdittingText(props.text);
    },
    [props.text]
  );

  const updateText = () => {
    dispatch({
      type: 'textEdited',
      payload: { id: props.id, text: edittingText },
    });
    setEditting(false);
  };

  const onChecked = React.useCallback(value => {
    dispatch({
      type: 'checkStateChanged',
      payload: {
        id: props.id,
        nextChecked: value === 2,
      },
    });
  });

  return (
    <RowLayout Layout={{ fillWidth: true, leftMargin: 4, rightMargin: 4 }}>
      <ControlledCheckBox
        checkState={props.checked ? 2 : 0}
        onCheckStateChanged={onChecked}
        enabled={!isEditting}
      />
      {isEditting && (
        <ControlledTextField
          text={edittingText}
          Layout={{ fillWidth: true }}
          onTextChanged={setEdittingText}
          onAccepted={updateText}
        />
      )}
      {!isEditting && (
        <Text
          text={props.text}
          font={{ strikeout: props.checked }}
          Layout={{ fillWidth: true }}
        />
      )}
      <Button
        text={isEditting ? 'Cancel' : 'Edit'}
        onClicked={toggleEditting}
      />
    </RowLayout>
  );
}
