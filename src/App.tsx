import React from 'react';
import { useAppDispatch } from './app/hooks';
import { loginAsync } from './features/auth/authSlice';
import { useLoginMutation } from './features/rtk-auth/RtkAuthSlice';

function App() {
  // CreateAsyncThunkにはdispatchが必要
  const dispatch = useAppDispatch();

  // RTK Queryはカスタムフックが生成される
  const [login] = useLoginMutation();

  // CreateAsyncThunk
  const loginHandler = async () => {
    dispatch(
      loginAsync({
        userName: 'john',
        password: 'pass1234',
      }),
    );
  };

  // RTKQuery
  const rtkLoginHandler = async () => {
    const data = {
      userName: 'john',
      password: 'pass1234',
    };
    try {
      const response = await login(data).unwrap();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <div>
        <button type="button" onClick={loginHandler}>
          CreateAsyncThunk LOGIN
        </button>
      </div>
      <div>
        <button type="button" onClick={rtkLoginHandler}>
          RTK LOGIN
        </button>
      </div>
    </div>
  );
}

export default App;
