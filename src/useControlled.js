import React from 'react';

export default function useControlled(
  Component,
  props,
  ctrlPropName,
  resettingCallback
) {
  const ctrlPropNameInitial = ctrlPropName[0].toUpperCase();
  const ctrlPropNameRest = ctrlPropName.substr(1);

  const onChangeName = `on${ctrlPropNameInitial}${ctrlPropNameRest}Changed`;
  const {
    [ctrlPropName]: ctrlPropValue,
    [onChangeName]: ctrlOnChange,
    initialText,
    ...others
  } = props;
  const ref = React.useRef();

  const currentTextRef = React.useRef(initialText);

  React.useLayoutEffect(
    () => {
      ref.current[ctrlPropName] = currentTextRef.current = ctrlPropValue;
    },
    [ctrlPropValue]
  );

  React.useLayoutEffect(() => {
    const handle = () => {
      const prev = ref.current[ctrlPropName];
      const current = currentTextRef.current;
      if (prev !== current) {
        if (typeof resettingCallback === 'function') {
          resettingCallback(
            () => {
              ref.current[ctrlPropName] = current;
            },
            prev,
            current,
            ref.current
          );
        } else {
          ref.current[ctrlPropName] = current;
        }
        ctrlOnChange(prev);
      }
    };

    if (ref.current) {
      ref.current[ctrlPropName + 'Changed'].connect(handle);
    }

    return () => {
      if (ref.current) {
        ref.current[ctrlPropName + 'Changed'].disconnect(handle);
      }
    };
  }, []);

  return <Component ref={ref} {...others} />;
}
