"use client";

import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

interface User {
    id: string;
    email?: string;
    name?: string;
    phone?: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
}

// Async thunk to check user authentication status
export const checkAuthStatus = createAsyncThunk(
    'auth/checkAuthStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch {
            // 401 = not logged in, 404 = route not deployed yet — both are "not authenticated", not a crash
            return rejectWithValue('Not authenticated');
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout', {});
        } catch {
            // Even if the API call fails, we clear local state
            return rejectWithValue('Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
    } as AuthState,
    reducers: {
        setUser: (state, action: { payload: User | null }) => {
            state.user = action.payload;
            state.isLoggedIn = action.payload !== null;
            state.isLoading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action: { payload: boolean }) => {
            state.isLoading = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = (action.payload as { user: User }).user;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.error = action.payload as string;
            })
            // logoutThunk — always clear state regardless of API result
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(logoutThunk.rejected, (state) => {
                // Still clear local state even if API call failed
                state.user = null;
                state.isLoggedIn = false;
                state.isLoading = false;
            });
    },
});

export const { setUser, logout, setLoading, clearError } = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;