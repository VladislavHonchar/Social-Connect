import { createSlice } from '@reduxjs/toolkit';
import { register } from '../../api/API';

const registrationSlice = createSlice({
    name: "registration",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isAuth: !!localStorage.getItem("token"),
    },
    reducers: {
        registrationStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registrationSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuth = true;
            state.error = null;
        },
        registrationFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    registrationStart,
    registrationSuccess,
    registrationFailure
} = registrationSlice.actions;

export const registrationUserAsync = (userData) => async (dispatch) => {
    try {
        dispatch(registrationStart());
        await register(userData);
        localStorage.setItem("userId", userData.id)
        dispatch(registrationSuccess());
    } catch (error) {
        dispatch(registrationFailure(error));
    }
};

export default registrationSlice.reducer;