import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { rest, setupWorker } from 'msw';

const mockServer = setupWorker(
  rest.post('/login', (req, res, ctx) => {
    const { userName }: any = req.body;
    if (userName === 'john') {
      return res(
        ctx.delay(2000),
        ctx.status(200),
        ctx.json({
          userName: 'john',
          token: 'token1234',
        }),
      );
    }
    return res(
      ctx.delay(2000),
      ctx.status(401),
      ctx.json({
        message: 'unauthorized',
      }),
    );
  }),
);

mockServer.start();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
