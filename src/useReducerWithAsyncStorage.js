import { AsyncStorage } from 'react-qml';
import React from 'react';

export default function useReducerWithAsyncStorage(
  key,
  reducers,
  initialState
) {
  const toBeDehyrated = useInitialState(key, initialState);

  const [state, dispatch] = React.useReducer(reducers, initialState);

  React.useLayoutEffect(
    () => {
      if (toBeDehyrated) {
        dispatch({ type: '@@INIT', payload: toBeDehyrated });
      }
    },
    [toBeDehyrated]
  );

  useAsyncStorage(key, state);
  return [state, dispatch];
}

function useAsyncStorage(key, value) {
  React.useLayoutEffect(
    () => {
      const string = JSON.stringify(value);
      AsyncStorage.setItem(key, string);
    },
    [key, value]
  );
}

export function useInitialState(key, initial) {
  const [state, setState] = React.useState(null);

  React.useLayoutEffect(
    () => {
      AsyncStorage.getItem(key).then(json => {
        if (json) {
          setState(JSON.parse(json));
        } else {
          setState(initial);
        }
      });
    },
    [key, initial]
  );

  return state;
}
