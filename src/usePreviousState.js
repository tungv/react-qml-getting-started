import React from 'react';

function keepPrevious(state, action) {
  if (action.type === 'set') {
    return [action.payload, state[0]];
  }

  return state;
}

export default function usePrevious(initial) {
  const [state, dispatch] = React.useReducer(keepPrevious, [initial, null]);
  const [current, prev] = state;

  const setState = React.useCallback(value => {
    dispatch({ type: 'set', payload: value });
  }, []);

  return [current, prev, setState];
}
