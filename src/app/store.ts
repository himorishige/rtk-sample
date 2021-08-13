import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import rtkAuthReducer, { authApi } from '../features/rtk-auth/RtkAuthSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // createAsyncThunkのReducer
    auth: authReducer,
    // RTK QueryのReducer
    rtkauth: rtkAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // RTK Query用の各種便利機能をmiddlewareとして登録
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
