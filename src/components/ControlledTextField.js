import { TextField } from 'react-qml/QtQuickControls2';

import makeControlled from '../makeControlled';

export default makeControlled(
  TextField,
  'text',
  (applyChange, prevText, currentText, elem) => {
    const position = elem.cursorPosition;
    const delta = prevText.length - currentText.length;
    applyChange();
    elem.cursorPosition = position - delta;
  }
);
