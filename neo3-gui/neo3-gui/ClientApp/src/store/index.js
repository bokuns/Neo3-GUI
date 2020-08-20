import React from 'react';
import { useLocalStore } from 'mobx-react';
import blockSyncStore from './blockSync';
import globalStore from './global';
import neoNodeStore from './neoNode';
import walletStore from './wallet';

export const storesContext = React.createContext({
  blockSync: null,
  global: null,
  neoNodeStore: null
});

export const StoresProvider = ({ children }) => {
  const blockSync = useLocalStore(() => blockSyncStore);
  const global = useLocalStore(() => globalStore);
  const neoNode = useLocalStore(() => neoNodeStore);
  const wallet = useLocalStore(() => walletStore);
  const stores = {
    blockSync,
    global,
    neoNode,
    wallet
  };

  return (
    <storesContext.Provider value={stores}>{children}</storesContext.Provider>
  );
};
