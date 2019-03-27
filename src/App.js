import { TextField, CheckBox } from 'react-qml/QtQuickControls2';
import { Window, Text, ColumnLayout } from 'react-qml';
import * as React from 'react';

import useControlled from './useControlled';

function ControlledTextField(props) {
  return useControlled(
    TextField,
    props,
    'text',
    (applyChange, prevText, currentText, elem) => {
      const position = elem.cursorPosition;
      const delta = prevText.length - currentText.length;
      applyChange();
      elem.cursorPosition = position - delta;
    }
  );
}

function ControlledCheckBox(props) {
  return useControlled(CheckBox, props, 'checkState');
}

export default function App(props) {
  const [value, setValue] = React.useState('');
  const [checkState, setCheckState] = React.useState(2);

  return (
    <Window title="Hello Ben" visible width={500} height={1200} x={0} y={0}>
      <ColumnLayout anchors={{ left: 'parent.left', right: 'parent.right' }}>
        <Text text={value} />
        <ControlledTextField
          Layout={{ fillWidth: true }}
          text={value}
          onTextChanged={text => {
            setValue(text);
          }}
        />
        <ControlledTextField
          Layout={{ fillWidth: true }}
          text={value}
          onTextChanged={e => {
            console.log('requesting change', e);
          }}
        />
        <Text text={checkState} />
        <ControlledCheckBox
          checkState={checkState}
          onCheckStateChanged={nextCheckState => setCheckState(nextCheckState)}
        />
        <ControlledCheckBox
          checkState={checkState}
          onCheckStateChanged={e => {
            console.log('requesting change', e);
          }}
        />
      </ColumnLayout>
    </Window>
  );
}
