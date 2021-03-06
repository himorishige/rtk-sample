import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  // ローディング状態はRTK Queryのカスタムフックで管理
  // status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: undefined,
  // ローディング状態はRTK Queryのカスタムフックで管理
  // status: 'idle',
};

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation<UserState, LoginForm>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export const rtkAuthSlice = createSlice({
  name: 'rtk-auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createAsyncThunkと違いaddMatcherで成功失敗の状態を取得可能です。
      /** RTK Queryのカスタムフックでローディングステータスを取得できるので、
       * 下記のようなローディング状態の取得のためだけの利用であれば不要だと思います。
       */
      // .addMatcher(authApi.endpoints.login.matchPending, (state) => {
      //   state.status = 'loading';
      // })
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<UserState>) => {
          // state.status = 'idle';
          state.user = action.payload;
        },
      );
    // .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
    //   state.status = 'idle';
    // });
  },
});

export default rtkAuthSlice.reducer;
