import { Button } from 'react-qml/QtQuickControls2';
import { Window, Text, ColumnLayout } from 'react-qml';
import * as React from 'react';

import ControlledCheckBox from './components/ControlledCheckBox';
import ControlledTextField from './components/ControlledTextField';
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
        <Button
          text="close"
          onClicked={() => {
            requestClosing();

            setTimeout(() => {
              requestOpen();
            }, 1000);
          }}
        />
      </ColumnLayout>
    </Window>
  );
}
