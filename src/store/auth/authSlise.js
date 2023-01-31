import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'cheking', //'authenticated', ' no-authenticated'
        user:{},
        errorMessage: undefined,
    },
    reducers: {
        onCheking: ( state ) => {
            state.status       = 'cheking'; //'authenticated', ' no-authenticated'
            state.user         = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, {payload})=>{
            state.status       = 'authenticated'
            state.user         = payload;
            state.errorMessage = undefined;
        },
        onLogout:(state, {payload})=>{
            state.status       = 'no-authentificated'
            state.user         = {};
            state.errorMessage = payload;
        },
        clearErrorMessage:( state )=>{
            state.errorMessage = undefined;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;