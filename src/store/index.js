import { createContext, useContext } from 'react';
import common from './common';

class RootStore {
    common = common;
}

const store = new RootStore();

const Context = createContext(store);

export function useStore() {
    return useContext(Context);
}
