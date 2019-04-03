import { QWindow_Visibility } from 'react-qml/dist/components/QtQuickWindow/types';
import React from 'react';

import usePreviousState from './usePreviousState';

export default function useWindowState(
  initialState = QWindow_Visibility.Windowed
) {
  const [visibility, visibilityBeforeClosing, setVisibility] = usePreviousState(
    initialState
  );

  const latestVisibilityBeforeClosingRef = React.useRef(
    visibilityBeforeClosing
  );

  React.useLayoutEffect(
    () => {
      latestVisibilityBeforeClosingRef.current = visibilityBeforeClosing;
    },
    [visibility]
  );

  React.useLayoutEffect(
    () => {
      function stateChangedHandler(state) {
        if (
          state === Qt.ApplicationActive &&
          visibility === QWindow_Visibility.Hidden
        ) {
          const nextVisible =
            visibilityBeforeClosing === QWindow_Visibility.Hidden
              ? initialState
              : visibilityBeforeClosing;
          setVisibility(nextVisible);
        }
      }
      Qt.application.stateChanged.connect(stateChangedHandler);

      return () => {
        Qt.application.stateChanged.disconnect(stateChangedHandler);
      };
    },
    [visibility]
  );

  return {
    visibility,
    setVisibility,
    requestClosing: React.useCallback(() => {
      setVisibility(QWindow_Visibility.Hidden);
    }, []),
    requestOpen: React.useCallback(() => {
      setVisibility(latestVisibilityBeforeClosingRef.current);
    }, []),
  };
}
