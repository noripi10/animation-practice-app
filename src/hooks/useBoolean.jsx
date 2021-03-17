import React, { useMemo, useState } from 'react';

export const useBoolean = (initState) => {
  const [value, setValue] = useState(initState);
  const controller = useMemo(
    () => ({
      true: () => setValue(true),
      false: () => setValue(false),
      toggle: () => setValue(!value),
    }),
    []
  );
  return [value, controller];
};
