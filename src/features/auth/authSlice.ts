import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';

interface LoginForm {
  userName: string;
  password: string;
}

interface UserState {
  userName: string | undefined;
  token: string | undefined;
}

export interface AuthState {
  user: UserState | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: undefined,
  status: 'idle',
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginForm: LoginForm, { rejectWithValue }) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const result = await axios.post('/login', loginForm, config);

      return result.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    } finally {
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
