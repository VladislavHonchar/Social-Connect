//import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/API";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        mainUser: null,
        isLoading: null,
        error: null,
        isAuth: !!localStorage.getItem("token")
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.mainUser = action.payload;
            state.isAuth = true;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logoutUser: (state) => {
            state.mainUser = null;
            state.isAuth = false;
            state.error = null;
        }
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    logoutUser,
} = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const mainUser = await login(email, password);
        dispatch(loginSuccess(mainUser));
        localStorage.setItem("userId", mainUser.id);
    } catch (error) {
        dispatch(loginFailure(error));
    }
}

export const logoutUserAsync = (dispatch) =>{
    dispatch(logoutUser());
    localStorage.removeItem("token");
}

export default authSlice.reducer;