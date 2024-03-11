import { useReducer } from 'react';

type ActionType = {
    type: string;
    data: any;
    callback?: (val: object) => void;
};

export const useStates = (intialVal: object) => {
    const reducer = (oldState: object, action: ActionType) => {
        if (action.type === 'update') {
            const data = action.data;
            const newData = {
                ...oldState,
                ...data
            };
            action?.callback?.(newData);
            return newData;
        }
    };

    const fn = (params: object, callback?: (val: object) => void) => {
        dispatch({
            type: 'update',
            data: params,
            callback: callback
        });
    };

    const [state, dispatch] = useReducer(reducer, intialVal);

    return [state, fn];
};
