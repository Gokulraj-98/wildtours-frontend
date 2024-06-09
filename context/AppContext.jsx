import React, { createContext, useReducer, useContext } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
    user: null,
    tours: [],
    bookings: [],
};

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_TOURS':
            return { ...state, tours: action.payload };
        case 'ADD_BOOKING':
            return { ...state, bookings: [...state.bookings, action.payload] };
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    return useContext(AppStateContext);
}

export function useAppDispatch() {
    return useContext(AppDispatchContext);
}
