import { Text, RowLayout } from 'react-qml';
import React from 'react';

import ControlledCheckBox from './components/ControlledCheckBox';
import StateContext from './StateContext';

export default function TodoItem(props) {
  const dispatch = React.useContext(StateContext);

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
    <RowLayout>
      <ControlledCheckBox
        checkState={props.checked ? 2 : 0}
        onCheckStateChanged={onChecked}
      />
      <Text text={props.text} font={{ strikeout: props.checked }} />
    </RowLayout>
  );
}
