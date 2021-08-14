import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loginAsync, selectLoadingStatus } from './features/auth/authSlice';
import { useLoginMutation } from './features/rtk-auth/RtkAuthSlice';

function App() {
  const [userName, setUserName] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // CreateAsyncThunkでの制御

  // CreateAsyncThunkにはdispatchが必要
  const dispatch = useAppDispatch();
  // loadingの状態を取得
  const loadingStatus = useAppSelector(selectLoadingStatus);

  const loginHandler = async () => {
    const result = await dispatch(
      loginAsync({
        userName: userName,
        password: 'pass1234',
      }),
    );
    // ログインに成功した場合
    if (loginAsync.fulfilled.match(result)) {
      alert('loginに成功しました');
    }
    // ログインに失敗した場合
    if (loginAsync.rejected.match(result)) {
      alert('loginに失敗しました');
    }
  };

  // RTKQueryでの制御

  // RTK Queryはカスタムフックが生成される
  // result, error, isUnititialized, isLoading, isSuccess, isError
  const [login, { isLoading, isError }] = useLoginMutation();

  const rtkLoginHandler = async () => {
    const data = {
      userName: userName,
      password: 'pass1234',
    };
    try {
      const response = await login(data).unwrap();
      alert('loginに成功しました');
    } catch (error) {
      alert('loginに失敗しました');
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        name="userName"
        placeholder="john"
        value={userName}
        onChange={inputHandler}
      />
      <hr />
      <div>
        <button type="button" onClick={loginHandler}>
          CreateAsyncThunk LOGIN
        </button>
        {loadingStatus === 'loading' ? (
          <div>loading...</div>
        ) : loadingStatus === 'failed' ? (
          <div>failed...</div>
        ) : null}
      </div>
      <hr />
      <div>
        <button type="button" onClick={rtkLoginHandler}>
          RTK LOGIN
        </button>
        {isLoading ? <div>loading...</div> : isError ? <div>failed...</div> : null}
      </div>
    </div>
  );
}

export default App;
