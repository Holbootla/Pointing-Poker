import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/redux/store';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { socket, SocketContext } from './app/socket/socket-context';

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
