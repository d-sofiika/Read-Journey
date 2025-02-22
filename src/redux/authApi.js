import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api/";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ``;
};

export const register = createAsyncThunk(
    'auth/signup',
    async (credentials, thunkApi) => {
        try {
            const res = await axios.post('/users/signup', credentials)
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const logIn = createAsyncThunk(
    'auth/signin',
    async (credentials, thunkApi) => {
        try {
            const res = await axios.post('/users/signin', credentials);
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)
export const logOut = createAsyncThunk('auth/signout', async (_, thunkApi) => {
    try {
        await axios.post('/users/signout');
        clearAuthHeader();
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
        
    }
})
export const getCurrentUser = createAsyncThunk("auth/current", async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) return thunkApi.rejectWithValue("No token available");

    try {
        setAuthHeader(token);
        const res = await axios.get("/users/current");
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
        const state = thunkApi.getState();
        const token  = state.auth.token;

        if (token  === null) {
            return thunkApi.rejectWithValue('Unable to fetch user');
        }

        try {
            setAuthHeader(token);
            const res = await axios.get('/users/current/refresh');
            setAuthHeader(res.data.token);
             return res.data;
        } catch(error) {
            return thunkApi.rejectWithValue(error.message
            )
        }
    }
)

