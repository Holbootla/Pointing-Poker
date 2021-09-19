import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SocketContext } from './app/socket/socket-context';
import Game from './app/pages/game/Game';
import Lobby from './app/pages/lobby/Lobby';
import NotFound from './app/pages/not-found/NotFound';
import Result from './app/pages/result/Result';
import Start from './app/pages/start/Start';

function App(): JSX.Element {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });
    socket.on('UPDATE_CLIENT', (action) => {
      console.log('DISPATCH THIS:');
      console.log('action.type: ', action.type);
      console.log('action.payload: ', action.payload);
    });
  }, [socket]);

  return (
    <Router>
      <Switch>
        <Route path="/lobby">
          <Lobby />
        </Route>
        {/* <Route path="/game/:gameID"> */}
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
        <Route exact path="/">
          <Start />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
