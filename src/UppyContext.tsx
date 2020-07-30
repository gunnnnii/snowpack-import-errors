import { h, createContext, FunctionComponent } from 'preact';
import { useMemo, useContext, useEffect } from 'preact/hooks';
import type Uppy from '@uppy/core';

export type UppyInstance = Uppy.Uppy<Uppy.StrictTypes>;
export type UppyFactory = () => UppyInstance;

const useUppy = (init: UppyFactory) => {
  const uppy = useMemo(init, []);

  useEffect(() => {
    setInterval(() => console.log(uppy), 2000);
  }, []);

  return uppy;
};

const UppyContext = createContext<UppyInstance | null>(null);

export const useUppyContext = () => {
  const instance = useContext(UppyContext);
  if (instance === null) throw new Error('No Uppy provider');
  return instance;
};

export const UppyProvider: FunctionComponent<{ initialize: UppyFactory }> = ({
  initialize,
  children,
}) => {
  const uppy = useUppy(initialize);
  return <UppyContext.Provider value={uppy} children={children} />;
};
