import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './app/pages/game/Game';
import Lobby from './app/pages/lobby/Lobby';
import NotFound from './app/pages/not-found/NotFound';
import Result from './app/pages/result/Result';
import Start from './app/pages/start/Start';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/game/:gameID">
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
